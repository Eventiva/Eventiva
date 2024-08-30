/*
 * Project: Eventiva
 * File: main.docker.ts
 * Last Modified: 30/08/2024, 12:33
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

import { Container } from '@cdktf/provider-docker/lib/container'
import { Image } from '@cdktf/provider-docker/lib/image'
import { Network } from '@cdktf/provider-docker/lib/network'
import { DockerProvider } from '@cdktf/provider-docker/lib/provider'
import { Volume } from '@cdktf/provider-docker/lib/volume'
import { RandomProvider } from '@cdktf/provider-random/lib/provider'
import { StringResource } from '@cdktf/provider-random/lib/string-resource'
import { Uuid } from '@cdktf/provider-random/lib/uuid'
import { App, LocalBackend, TerraformStack, TerraformVariable, VariableType } from 'cdktf'
import { Construct } from 'constructs'
import * as Path from 'node:path'

class MyStack
    extends TerraformStack {
    constructor (
        scope: Construct,
        id: string
    ) {
        super( scope, id )

        // load the backend and providers for deployment
        new LocalBackend( this )
        new DockerProvider( this, 'docker', {} )
        new RandomProvider( this, 'random', {} )

        // create the docker networks
        const dbNetwork = new Network( this, 'dbNetwork', {
            name: 'dbNetwork',
            driver: 'bridge'
        } )
        const searchNetwork = new Network( this, 'searchNetwork', {
            name: 'searchNetwork',
            driver: 'bridge'
        } )

        // Create the docker volumes
        const dbVolume = new Volume( this, 'dbVolume', {
            name: 'dbVolume'
        } )
        const searchVolume = new Volume( this, 'searchVolume', {
            name: 'searchVolume'
        } )
        const fusionAuthVolume = new Volume( this, 'fusionAuthVolume', {
            name: 'fusionAuthVolume'
        } )

        // Create the fusionAuth kickstarter values
        const fusionAuthApiKey = new StringResource( this, 'fusionAuthApiKey', {
            length: 20,
            special: false
        } )
        const fusionAuthDefaultTenant = new Uuid( this, 'fusionAuthDefaultTenant', {} )
        const fusionAdminUserId = new Uuid( this, 'fusionAdminUserId', {} )
        const FUSIONAUTH_APP_MEMORY = new TerraformVariable( this, 'fusionAuthAppMemory', {
            type: VariableType.STRING,
            default: '512M'
        } )
        const FUSIONAUTH_APP_RUNTIME_MODE = new TerraformVariable( this, 'fusionAuthAppRuntimeMode', {
            type: VariableType.STRING,
            default: 'development'
        } )
        const OPENSEARCH_JAVA_OPTS = new TerraformVariable( this, 'openSearchJavaOpts', {
            type: VariableType.STRING,
            default: '-Xms512m -Xmx512m'
        } )

        // Get the docker images
        const postgresImage = new Image( this, 'postgresImage', {
            name: 'postgres:16.0-bookworm',
            keepLocally: true
        } )
        const openSearchImage = new Image( this, 'openSearchImage', {
            name: 'opensearchproject/opensearch:2.11.0',
            keepLocally: true
        } )
        const fusionAuthImage = new Image( this, 'fusionAuthImage', {
            name: 'fusionauth/fusionauth-app:1.52.1',
            keepLocally: true
        } )

        // Configure passwords
        const POSTGRES_USER = new TerraformVariable( this, 'postgres_user', {
            type: VariableType.STRING,
            default: 'postgres'
        } )
        const POSTGRES_PASSWORD = new StringResource( this, 'postgres_password', {
            length: 20
        } )
        const DATABASE_USERNAME = new TerraformVariable( this, 'database_username', {
            type: VariableType.STRING,
            default: 'fusionauth'
        } )
        const DATABASE_PASSWORD = new StringResource( this, 'database_password', {
            length: 20
        } )

        // Create the docker containers
        const postgresContainer = new Container( this, 'postgresContainer', {
            name: 'db',
            image: postgresImage.imageId,
            env: [
                'PGDATA=/var/lib/postgresql/data/pgdata',
                `POSTGRES_USER=${ POSTGRES_USER.value }`,
                `POSTGRES_PASSWORD=${ POSTGRES_PASSWORD.result }`
            ],
            healthcheck: {
                test: [ 'CMD-SHELL', 'pg_isready -U postgres' ],
                interval: '5s',
                timeout: '5s',
                retries: 5
            },
            ports: [
                {
                    internal: 5432,
                    external: 5433
                }
            ],
            restart: 'unless-stopped',
            volumes: [
                {
                    volumeName: dbVolume.name,
                    containerPath: '/var/lib/postgresql/data'
                }
            ],
            networksAdvanced: [
                {
                    name: dbNetwork.name
                }
            ]
        } )
        const openSearchContainer = new Container( this, 'openSearchContainer', {
            name: 'search',
            image: openSearchImage.imageId,
            env: [
                'cluster.name=fusionauth',
                'discovery.type=single-node',
                'node.name=search',
                'plugins.security.disabled=true',
                'bootstrap.memory_lock=true',
                `OPENSEARCH_JAVA_OPTS=${ OPENSEARCH_JAVA_OPTS.value }`
            ],
            // healthcheck: {
            //     interval: "10s",
            //     retries: 80,
            //     test: ["curl --write-out 'HTTP %%{http_code}' --fail --silent --output /dev/null http://localhost:9200/"]
            // },
            restart: 'unless-stopped',
            ports: [
                {
                    internal: 9200,
                    external: 9200
                },
                {
                    internal: 9600,
                    external: 9600
                }
            ],
            ulimit: [
                {
                    name: 'nofile',
                    soft: 65536,
                    hard: 65536
                },
                {
                    name: 'memlock',
                    hard: -1,
                    soft: -1
                }
            ],
            volumes: [
                {
                    volumeName: searchVolume.name,
                    containerPath: '/usr/share/opensearch/data'
                }
            ],
            networksAdvanced: [
                {
                    name: searchNetwork.name
                }
            ]
        } )
        new Container( this, 'fusionAuthContainer', {
            name: 'fusionAuth',
            image: fusionAuthImage.imageId,
            dependsOn: [ postgresContainer, openSearchContainer ],
            env: [
                'DATABASE_URL=jdbc:postgresql://db:5432/fusionauth',
                `DATABASE_ROOT_USERNAME=${ POSTGRES_USER.value }`,
                `DATABASE_ROOT_PASSWORD=${ POSTGRES_PASSWORD.result }`,
                `DATABASE_USERNAME=${ DATABASE_USERNAME.value }`,
                `DATABASE_PASSWORD=${ DATABASE_PASSWORD.result }`,
                `FUSIONAUTH_APP_MEMORY=${ FUSIONAUTH_APP_MEMORY.value }`,
                `FUSIONAUTH_APP_RUNTIME_MODE=${ FUSIONAUTH_APP_RUNTIME_MODE.value }`,
                'FUSIONAUTH_APP_URL=http://fusionauth:9011',
                'SEARCH_SERVERS=http://search:9200',
                'SEARCH_TYPE=elasticsearch',
                `FUSIONAUTH_API_KEY=${ fusionAuthApiKey.result }`,
                `FUSIONAUTH_DEFAULT_TENANT=${ fusionAuthDefaultTenant.result }`,
                `FUSIONAUTH_APP_KICKSTART_FILE=/usr/local/fusionauth/kickstart/kickstart.json`,
                `ADMIN_USER_ID=${ fusionAdminUserId.result }`
            ],
            // healthcheck: {
            //     test: [ "curl --silent --fail http://localhost:9011/api/status -o /dev/null -w \"%{http_code}\"" ],
            //     interval: '5s',
            //     timeout: '5s',
            //     retries: 5
            // },
            restart: 'unless-stopped',
            ports: [
                {
                    internal: 9011,
                    external: 9011
                }
            ],
            volumes: [
                {
                    volumeName: fusionAuthVolume.name,
                    containerPath: '/usr/local/fusionauth/config'
                }, {
                    hostPath: Path.join( __dirname + '/kickstart' ),
                    containerPath: '/usr/local/fusionauth/kickstart'
                }
            ],
            networksAdvanced: [
                {
                    name: searchNetwork.name
                },
                {
                    name: dbNetwork.name
                }
            ]
        } )

        // // Initialise Fusionauth Provider

        // TODO: Extract - Turns out the fusionAuth provider requires fusionAuth to exist before it can connect.
        //  Therefore will need to be moved into another file or figure out how to use "DependsOn" functionality


        // const fusionHost = new TerraformVariable(this, "fusionauth_host", {
        //     type: VariableType.STRING,
        //     default: "http://localhost:9011",
        //     description: "Host for FusionAuth instance",
        // });
        // new FusionauthProvider(this, 'fusionauth', {
        //     apiKey: fusionAuthApiKey.result,
        //     host: fusionHost.value,
        // })
        //
        // const brandedTheme = new Theme(this, 'branded_theme', {
        //     sourceThemeId: "75a068fd-e94b-451a-9aeb-3ddb9a3b5987",
        //     name: "Branded"
        // })
        //
        // const defaultTenant = new Tenant(this, 'default_tenant', {
        //     tenantId: fusionAuthDefaultTenant.result,
        //     emailConfiguration: {
        //         defaultFromEmail: "noreply@eventiva.co.uk",
        //         defaultFromName: "Eventiva Ltd",
        //         host: "localhost",
        //         implicitEmailVerificationAllowed: true,
        //         port: 25,
        //         security: "NONE",
        //         verificationStrategy: "ClickableLink",
        //         verifyEmail: false,
        //         verifyEmailWhenChanged: false,
        //     },
        //     externalIdentifierConfiguration: {
        //         authorizationGrantIdTimeToLiveInSeconds: 30,
        //         changePasswordIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         changePasswordIdTimeToLiveInSeconds: 600,
        //         deviceCodeTimeToLiveInSeconds: 300,
        //         deviceUserCodeIdGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         emailVerificationIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         emailVerificationIdTimeToLiveInSeconds: 86400,
        //         emailVerificationOneTimeCodeGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         externalAuthenticationIdTimeToLiveInSeconds: 300,
        //         oneTimePasswordTimeToLiveInSeconds: 60,
        //         passwordlessLoginGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         passwordlessLoginTimeToLiveInSeconds: 180,
        //         registrationVerificationIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         registrationVerificationIdTimeToLiveInSeconds: 86400,
        //         registrationVerificationOneTimeCodeGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         samlV2AuthnRequestIdTtlSeconds: 300,
        //         setupPasswordIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         setupPasswordIdTimeToLiveInSeconds: 86400,
        //         twoFactorIdTimeToLiveInSeconds: 300,
        //         twoFactorOneTimeCodeIdGenerator: {
        //             length: 6,
        //             type: "randomDigits",
        //         },
        //         twoFactorTrustIdTimeToLiveInSeconds: 2592000,
        //     },
        //     issuer: "eventiva.co.uk",
        //     jwtConfiguration: [
        //         {
        //             refreshTokenRevocationPolicyOnLoginPrevented: true,
        //             refreshTokenRevocationPolicyOnPasswordChange: true,
        //             refreshTokenTimeToLiveInMinutes: 43200,
        //             timeToLiveInSeconds: 3600,
        //         },
        //     ],
        //     // lifecycle: {
        //     //     preventDestroy: true,
        //     // },
        //     loginConfiguration: {
        //         requireAuthentication: true,
        //     },
        //     name: "Default",
        //     themeId: brandedTheme.id,
        // })
        //
        // const defaultApplication = new Application(this, "FusionAuth", {
        //     // lifecycle: {
        //     //     preventDestroy: true,
        //     // },
        //     name: "FusionAuth",
        //     tenantId: defaultTenant.id,
        // });
        // defaultApplication.importFrom("3c219e58-ed0e-4b18-ad48-f4f92793ae32");
        //
        // const developmentAccessKey = new Key(this, 'development_access_key', {
        //     name: 'development_access_key',
        //     algorithm: 'HS512'
        // })
        //
        // const developmentTenant = new Tenant(this, 'development_tenant', {
        //     emailConfiguration: {
        //         defaultFromEmail: "noreply@eventiva.co.uk",
        //         defaultFromName: "Eventiva Ltd",
        //         host: "localhost",
        //         implicitEmailVerificationAllowed: true,
        //         port: 25,
        //         security: "NONE",
        //         verificationStrategy: "ClickableLink",
        //         verifyEmail: false,
        //         verifyEmailWhenChanged: false,
        //     },
        //     externalIdentifierConfiguration: {
        //         authorizationGrantIdTimeToLiveInSeconds: 30,
        //         changePasswordIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         changePasswordIdTimeToLiveInSeconds: 600,
        //         deviceCodeTimeToLiveInSeconds: 300,
        //         deviceUserCodeIdGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         emailVerificationIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         emailVerificationIdTimeToLiveInSeconds: 86400,
        //         emailVerificationOneTimeCodeGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         externalAuthenticationIdTimeToLiveInSeconds: 300,
        //         oneTimePasswordTimeToLiveInSeconds: 60,
        //         passwordlessLoginGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         passwordlessLoginTimeToLiveInSeconds: 180,
        //         registrationVerificationIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         registrationVerificationIdTimeToLiveInSeconds: 86400,
        //         registrationVerificationOneTimeCodeGenerator: {
        //             length: 6,
        //             type: "randomAlphaNumeric",
        //         },
        //         samlV2AuthnRequestIdTtlSeconds: 300,
        //         setupPasswordIdGenerator: {
        //             length: 32,
        //             type: "randomBytes",
        //         },
        //         setupPasswordIdTimeToLiveInSeconds: 86400,
        //         twoFactorIdTimeToLiveInSeconds: 300,
        //         twoFactorOneTimeCodeIdGenerator: {
        //             length: 6,
        //             type: "randomDigits",
        //         },
        //         twoFactorTrustIdTimeToLiveInSeconds: 2592000,
        //     },
        //     issuer: "eventiva.co.uk",
        //     jwtConfiguration: [
        //         {
        //             refreshTokenRevocationPolicyOnLoginPrevented: true,
        //             refreshTokenRevocationPolicyOnPasswordChange: true,
        //             refreshTokenTimeToLiveInMinutes: 43200,
        //             timeToLiveInSeconds: 3600,
        //         },
        //     ],
        //     // lifecycle: {
        //     //     preventDestroy: true,
        //     // },
        //     loginConfiguration: {
        //         requireAuthentication: true,
        //     },
        //     name: "Development",
        //     themeId: brandedTheme.id,
        // })
        //
        // const developmentApplication = new Application(this, "development_application", {
        //     // lifecycle: {
        //     //     preventDestroy: true,
        //     // },
        //     name: "Development NodeJS",
        //     tenantId: developmentTenant.id,
        //     jwtConfiguration: {
        //         accessTokenId: developmentAccessKey.id
        //     }
        // });
        //
        // new ApplicationRole(this, "development_role_admin", {
        //     applicationId: developmentApplication.id,
        //     isDefault: false,
        //     isSuperRole: true,
        //     name: 'admin'
        // })
        //
        // new ApplicationRole(this, 'development_role_user', {
        //     applicationId: developmentApplication.id,
        //     isDefault: true,
        //     isSuperRole: false,
        //     name: 'user'
        // })
    }
}

const app = new App()
new MyStack( app, 'develop' )
app.synth()

