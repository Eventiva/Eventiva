/*
 * Project: Eventiva
 * File: style-dictionary.config.ts
 * Last Modified: 11/08/2024, 23:34
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

import path from 'node:path'
import type { Config } from 'style-dictionary/types'

export function config ( directory: string ) {
    const config: Config = {
        platforms: {
            ios: {
                transformGroup: 'ios',
                buildPath: path.join( directory, 'ios/Classes/Generated/', '' ),
                files: [
                    {
                        destination: 'Size.h',
                        format: 'ios/static.h',
                        options: {
                            className: 'Size',
                            type: 'float'
                        },
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'Size.m',
                        format: 'ios/static.m',
                        options: {
                            className: 'Size',
                            type: 'float'
                        },
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'Icons.h',
                        format: 'ios/strings.h',
                        options: {
                            className: 'Icons'
                        },
                        filter: {
                            attributes: {
                                category: 'content',
                                type: 'icon'
                            }
                        }
                    },
                    {
                        destination: 'Icons.m',
                        format: 'ios/strings.m',
                        options: {
                            className: 'Icons'
                        },
                        filter: {
                            attributes: {
                                category: 'content',
                                type: 'icon'
                            }
                        }
                    },
                    {
                        destination: 'Color.h',
                        format: 'ios/colors.h',
                        options: {
                            className: 'Color',
                            type: 'ColorName'
                        },
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    },
                    {
                        destination: 'Color.m',
                        format: 'ios/colors.m',
                        options: {
                            className: 'Color',
                            type: 'ColorName'
                        },
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    },
                    {
                        destination: 'Properties.h',
                        format: 'ios/singleton.h',
                        options: {
                            className: 'Properties'
                        }
                    },
                    {
                        destination: 'Properties.m',
                        format: 'ios/singleton.m',
                        options: {
                            className: 'Properties'
                        }
                    }
                ]
            },
            android: {
                transformGroup: 'android',
                buildPath: path.join( directory, 'android/src/main/res/values/', '' ),
                files: [
                    {
                        destination: 'colors.xml',
                        format: 'android/colors',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'font_dimens.xml',
                        format: 'android/fontDimens',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'dimens.xml',
                        format: 'android/dimens',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'integers.xml',
                        format: 'android/integers',
                        options: {
                            outputReferences: true
                        }
                    },
                    {
                        destination: 'strings.xml',
                        format: 'android/strings',
                        options: {
                            outputReferences: true
                        }
                    }
                ]
            },
            'android-asset': {
                transformGroup: 'android',
                buildPath: path.join( directory, 'android/src/main/', '' ),
                files: [
                    {
                        destination: 'assets/data/properties.json',
                        format: 'json',
                        options: {
                            outputReferences: true
                        }
                    }
                ],
                actions: [ 'copy_assets' ]
            },
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
                transformGroup: 'mjs',
                buildPath: path.join( directory, 'javascript/', '' ),
                files: [
                    {
                        destination: 'size.js',
                        format: 'javascript/module',
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'color.js',
                        format: 'javascript/module',
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    },
                    {
                        destination: 'size.js',
                        format: 'typescript/module-declarations',
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'color.js',
                        format: 'typescript/module-declarations',
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    }
                ]
            },
            cjs: {
                transformGroup: 'cjs',
                buildPath: path.join( directory, 'javascript/', '' ),
                files: [
                    {
                        destination: 'size.js',
                        format: 'javascript/es6',
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'color.js',
                        format: 'javascript/es6',
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    },
                    {
                        destination: 'size.js',
                        format: 'typescript/es6-declarations',
                        filter: {
                            attributes: {
                                category: 'size'
                            }
                        }
                    },
                    {
                        destination: 'color.js',
                        format: 'typescript/es6-declarations',
                        filter: {
                            attributes: {
                                category: 'color'
                            }
                        }
                    }
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
            // compose: {
            //     transformGroup: "compose",
            //     buildPath: "compose/",
            //     files: [
            //         {
            //
            //         }
            //     ]
            // },
            stylus: {
                transformGroup: 'stylus',
                buildPath: path.join( directory, 'stylus/', '' ),
                files: [
                    {
                        destination: 'token.stylus',
                        format: 'stylus/variables'
                    }
                ]
            },
            less: {
                transformGroup: 'less',
                buildPath: path.join( directory, 'less/', '' ),
                files: [
                    {
                        destination: 'tokens.less',
                        format: 'less/variables'
                    }
                ]
            }
        }
    }
    return config
}

export default config
