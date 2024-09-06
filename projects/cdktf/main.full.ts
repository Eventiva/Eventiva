/*
 * Project: Eventiva
 * File: main.full.ts
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

import { ConfigMap } from '@cdktf/provider-kubernetes/lib/config-map'
import { Deployment } from '@cdktf/provider-kubernetes/lib/deployment'
import { PersistentVolumeClaim } from '@cdktf/provider-kubernetes/lib/persistent-volume-claim'
import { KubernetesProvider } from '@cdktf/provider-kubernetes/lib/provider'
import { Service } from '@cdktf/provider-kubernetes/lib/service'
import { RandomProvider } from '@cdktf/provider-random/lib/provider'
import { StringResource } from '@cdktf/provider-random/lib/string-resource'
import { Uuid } from '@cdktf/provider-random/lib/uuid'
import { App, LocalBackend, TerraformStack, TerraformVariable, VariableType } from 'cdktf'
import { Construct } from 'constructs'
import * as fs from 'node:fs'

class MyStack
    extends TerraformStack {
    constructor (
        scope: Construct,
        id: string
    ) {
        super( scope, id )

        // load the backend and providers for deployment
        new LocalBackend( this )

        new KubernetesProvider( this, 'k8s', {
            configPath: '~/.kube/config'
        } )

        new RandomProvider( this, 'random', {} )

        // Postgres construction

        const postgresVolume = new PersistentVolumeClaim( this, 'postgresPersistentVolumeClaim', {
            metadata: {
                name: 'postgres-pvc'
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
        const POSTGRES_USER = new TerraformVariable( this, 'postgres_user', {
            type: VariableType.STRING,
            default: 'postgres'
        } )
        const POSTGRES_PASSWORD = new StringResource( this, 'postgres_password', {
            length: 20
        } )
        new Deployment( this, 'postgresDeployment', {
            metadata: {
                name: 'postgres',
                namespace: 'default'
            },
            spec: {
                replicas: '1',
                selector: {
                    matchLabels: {
                        app: 'postgres'
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: 'postgres'
                        }
                    },
                    spec: {
                        container: [
                            {
                                name: 'postgres',
                                image: 'postgres:16.0-bookworm',
                                env: [
                                    { name: 'POSTGRES_USER', value: POSTGRES_USER.value },
                                    { name: 'POSTGRES_PASSWORD', value: POSTGRES_PASSWORD.result }
                                ],
                                port: [
                                    {
                                        containerPort: 5432
                                    }
                                ],
                                volumeMount: [
                                    {
                                        name: 'postgres-storage',
                                        mountPath: '/var/lib/postgresql/data'
                                    }
                                ]
                            }
                        ],
                        volume: [
                            {
                                name: 'postgres-storage',
                                persistentVolumeClaim: {
                                    claimName: postgresVolume.metadata.name
                                }
                            }
                        ]
                    }
                }
            }
        } )
        new Service( this, 'postgresService', {
            metadata: {
                name: 'postgres',
                namespace: 'default'
            },
            spec: {
                selector: {
                    app: 'postgres'
                },
                port: [
                    {
                        port: 5432,
                        targetPort: '5432',
                        nodePort: 30010
                    }
                ],
                type: 'NodePort'
            }
        } )

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

        // Docker-mailserver

        // const dockerMailServerConfigMap = new ConfigMap( this, 'dockerMailserverConfigMap', {
        //     metadata: {
        //         name: 'dockerMailserver-config',
        //         namespace: 'default'
        //     },
        //     immutable: false,
        //     data: {
        //         TLS_LEVEL: "modern",
        //         POSTSCREEN_ACTION: "drop",
        //         OVERRIDE_HOSTNAME: "mail.example.com",
        //         FAIL2BAN_BLOCKTYPE: "drop",
        //         POSTMASTER_ADDRESS: "postmaster@example.com",
        //         UPDATE_CHECK_INTERVAL: "10d",
        //         POSTFIX_INET_PROTOCOLS: "ipv4",
        //         ENABLE_CLAMAV: '1',
        //         ENABLE_POSTGREY: '0',
        //         ENABLE_FAIL2BAN: '1',
        //         AMAVIS_LOGLEVEL: '-1',
        //         SPOOF_PROTECTION: '1',
        //         MOVE_SPAM_TO_JUNK: '1',
        //         ENABLE_UPDATE_CHECK: '1',
        //         ENABLE_SPAMASSASSIN: '1',
        //         SUPERVISOR_LOGLEVEL: "warn",
        //         SPAMASSASSIN_SPAM_TO_INBOX: '1',
        //
        //         SSL_TYPE: "manual",
        //         SSL_CERT_PATH: "/secrets/ssl/rsa/tls.crt",
        //         SSL_KEY_PATH: "/secrets/ssl/rsa/tls.key"
        //     }
        // } )
        // const dockerMailServerVolume = new PersistentVolumeClaim( this, 'dockerMailserverPersistentVolumeClaim', {
        //     metadata: {
        //         name: 'dockerMailserver-pvc'
        //     },
        //     spec: {
        //         accessModes: [ 'ReadWriteOnce' ],
        //         resources: {
        //             requests: {
        //                 storage: '10Gi'
        //             }
        //         }
        //     }
        // } )
        // const dockerMailServerFilesVolume = new PersistentVolumeClaim( this, 'dockerMailserverFilesPersistentVolumeClaim', {
        //     metadata: {
        //         name: 'dockerMailserverFiles-pvc'
        //     },
        //     spec: {
        //         accessModes: [ 'ReadWriteOnce' ],
        //         resources: {
        //             requests: {
        //                 storage: '10Gi'
        //             }
        //         }
        //     }
        // } )
        // new Deployment( this, 'dockerMailserverDeployment', {
        //     metadata: {
        //         name: 'mailserver',
        //         namespace: 'default'
        //     },
        //     spec: {
        //         replicas: '1',
        //         selector: {
        //             matchLabels: {
        //                 app: 'mailserver'
        //             }
        //         },
        //         template: {
        //             metadata: {
        //                 labels: {
        //                     app: 'mailserver'
        //                 },
        //                 annotations: {
        //                     "container.apparmor.security.beta.kubernetes.io/mailserver": "runtime/default"
        //                 }
        //             },
        //             spec: {
        //                 container: [
        //                     {
        //                         name: 'mailserver',
        //                         image: 'ghcr.io/docker-mailserver/docker-mailserver:latest',
        //                         securityContext: {
        //                             allowPrivilegeEscalation: true,
        //                             readOnlyRootFilesystem: false,
        //                             runAsUser: "0",
        //                             runAsGroup: "0",
        //                             runAsNonRoot: false,
        //                             privileged: false,
        //                             capabilities: {
        //                                 add: [
        //                                     'CHOWN',
        //                                     'FOWNER',
        //                                     'MKNOD',
        //                                     'SETGID',
        //                                     'SETUID',
        //                                     'DAC_OVERRIDE',
        //                                     'NET_ADMIN',
        //                                     'NET_RAW',
        //                                     'NET_BIND_SERVICE',
        //                                     'SYS_CHROOT',
        //                                     'KILL'
        //                                 ],
        //                                 drop: ['ALL']
        //                             },
        //                             seccompProfile: {
        //                                 type: 'RuntimeDefault'
        //                             }
        //                         },
        //                         resources: {
        //                             limits: {
        //                                 memory: '4Gi',
        //                                 cpu: '1500m'
        //                             },
        //                             requests: {
        //                                 memory: '2Gi',
        //                                 cpu: '600m'
        //                             }
        //                         },
        //                         port: [
        //                             {
        //                                 name: 'smtp',
        //                                 containerPort: 25,
        //                                 protocol: 'TCP'
        //                             },
        //                             {
        //                                 name: 'submissions',
        //                                 containerPort: 465,
        //                                 protocol: 'TCP'
        //                             },
        //                             {
        //                                 name: 'submission',
        //                                 containerPort: 587,
        //                             },
        //                             {
        //                                 name: 'imaps',
        //                                 containerPort: 993,
        //                                 protocol: 'TCP'
        //                             },
        //                         ],
        //                         volumeMount: [
        //                             {
        //                                 name: 'dockerMailServer-storage',
        //                                 subPath: 'postfix-accounts.cf',
        //                                 mountPath: '/tmp/docker-mailserver/postfix-accounts.cf',
        //                                 readOnly: true
        //                             }
        //                         ]
        //                     }
        //                 ],
        //                 restartPolicy: 'Always',
        //                 volume: [
        //                     {
        //                         name: 'dockerMailServer-storage',
        //                         persistentVolumeClaim: {
        //                             claimName: dockerMailServerVolume.metadata.name
        //                         }
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        // } )
        // new Service( this, 'dockerMailserverService', {
        //     metadata: {
        //         name: 'opensearch',
        //         namespace: 'default'
        //     },
        //     spec: {
        //         selector: {
        //             app: 'opensearch'
        //         },
        //         port: [
        //             {
        //                 name: 'smtp',
        //                 port: 25,
        //                 targetPort: '25'
        //             },
        //             {
        //                 name: 'submissions',
        //                 port: 465,
        //                 targetPort: '465'
        //             },
        //             {
        //                 name: 'submission',
        //                 port: 587,
        //                 targetPort: '587'
        //             },
        //             {
        //                 name: 'imaps',
        //                 port: 993,
        //                 targetPort: '993'
        //             },
        //         ]
        //     }
        // } )

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

        // TODO: figure out why this breaks things
        // const fusionauthVolume =  new PersistentVolumeClaim(this, 'fusionauthPersistentVolumeClaim', {
        //     metadata: {
        //         name: 'fusionauth-pvc',
        //     },
        //     spec: {
        //         accessModes: [
        //             'ReadWriteOnce'
        //         ],
        //         resources: {
        //             requests: {
        //                 storage: '10Gi',
        //             },
        //         },
        //         storageClassName: 'standard'
        //     },
        // })
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
                                    { name: 'DATABASE_ROOT_USERNAME', value: POSTGRES_USER.value },
                                    { name: 'DATABASE_ROOT_PASSWORD', value: POSTGRES_PASSWORD.result },
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
                                    //     {
                                    //         name: 'fusionauth-storage',
                                    //         mountPath: "/usr/local/fusionauth/config",
                                    //     }
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
                            //     {
                            //         name: 'fusionauth-storage',
                            //         persistentVolumeClaim: {
                            //             claimName: fusionauthVolume.metadata.name,
                            //         },
                            //     }
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
new MyStack( app, 'k8' )
app.synth()

