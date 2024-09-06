/*
 * Project: Eventiva
 * File: http-security.ts
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

export interface BasicSecurity {
    type: 'basic';
}

export interface BearerSecurity {
    type: 'bearer';
    format?: 'JWT' | string;
}

export interface InputSecurity<K extends string> {
    type: 'input';
    name: K;
}

export interface CustomHeaderSecurity {
    type: 'header';
    name: string;
}

export interface CookieSecurity {
    type: 'cookie';
    name: string;
}

/**
 * @see https://swagger.io/docs/specification/authentication/openid-connect-discovery/
 * @desc available scopes has to be provided via the specified URL
 */
export interface OpenIdSecurity {
    type: 'openid';
    url: string;
}

interface AuthUrl {
    /**
     * @desc The authorization URL to use for this flow. Can be relative to the API server URL.
     * @see https://swagger.io/docs/specification/api-host-and-base-path/
     */
    authorizationUrl: string;
}

interface TokenUrl {
    /** @desc The token URL to use for this flow. Can be relative to the API server URL. */
    tokenUrl: string;
}

interface RefreshUrl {
    /** @desc The URL to be used for obtaining refresh tokens. Can be relative to the API server URL. */
    refreshUrl?: string;
}

interface Scopes<K extends string> {
    /** @desc The available scopes for the OAuth2 security and their short descriptions. Optional. */
    scopes?: Record<K, string>;
}

type AuthCodeFlow<S extends string> = AuthUrl &
    TokenUrl &
    RefreshUrl &
    Scopes<S>;

type ImplicitFlow<S extends string> = AuthUrl & RefreshUrl & Scopes<S>;
type PasswordFlow<S extends string> = TokenUrl & RefreshUrl & Scopes<S>;
type ClientCredFlow<S extends string> = TokenUrl & RefreshUrl & Scopes<S>;

/**
 * @see https://swagger.io/docs/specification/authentication/oauth2/
 */
export interface OAuth2Security<S extends string> {
    type: 'oauth2';
    flows?: {
        /** @desc Authorization Code flow (previously called accessCode in OpenAPI 2.0) */
        authorizationCode?: AuthCodeFlow<S>;
        /** @desc Implicit flow */
        implicit?: ImplicitFlow<S>;
        /** @desc Resource Owner Password flow */
        password?: PasswordFlow<S>;
        /** @desc Client Credentials flow (previously called application in OpenAPI 2.0) */
        clientCredentials?: ClientCredFlow<S>;
    };
}

/**
 * @desc Middleware security schema descriptor
 * @param K is an optional input field used by InputSecurity
 * @param S is an optional union of scopes used by OAuth2Security
 * */
export type Security<K extends string = string, S extends string = string> =
    | BasicSecurity
    | BearerSecurity
    | InputSecurity<K>
    | CustomHeaderSecurity
    | CookieSecurity
    | OpenIdSecurity
    | OAuth2Security<S>;
