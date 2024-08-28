/*
 * Project: Eventiva
 * File: symphony-fork-config.ts
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

export type SymphonyForkConfig = {
    /**
     *
     * docker base image use of creating all docker containers, e.g `node:latest`
     * defaults to `node:20.10.0`
     */
    baseImage: string;

    /**
     * kube config auth
     */
    auth?: {
        /**
         * stainable base64 yaml format
         * defaults: KUBE_CONFIG
         * reference to https://symphony-fork.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters
         */
        kubeConfig?: string;

        basic?: {
            /**
             * certificate
             */
            certificate: string;

            /**
             * server
             */
            server: string;

            /**
             * token
             */
            token: string;
        };
    };

    docker?: {
        /**
         * docker registry prefix like org name e.g grafana
         *  defaults is empty,
         */

        imagePrefix?: string;

        auth: {
            /**
             * docker username
             */
            username: string;

            /**
             * docker password
             */

            password: string;

            /**
             * docker registry e.g https://index.docker.io/v1/
             * defaults: https://index.docker.io/v1/
             */

            serveraddress?: string;
        };
    };
};
