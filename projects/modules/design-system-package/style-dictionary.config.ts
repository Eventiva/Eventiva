/*
 * Project: Eventiva
 * File: style-dictionary.config.ts
 * Last Modified: 06/09/2024, 08:12
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 *  and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 *  welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 *  https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 *  (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 *   in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 *   functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 *   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 *   PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 *   copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 *   licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 *   https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 *  or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 *  License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 *  Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 *  https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import path from 'node:path'
import type { Config } from 'style-dictionary/types'

export function config ( directory: string ) {
    const config: Config = {
        log: {
            verbosity: 'verbose'
        },
        platforms: {
            scss: {
                transformGroup: 'scss',
                buildPath: path.join( directory, 'scss/', '' ),
                files: [
                    {
                        destination: '_variables.scss',
                        format: 'scss/variables',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: '_icons.scss',
                        format: 'scss/icons',
                        options: {
                            outputReferences: true
                        }
                    }
                ]
            },
            css: {
                transformGroup: 'css',
                buildPath: path.join( directory, 'css/', '' ),
                files: [
                    {
                        format: 'css/variables',
                        destination: 'variables.css',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        format: 'css/fonts.css',
                        destination: 'fonts.css',
                        options: {
                            outputReferences: true
                        }
                    }
                ]
            },
            mjs: {
                transformGroup: 'js',
                buildPath: path.join( directory, 'javascript/mjs/', '' ),
                files: [
                    // {
                    //     destination: 'size.mjs',
                    //     format: 'javascript/module',
                    //     filter: {
                    //         type: 'size'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'color.mjs',
                    //     format: 'javascript/module',
                    //     filter: {
                    //         type: 'color'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'size.d.ts',
                    //     format: 'typescript/module-declarations',
                    //     filter: {
                    //         type: 'size'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'color.d.ts',
                    //     format: 'typescript/module-declarations',
                    //     filter: {
                    //         type: 'color'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // }
                    {
                        destination: 'dsp.mjs',
                        format: 'javascript/module',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'dsp.d.ts',
                        format: 'typescript/module-declarations',
                        options: {
                            outputReferences: true
                        }
                    },
                ]
            },
            cjs: {
                transformGroup: 'js',
                buildPath: path.join( directory, 'javascript/cjs/', '' ),
                files: [
                    // {
                    //     destination: 'size.cjs',
                    //     format: 'javascript/es6',
                    //     filter: {
                    //         type: 'size'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'color.cjs',
                    //     format: 'javascript/es6',
                    //     filter: {
                    //         type: 'color'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'size.d.ts',
                    //     format: 'typescript/es6-declarations',
                    //     filter: {
                    //         type: 'size'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    // {
                    //     destination: 'color.d.ts',
                    //     format: 'typescript/es6-declarations',
                    //     filter: {
                    //         type: 'color'
                    //     },
                    //     options: {
                    //         outputReferences: true
                    //     }
                    // },
                    {
                        destination: 'dsp.cjs',
                        format: 'javascript/es6',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'dsp.d.ts',
                        format: 'typescript/es6-declarations',
                        options: {
                            outputReferences: true
                        }
                    },
                ]
            },
            json: {
                transformGroup: 'js',
                buildPath: path.join( directory, 'json/', '' ),
                files: [
                    {
                        destination: 'tokens.json',
                        format: 'json',
                        options: {
                            outputReferences: true
                        }
                    }
                ]
            },
            less: {
                transformGroup: 'less',
                buildPath: path.join( directory, 'less/', '' ),
                files: [
                    {
                        destination: 'tokens.less',
                        format: 'less/variables',
                        options: {
                            outputReferences: true
                        }
                    }
                ]
            }
        }
    }
    return config
}

export default config
