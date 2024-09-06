/*
 * Project: Eventiva
 * File: platform.browser.runtime.tsx
 * Last Modified: 06/09/2024, 16:21
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import {Logo} from '@bitdesign/sparks.content.logo'
import {NavigationProvider} from '@bitdesign/sparks.navigation.link'
import {SparksTheme} from '@bitdesign/sparks.sparks-theme'
import {mount, mountServer} from '@bitdev/symphony.frontends.platform-mounter'
import type {Route, RouteSlot} from '@bitdev/symphony.frontends.route'
import {ComponentType, ReactNode} from 'react'
import type {
    Hud,
    HudSlot,
    LayoutEntry,
    LayoutEntrySlot,
    LayoutMap,
    TopLevelComponent,
    TopLevelComponentType,
    TopLevelSlot
} from './layout-map.js'
import {PlatformApp} from './platform-app.js'
import {PlatformConfig} from './platform-config.js'

export class PlatformBrowser {
    static dependencies = []
    static defaultConfig: PlatformConfig = {}
    private _theme: TopLevelComponentType = SparksTheme

    constructor(
            /**
             * slot for routes provided by other aspects.
             */
            private routeSlot: RouteSlot,
            /**
             * slot for layout entry.
             */
            private layoutEntrySlot: LayoutEntrySlot,
            /**
             * slot for top level components
             */
            private topLevelSlot: TopLevelSlot,
            /**
             * slot for rendering components
             * near the tree.
             */
            private hudSlot: HudSlot,
            /**
             * symphony platform config.
             */
            private config: PlatformConfig
    ) {
    }

    static async provider(
            deps: [],
            config: PlatformConfig,
            [routeSlot, layoutEntrySlot, topLevelSlot, hudSlot]: [
                RouteSlot,
                LayoutEntrySlot,
                TopLevelSlot,
                HudSlot
            ]
    ) {
        const platform = new PlatformBrowser(
                routeSlot,
                layoutEntrySlot,
                topLevelSlot,
                hudSlot,
                config
        )

        if (!config.skipDefaultProviders) {
            platform.registerTopLevel({
                weight: 0,
                component: ({children}) => {
                    const Theme = platform._theme
                    return (
                            <NavigationProvider>
                                <Theme>{children}</Theme>
                            </NavigationProvider>
                    )
                }
            })
        }

        return platform
    }

    /**
     * compose top level components into a single one.
     */
    composeTopLevelComponent() {
        const topLevelComponents = this.listTopLevelComponents()

        return ({children}: { children: ReactNode }) => {
            return topLevelComponents.reduceRight((
                    acc,
                    topLevel
            ) => {
                const TopLevel = topLevel.component

                return <TopLevel>{acc}</TopLevel>
            }, children)
        }
    }

    /**
     * get the platform logo.
     */
    getLogo() {
        return this._logo
    }

    /**
     * register a logo component.
     */
    registerLogo(logo: ComponentType) {
        this._logo = logo
        return this
    }

    /**
     * render the app in the browser.
     */
    async render() {
        const routes = this.listRoutes()
        const layoutEntries = this.getLayout()
        const hud = this.mergeHuds()
        const TopLevel = this.composeTopLevelComponent()

        return mount(
                <PlatformApp
                        layout={layoutEntries}
                        hud={hud}
                        TopLevel={TopLevel}
                        routes={routes}
                        NotFoundComponent={this._pageNotFound}
                />
        )
    }

    registerMounter() {
    }

    /**
     * register a not found page.
     */
    registerPageNotFound(notFoundComponent: ComponentType) {
        this._pageNotFound = notFoundComponent
        return this
    }

    /**
     * render the app ssr.
     */
    async renderSsr(
            aspectId: string,
            {path, cookie}: { path: string; cookie: string }
    ) {
        const layoutEntries = this.getLayout()
        const routes = this.listRoutes()
        const hud = this.mergeHuds()
        const topLevelComponent = this.composeTopLevelComponent()

        return mountServer(<PlatformApp
                layout={layoutEntries}
                hud={hud}
                TopLevel={topLevelComponent}
                routes={routes}
                NotFoundComponent={this._pageNotFound}
        />, {
            cookie,
            path
        })
    }

    /**
     * register a new route.
     */
    registerRoute(routes: Route[]) {
        this.routeSlot.register(routes)
        return this
    }

    /**
     * register layout entry
     */
    registerLayoutEntry(layout: LayoutEntry[]) {
        this.layoutEntrySlot.register(layout)
        return this
    }

    /**
     * get the layout entries.
     */
    getLayout(): LayoutMap {
        const layoutEntries = this.layoutEntrySlot.flatValues()
        return layoutEntries.reduce((
                acc: LayoutMap,
                current: LayoutEntry
        ) => {
            if (!acc[current.position]) {
                acc[current.position] = current
            }
            return acc
        }, {})
    }

    /**
     * register a hud to render
     * near the tree. (without wrapping it)
     */
    registerHud(huds: Hud[]) {
        this.hudSlot.register(huds)
        return this
    }

    /**
     * list top level components by weight.
     */
    listTopLevelComponents() {
        return this.topLevelSlot.sortByWeight()
    }

    /**
     * list all hud values to render.
     */
    listHuds() {
        return this.hudSlot.flatValues()
    }

    /**
     * register a top level component that
     * wraps the app tree
     */
    registerTopLevel(topLevelComponents: TopLevelComponent) {
        this.topLevelSlot.register(topLevelComponents)
        return this
    }

    /**
     * list all routes.
     */
    listRoutes() {
        return this.routeSlot.flatValues()
    }

    /**
     * wrap the system with a theme.
     */
    registerTheme(theme: TopLevelComponentType) {
        this._theme = theme
        return this
    }

    private _logo: ComponentType = () => (
            <Logo
                    href="/"
                    name={this.config.name}
                    slogan={this.config.slogan}
                    src={this.config.logo}
            />
    )

    // state for page not found.
    private _pageNotFound: ComponentType = () => <>Page not found!</>

    private mergeHuds(): ReactNode {
        const huds = this.hudSlot.flatValues()
        return (
                <>
                    {huds.map((
                            HudComponent,
                            key
                    ) => (
                            <HudComponent key={key}/>
                    ))}
                </>
        )
    }
}

export default PlatformBrowser;
