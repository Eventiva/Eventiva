/*
 * Project: Eventiva
 * File: setup.ts
 * Last Modified: 28/08/2024, 18:18
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

import { V1Deployment, V1Ingress, V1PodSpec, V1Service } from '@kubernetes/client-node'
import { compact, identity, pickBy } from 'lodash-es'

export type Options = {
    domain?: string;
    minReplicas?: number;
    maxReplicas?: number;
    inSecure?: boolean;
    namespace: string;
};

export class Setup {
    constructor (
        private name: string,
        private image: string,
        private execFile: string,
        private args: string[] = [],
        private options: Options
    ) {
    }

    get specs () {
        return compact( [ this.deployment, this.service, this.issuer, this.ingress ] )
    }

    get ingress (): V1Ingress | undefined {
        if ( !this.options.domain ) {
            return undefined
        }
        return {
            apiVersion: 'networking.k8s.io/v1',
            kind: 'Ingress',
            metadata: pickBy(
                {
                    name: this.name,
                    namespace: this.options.namespace,
                    annotations: !this.options.inSecure
                        ? {
                            'cert-manager.io/issuer': this.issuerName
                        }
                        : undefined
                },
                identity
            ),
            spec: pickBy(
                {
                    ingressClassName: 'nginx',
                    tls: !this.options.inSecure
                        ? [
                            {
                                hosts: [ this.host ],
                                secretName: this.issuerName
                            }
                        ]
                        : undefined,
                    rules: [
                        {
                            host: this.host,
                            http: {
                                paths: [
                                    {
                                        pathType: 'Prefix',
                                        path: '/',
                                        backend: {
                                            service: {
                                                name: this.name,
                                                port: {
                                                    number: this.servicePort
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                identity
            )
        }
    }

    get deployment (): V1Deployment {
        return {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
                name: this.name,
                namespace: this.options.namespace
            },
            spec: {
                selector: {
                    matchLabels: {
                        resourceId: this.name
                    }
                },
                replicas: this?.options?.minReplicas || 3,
                template: {
                    metadata: {
                        namespace: this.options.namespace,
                        annotations: {
                            'kubectl.symphony-fork.io/restartedAt': new Date().toISOString()
                        },
                        labels: {
                            resourceId: this.name
                        }
                    },
                    spec: this.spec
                }
            }
        }
    }

    private get issuerName () {
        return `issuer-${ this.name }`
    }

    private get host () {
        return this.options.domain
    }

    private get issuer () {
        if ( this.options.inSecure ) {
            return undefined
        }
        return {
            apiVersion: 'cert-manager.io/v1',
            kind: 'Issuer',
            metadata: {
                name: this.issuerName,
                namespace: this.options.namespace
            },
            spec: {
                acme: {
                    server: 'https://acme-v02.api.letsencrypt.org/directory',
                    privateKeySecretRef: {
                        name: 'letsencrypt-nginx-private-key'
                    },
                    solvers: [
                        {
                            http01: {
                                ingress: {
                                    class: 'nginx'
                                }
                            }
                        }
                    ]
                }
            }
        }
    }

    private get service (): V1Service {
        return {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: {
                name: this.name,
                namespace: this.options.namespace,
                labels: {
                    resourceId: this.name
                }
            },
            spec: {
                selector: {
                    resourceId: this.name
                },
                ports: [
                    {
                        name: this.name,
                        port: this.servicePort,
                        targetPort: this.containerPort
                    }
                ]
            }
        }
    }

    private get spec (): V1PodSpec {
        const spec: V1PodSpec = {
            containers: [
                {
                    name: this.name,
                    imagePullPolicy: 'Always',
                    image: this.image,
                    command: [
                        'node',
                        `./${ this.execFile }`,
                        ...this.args,
                        this.containerPort.toString()
                    ],
                    env: [],
                    args: [],
                    ports: [
                        {
                            containerPort: this.containerPort
                        }
                    ]
                }
            ]
        }

        return pickBy( spec, identity ) as V1PodSpec
    }

    private get servicePort () {
        return 80
    }

    private get containerPort () {
        return 5001;
    }
}
