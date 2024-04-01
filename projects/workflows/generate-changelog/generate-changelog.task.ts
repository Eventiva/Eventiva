import { sendToDiscord } from '@eventiva/workflows.discord-changelog'
import { BuildContext, BuildTask, BuiltTaskResult, ComponentResult, TaskHandler } from '@teambit/builder'
import { EnvContext } from '@teambit/envs'

type ChangelogResult = {
    moduleName: string
    latestTag?: string
    releaseDate?: string
    changes: {
        [ changeType: string ]: ChangeField[]
    }
}

type ChangeField = {
    name: string
    value: string
}

type GenerateChangelogOptions = {
    name: string
}

export class GenerateChangelogTask
    implements BuildTask {
    readonly name = 'GenerateChangelogTask'

    constructor (
        readonly aspectId: string = 'eventiva.workflows/generate-changelog'
    ) {
    }

    static from ( options?: GenerateChangelogOptions ): TaskHandler {
        const name = options?.name || 'GenerateChangelogTask'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handler = ( context: EnvContext ) => {
            return new GenerateChangelogTask()
        }
        return {
            name,
            handler
        }
    }

    async execute ( context: BuildContext ): Promise<BuiltTaskResult> {
        // Prepare the component results array which will be used to report back the components processed
        // as well as any additional data regarding this build task execution
        const componentsResults: ComponentResult[] = []

        context.components.forEach( ( component ) => {
            const errors: Error[] = []
            const metadata: {
                [ key: string ]: any;
                changelogResult?: ChangelogResult
            } = {}
            try {
                component.getLogs().then( ( logs ) => {
                    let tagCount = 0
                    metadata.changelogResult = logs.reverse().reduce( (
                        agg,
                        curr,
                        _index,
                        array
                    ) => {
                        const returnableAgg = agg
                        if ( curr.tag ) {
                            if ( tagCount === 1 ) {
                                array.splice( 1 )
                                return returnableAgg
                            } // this will terminate the iteration
                            // set the current tag for use in the changelog
                            returnableAgg.latestTag = curr.tag
                            const date = new Date( parseInt( curr.date!, 10 ) ?? Date.now() )
                            const [ releaseDate ] = date.toISOString().split( 'T' )
                            returnableAgg.releaseDate = releaseDate
                            tagCount += 1
                        }

                        const commitType = curr.message.split( ':' )[ 0 ]

                        // todo refactor to make this configurable - string join maybe?!
                        if ( /(fix:|feat:|build:|maint:|chore:|ci:|docs:|style:|refactor:|pref:|test:|remove:|revert:|deprecate:)/.test(
                            `${ commitType }:` ) ) {

                            const [ title, message ] = curr.message.split( '\n' )

                            // Create a changeField object
                            const change = {
                                name: `- ${ title } - ${ curr.username }`,
                                value: message
                            } as ChangeField

                            // If the changes object does not have a field of commitType, create one
                            if ( !returnableAgg.changes ) {
                                returnableAgg.changes = {}
                            }
                            if ( !returnableAgg.changes[ commitType ] ) {
                                returnableAgg.changes[ commitType ] = []
                            }
                            // Add the changeField object to the changes under the commitType field
                            returnableAgg.changes[ commitType ].push( change )
                        }
                        return agg
                    }, {
                        moduleName: component.displayName,
                        changes: {}
                    } as ChangelogResult )

                    sendToDiscord( metadata.changelogResult! ) // TODO figure out how to use metadata instead
                } )
            } catch ( err: any ) {
                errors.push( err )
            }
            componentsResults.push( { component, metadata, errors } )
        } )

        return {
            componentsResults
        }
    }
}
