/*
 * Project: Eventiva
 * File: main.ts
 * Last Modified: 06/09/2024, 13:18
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { DataAwsSecurityGroup } from '@cdktf/provider-aws/lib/data-aws-security-group'
import { DataAwsSubnets } from '@cdktf/provider-aws/lib/data-aws-subnets'
import { DataAwsVpc } from '@cdktf/provider-aws/lib/data-aws-vpc'
import { DbSubnetGroup } from '@cdktf/provider-aws/lib/db-subnet-group'
import { EksCluster } from '@cdktf/provider-aws/lib/eks-cluster'
import { EksNodeGroup } from '@cdktf/provider-aws/lib/eks-node-group'
import { IamPolicyAttachment } from '@cdktf/provider-aws/lib/iam-policy-attachment'
import { IamRole } from '@cdktf/provider-aws/lib/iam-role'
import { IamRolePolicyAttachment } from '@cdktf/provider-aws/lib/iam-role-policy-attachment'
// import { IamRolePolicyAttachment } from '@cdktf/provider-aws/lib/iam-role-policy-attachment'
import { AwsProvider } from '@cdktf/provider-aws/lib/provider'
import { RdsCluster } from '@cdktf/provider-aws/lib/rds-cluster'
import { RdsClusterInstance } from '@cdktf/provider-aws/lib/rds-cluster-instance'
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group'
import { SecurityGroupRule } from '@cdktf/provider-aws/lib/security-group-rule'
import { ConfigMap } from '@cdktf/provider-kubernetes/lib/config-map'
import { Deployment } from '@cdktf/provider-kubernetes/lib/deployment'
import { PersistentVolumeClaim } from '@cdktf/provider-kubernetes/lib/persistent-volume-claim'
import { KubernetesProvider } from '@cdktf/provider-kubernetes/lib/provider'
import { Service } from '@cdktf/provider-kubernetes/lib/service'
import { RandomProvider } from '@cdktf/provider-random/lib/provider'
import { StringResource } from '@cdktf/provider-random/lib/string-resource'
import { Uuid } from '@cdktf/provider-random/lib/uuid'
import { App, LocalBackend, TerraformOutput, TerraformStack, TerraformVariable, Token, VariableType } from 'cdktf'
import { Construct } from 'constructs'
import * as fs from 'node:fs'

class AWS
    extends TerraformStack {

    public readonly eksClusterName: string
    public readonly eksClusterEndpoint: string
    public readonly eksClusterCaCertificate: string
    public readonly postgresPassword: string
    public readonly postgresUser: string

    constructor (
        scope: Construct,
        id: string
    ) {
        super( scope, id )

        new LocalBackend( this )

        new AwsProvider( this, 'awsProvider' )
        new RandomProvider( this, 'random', {} )

        // Reference VPC and public subnets
        const vpc = new DataAwsVpc( this, 'vpc-9d4b0cf8', {
            id: 'vpc-9d4b0cf8'
        } )

        const subnets = new DataAwsSubnets( this, 'default_subnets', {
            filter: [
                {
                    name: 'vpc-id',
                    values: [ vpc.id ]
                }
            ]
        } )

        // Define the Security Group for EKS Nodes
        const eksNodeSecurityGroup = new SecurityGroup(this, 'EKSNodeSecurityGroup', {
            vpcId: vpc.id,
            description: 'Allow access to/from EKS nodes',
        });

        // Define Ingress and Egress Rules for the EKS Node Security Group
        new SecurityGroupRule(this, 'EKSNodeSGIngress', {
            type: 'ingress',
            fromPort: 0,
            toPort: 65535,
            protocol: '-1',
            securityGroupId: eksNodeSecurityGroup.id,
            cidrBlocks: ['0.0.0.0/0'],
        });

        new SecurityGroupRule(this, 'EKSNodeSGEgress', {
            type: 'egress',
            fromPort: 0,
            toPort: 65535,
            protocol: '-1',
            securityGroupId: eksNodeSecurityGroup.id,
            cidrBlocks: ['0.0.0.0/0'],
        });

        const eksRole = new IamRole(this, 'EksRole', {
            assumeRolePolicy: JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'sts:AssumeRole',
                        Principal: { Service: 'eks.amazonaws.com' },
                        Effect: 'Allow',
                    },
                ],
            }),
        });

        const AmazonEKSClusterPolicyAttachment = new IamRolePolicyAttachment(this, 'AmazonEKSClusterPolicyAttachment', {
            role: eksRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKSClusterPolicy',
        });
        const AmazonEKServicePolicyAttachment = new IamRolePolicyAttachment(this, 'AmazonEKSServicePolicyAttachment', {
            role: eksRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKSServicePolicy',
        });

        const AmazonEKSVPCResourceControllerPolicyAttachment = new IamRolePolicyAttachment(this, 'AmazonEKSVPCResourceControllerPolicyAttachment', {
            role: eksRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKSVPCResourceController',
        });

        const nodeRole = new IamRole(this, 'EKSNodeRole', {
            assumeRolePolicy: JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: {
                            Service: 'ec2.amazonaws.com',
                        },
                        Action: 'sts:AssumeRole',
                    },
                ],
            }),
        });

        // Attach necessary policies to the node role
        const halfordsAmazonEksWorkerNodePolicy = new IamRolePolicyAttachment(this, 'AmazonEKSWorkerNodePolicy', {
            role: nodeRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy',
        });

        const halfordsAmazonEksCniPolicy = new IamRolePolicyAttachment(this, 'AmazonEKS_CNI_Policy', {
            role: nodeRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy',
        });

        const halfordsAmazonEc2ContainerRegistryReadOnly = new IamRolePolicyAttachment(this, 'AmazonEC2ContainerRegistryReadOnly', {
            role: nodeRole.name,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly',
        });

        const defaultVar = new DataAwsVpc( this, 'default', {
            default: true
        } )
        new IamPolicyAttachment( this, 'eks_cluster_policy', {
            name: 'halfords-cluster-policy',
            policyArn: 'arn:aws:iam::aws:policy/AmazonEKSClusterPolicy',
            roles: [ eksRole.name ]
        } )
        const publicSubnet = new DataAwsSubnets( this, 'public', {
            filter: [
                {
                    name: 'vpc-id',
                    values: [ Token.asString( defaultVar.id ) ]
                }
            ]
        } )
        const eks = new EksCluster( this, 'eks', {
            name: 'halfords-eks-cluster',
            roleArn: eksRole.arn,
            vpcConfig: {
                subnetIds: Token.asList( publicSubnet.ids )
            },
            dependsOn: [
                AmazonEKServicePolicyAttachment,
                AmazonEKSClusterPolicyAttachment,
                AmazonEKSVPCResourceControllerPolicyAttachment
            ],
        } )
        const awsEksNodeGroup = new EksNodeGroup( this, 'halfords', {
            clusterName: eks.name,
            dependsOn: [
                halfordsAmazonEksWorkerNodePolicy,
                halfordsAmazonEksCniPolicy,
                halfordsAmazonEc2ContainerRegistryReadOnly,
                eks
            ],
            instanceTypes: [ 't2.micro' ],
            nodeGroupName: 'managed-nodes',
            nodeRoleArn: nodeRole.arn,
            scalingConfig: {
                desiredSize: 1,
                maxSize: 2,
                minSize: 1
            },
            subnetIds: Token.asList( publicSubnet.ids )
        } )
        /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
        awsEksNodeGroup.overrideLogicalId( 'halfords' )

        // Define the database subnet group
        const dbSubnetGroup = new DbSubnetGroup( this, 'dbSubnetGroup', {
            name: 'default-db-subnet-group',
            subnetIds: subnets.ids
        } )

        // Define the security group for the RDS instance
        const rdsSecurityGroup = new DataAwsSecurityGroup( this, 'rdsSecurityGroup', {
            id: 'sg-0e2bf5741a9c594f7'
        } )

        const POSTGRES_USER = new TerraformVariable( this, 'postgres_user', {
            type: VariableType.STRING,
            default: 'postgres'
        } )
        const POSTGRES_PASSWORD = new StringResource( this, 'postgres_password', {
            length: 20,
            special: false,
        } )
        new TerraformOutput( this, 'postgresPasswordOutput', {
            value: POSTGRES_PASSWORD.result,
            description: 'The dynamically generated PostgreSQL password.',
            sensitive: true
        } )

        // RDS Cluster
        const rdsCluster = new RdsCluster( this, 'rdsCluster', {
            clusterIdentifier: 'halfords-serverless-cluster',
            engine: 'aurora-postgresql',
            engineMode: "provisioned",
            serverlessv2ScalingConfiguration: {
                minCapacity: 0.5,  // Corresponds to Aurora capacity unit (ACU)
                maxCapacity: 64,  // Corresponds to Aurora capacity unit (ACU)
            },
            masterUsername: POSTGRES_USER.value,
            masterPassword: POSTGRES_PASSWORD.result,  // Use a more secure approach for passwords in production
            dbSubnetGroupName: dbSubnetGroup.name,
            vpcSecurityGroupIds: [ rdsSecurityGroup.id ],
            dbClusterParameterGroupName: 'default.aurora-postgresql15',
            dbInstanceParameterGroupName: 'extensions',
            finalSnapshotIdentifier: 'halfords-serverless-cluster-' + Date.now(),
        } )

        // RDS Cluster Instance
        new RdsClusterInstance( this, 'rdsClusterInstance', {
            clusterIdentifier: rdsCluster.clusterIdentifier,
            engine: rdsCluster.engine,
            engineVersion: rdsCluster.engineVersion,
            instanceClass: 'db.serverless',
            publiclyAccessible: true,
        } )

        this.postgresPassword = POSTGRES_PASSWORD.result
        this.postgresUser = POSTGRES_USER.value
        this.eksClusterName = eks.name
        this.eksClusterEndpoint = eks.endpoint
        this.eksClusterCaCertificate = eks.certificateAuthority.get( 0 ).data

        // Outputs
        new TerraformOutput( this, 'eksClusterName', {
            value: this.eksClusterName,
            description: 'EKS Cluster Name'
        } )

        new TerraformOutput( this, 'eksClusterEndpoint', {
            value: this.eksClusterEndpoint,
            description: 'EKS Cluster Endpoint'
        } )

        new TerraformOutput( this, 'eksClusterCaCertificate', {
            value: this.eksClusterCaCertificate,
            description: 'EKS Cluster CA Certificate'
        } )
    }
}

class Authentication
    extends TerraformStack {
    constructor (
        scope: Construct,
        id: string,
        awsStack: AWS
    ) {
        super( scope, id )

        new LocalBackend( this )

        new KubernetesProvider( this, 'k8s', {
            host: awsStack.eksClusterEndpoint,
            clusterCaCertificate: awsStack.eksClusterCaCertificate,
            exec: [
                {
                    apiVersion: 'client.authentication.k8s.io/v1beta1',
                    command: 'aws',
                    args: [
                        'eks',
                        'get-token',
                        '--cluster-name',
                        awsStack.eksClusterName
                    ]
                }
            ]
        } )

        new RandomProvider( this, 'random', {} )

        // Permify

        new Deployment( this, 'permifyDeployment', {
            metadata: {
                name: 'permify',
                namespace: 'default'
            },
            spec: {
                replicas: '1',
                strategy: {
                    type: 'Recreate'
                },
                selector: {
                    matchLabels: {
                        app: 'permify'
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: 'permify'
                        }
                    },
                    spec: {
                        container: [
                            {
                                name: 'permify',
                                image: 'ghcr.io/permify/permify',
                                env: [
                                    { name: 'PERMIFY_ACCOUNT_ID', value: 'recASPn1X1pGJauXB' }
                                ],
                                port: [
                                    {
                                        containerPort: 3476
                                    }
                                ]
                            }
                        ],
                        restartPolicy: 'Always'
                    }
                }
            }
        } )
        new Service( this, 'permifyService', {
            metadata: {
                name: 'permify',
                namespace: 'default'
            },
            spec: {
                selector: {
                    app: 'permify'
                },
                port: [
                    {
                        port: 3476,
                        targetPort: '3476',
                        protocol: 'TCP'
                    }
                ],
                type: 'LoadBalancer'
            }
        } )

        // OpenSearch Deployment

        const opensearchVolume = new PersistentVolumeClaim( this, 'opensearchPersistentVolumeClaim', {
            metadata: {
                name: 'opensearch-pvc'
            },
            spec: {
                accessModes: [ 'ReadWriteOnce' ],
                resources: {
                    requests: {
                        storage: '10Gi'
                    }
                }
            }
        } )
        new Deployment( this, 'openSearchDeployment', {
            metadata: {
                name: 'opensearch',
                namespace: 'default'
            },
            spec: {
                replicas: '1',
                selector: {
                    matchLabels: {
                        app: 'opensearch'
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: 'opensearch'
                        }
                    },
                    spec: {
                        container: [
                            {
                                name: 'opensearch',
                                image: 'opensearchproject/opensearch:2.11.0',
                                env: [
                                    { name: 'cluster.name', value: 'fusionauth' },
                                    { name: 'discovery.type', value: 'single-node' },
                                    { name: 'node.name', value: 'search' },
                                    { name: 'plugins.security.disabled', value: 'true' },
                                    { name: 'bootstrap.memory_lock', value: 'true' },
                                    { name: 'OPENSEARCH_JAVA_OPTS', value: '-Xms512m -Xmx512m' }
                                ],
                                port: [
                                    {
                                        containerPort: 9200
                                    }
                                ],
                                volumeMount: [
                                    {
                                        name: 'opensearch-storage',
                                        mountPath: '/usr/share/opensearch/data'
                                    }
                                ]
                            }
                        ],
                        volume: [
                            {
                                name: 'opensearch-storage',
                                persistentVolumeClaim: {
                                    claimName: opensearchVolume.metadata.name
                                }
                            }
                        ]
                    }
                }
            }
        } )
        new Service( this, 'openSearchService', {
            metadata: {
                name: 'opensearch',
                namespace: 'default'
            },
            spec: {
                selector: {
                    app: 'opensearch'
                },
                port: [
                    {
                        port: 9200,
                        targetPort: '9200'
                    }
                ]
            }
        } )

        // Fusion Auth

        const fusionAuthConfigMap = new ConfigMap( this, 'fusionauthConfigMap', {
            metadata: {
                name: 'fusionauth-config',
                namespace: 'default'
            },
            data: {
                'kickstart.json': fs.readFileSync( './kickstart/kickstart.json', 'utf-8' )
            }
        } )
        const DATABASE_USERNAME = new TerraformVariable( this, 'database_username', {
            type: VariableType.STRING,
            default: 'fusionauth'
        } )
        const DATABASE_PASSWORD = new StringResource( this, 'database_password', {
            length: 20
        } )
        const fusionauthApiKey = new StringResource( this, 'fusionauthApiKey', {
            length: 20,
            special: false
        } )
        const fusionauthDefaultTenant = new Uuid( this, 'fusionauthDefaultTenant', {} )
        const fusionAdminUserId = new Uuid( this, 'fusionAdminUserId', {} )
        const FUSIONAUTH_APP_MEMORY = new TerraformVariable( this, 'fusionauthAppMemory', {
            type: VariableType.STRING,
            default: '512M'
        } )
        const FUSIONAUTH_APP_RUNTIME_MODE = new TerraformVariable( this, 'fusionauthAppRuntimeMode', {
            type: VariableType.STRING,
            default: 'development'
        } )

        new Deployment( this, 'fusionauthDeployment', {
            metadata: {
                name: 'fusionauth',
                namespace: 'default'
            },
            spec: {
                replicas: '1',
                selector: {
                    matchLabels: {
                        app: 'fusionauth'
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: 'fusionauth'
                        }
                    },
                    spec: {
                        initContainer: [
                            {
                                name: 'init-postgres',
                                image: 'busybox',
                                command: [
                                    'sh',
                                    '-c',
                                    'until nc -z postgres 5432; do echo waiting for postgres; sleep 2; done;'
                                ]
                            },
                            {
                                name: 'init-opensearch',
                                image: 'busybox',
                                command: [
                                    'sh',
                                    '-c',
                                    'until nc -z opensearch 9200; do echo waiting for opensearch; sleep 2; done;'
                                ]
                            }
                        ],
                        container: [
                            {
                                name: 'fusionauth',
                                image: 'fusionauth/fusionauth-app:latest',
                                env: [
                                    { name: 'DATABASE_URL', value: 'jdbc:postgresql://postgres:5432/fusionauth' },
                                    { name: 'DATABASE_ROOT_USERNAME', value: awsStack.postgresUser },
                                    { name: 'DATABASE_ROOT_PASSWORD', value: awsStack.postgresPassword },
                                    { name: 'DATABASE_USERNAME', value: DATABASE_USERNAME.value },
                                    { name: 'DATABASE_PASSWORD', value: DATABASE_PASSWORD.result },
                                    { name: 'FUSIONAUTH_APP_MEMORY', value: FUSIONAUTH_APP_MEMORY.value },
                                    { name: 'FUSIONAUTH_APP_RUNTIME_MODE', value: FUSIONAUTH_APP_RUNTIME_MODE.value },
                                    { name: 'FUSIONAUTH_APP_URL', value: 'http://fusionauth:9011' },
                                    { name: 'SEARCH_SERVERS', value: 'http://opensearch:9200' },
                                    { name: 'SEARCH_TYPE', value: 'elasticsearch' },
                                    { name: 'FUSIONAUTH_API_KEY', value: fusionauthApiKey.result },
                                    { name: 'FUSIONAUTH_DEFAULT_TENANT', value: fusionauthDefaultTenant.result },
                                    {
                                        name: 'FUSIONAUTH_APP_KICKSTART_FILE',
                                        value: '/usr/local/fusionauth/kickstart/kickstart.json'
                                    },
                                    { name: 'ADMIN_USER_ID', value: fusionAdminUserId.result }
                                ],
                                port: [
                                    {
                                        containerPort: 9011
                                    }
                                ],
                                volumeMount: [
                                    {
                                        name: 'fusionauth-config',
                                        mountPath: '/usr/local/fusionauth/kickstart/'
                                    }
                                ]
                            }
                        ],
                        volume: [
                            {
                                name: 'fusionauth-config',
                                configMap: {
                                    name: fusionAuthConfigMap.metadata.name
                                }
                            }
                        ]
                    }
                }
            }
        } )
        new Service( this, 'fusionauthService', {
            metadata: {
                name: 'fusionauth',
                namespace: 'default'
            },
            spec: {
                selector: {
                    app: 'fusionauth'
                },
                port: [
                    {
                        port: 9011,
                        targetPort: '9011'
                    }
                ],
                type: 'LoadBalancer'
            }
        } )
    }
}

const app = new App()
const aws = new AWS( app, 'aws' )
new Authentication( app, 'auth', aws ).dependsOn( aws )
app.synth()
