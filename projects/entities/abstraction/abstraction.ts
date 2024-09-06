/*
 * Project: Eventiva
 * File: abstraction.ts
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

// import { pipeline } from '@xenova/transformers'
import { BuildExtraConfigColumns } from 'drizzle-orm'
import { index, PgColumnBuilderBase, pgTable, PgTableExtraConfig, text, timestamp, vector } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { typeid, TypeID } from 'typeid-js'
import { z } from 'zod'

export abstract class Base<
    TableName extends string,
    SelectType extends PlainBase,
    InsertType extends InsertBase,
> {
    protected constructor (
        protected _id: TypeID<TableName>,
        protected _createdAt: PlainBase['createdAt'],
        protected _updatedAt: PlainBase['updatedAt'],
        protected _deletedAt: PlainBase['deletedAt']
    ) {
    }

    public get id () {
        return this._id.toString()
    }

    public get ID () {
        return this._id
    }

    public get createdAt () {
        return this._createdAt
    }

    public get updatedAt () {
        return this._updatedAt
    }

    public get deletedAt () {
        return this._deletedAt
    }

    // static async getEmbedding ( text: string ): Promise<number[]> {
    //     // Initialize the pipeline for feature extraction
    //     const extractor = await pipeline( 'feature-extraction' )
    //
    //     // Replace new lines and create the embedding
    //     const input = text.replace( /\n/g, ' ' )
    //     const embedding = await extractor( input )
    //
    //     console.log( embedding )
    //
    //     // Flatten the tensor and convert to an array (taking the [CLS] token embedding)
    //     const clsEmbedding = embedding.data
    //
    //     // Assuming clsEmbedding is a Float32Array, which you can convert to a number array
    //     return Array.from( clsEmbedding )
    // };

    static generateId<
        TTableName extends string,
    > ( name: TTableName ) {
        if ( !name ) {
            throw new Error( 'Table name cannot be blank' )
        }
        return typeid<TTableName>( name )
    }

    static isValidDate ( date: Date ) {
        return !isNaN( date.getTime() )
    }

    static dateIn () {
        const schema = z.union( [
            z.string().date(),
            z.string().datetime(),
            z.string().datetime( { local: true } )
        ] )

        return schema
            .transform( ( str ) => new Date( str ) )
            .pipe( z.date().refine( this.isValidDate ) )
            .brand( dateInBrand as symbol )
    }

    static dateOut () {
        return z.date()
            .refine( this.isValidDate )
            .transform( ( date ) => date.toISOString() )
            .brand( dateOutBrand as symbol )
    }

    static ZodSharedColumns<TTableName extends string> ( table: TTableName ) {
        return {
            id: z.string().superRefine(
                this.testTypeID( table )
            ).transform( arg => TypeID.fromString<TTableName>( arg ) ).describe(
                'TypeID - A type-safe, K-sortable, globally'
                + ' unique identifier' ),
            createdAt: Base.dateIn(),
            updatedAt: Base.dateIn(),
            deletedAt: Base.dateIn().nullable(),
            embedding: z.array( z.number() ),
            embeddingTerm: z.string()
        }
    }

    static SelectSchema<TTableName extends string> ( table: TTableName ) {
        if ( !table ) {
            throw new Error( 'Table name cannot be blank' )
        }
        return createSelectSchema( baseTable, this.ZodSharedColumns<TTableName>( table ) ).required()
    }

    static InsertSchema<TTableName extends string> ( table: TTableName ) {
        if ( !table ) {
            throw new Error( 'Table name cannot be blank' )
        }
        return createInsertSchema( baseTable, this.ZodSharedColumns<TTableName>( table ) )
    }

    static createTable<
        TTableName extends string,
        TColumnsKey extends string,
        TColumnsMap extends Record<TColumnsKey, PgColumnBuilderBase>
    > (
        name: TTableName,
        columns: TColumnsMap,
        extraConfig?: ( self: BuildExtraConfigColumns<TTableName, TColumnsMap, 'pg'> ) => PgTableExtraConfig
    ) {
        // Check that the table names can generate safe TypeID objects. Throws on invalid table names
        Base.generateId( name )

        const defaultColumns = {
            ...columns,
            id: text( 'id' ).primaryKey().$defaultFn( () => typeid( name ).toString() ),
            createdAt: timestamp( 'created_at' ).defaultNow().notNull(),
            updatedAt: timestamp( 'updated_at' ).defaultNow().$onUpdate( () => new Date() ).notNull(),
            deletedAt: timestamp( 'deleted_at' ),
            embeddingTerm: text( 'embedding_term' ),
            embedding: vector( 'embedding', { dimensions: 3 } )
        }

        // create the table with the default values
        return pgTable(
            name,
            defaultColumns,
            ( table ) => {
                const extra = extraConfig
                    ? extraConfig( table )
                    : {}
                return {
                    ...extra,
                    cosine: index( name + '_cosine_index' ).using( 'hnsw', table.embedding.op( 'vector_cosine_ops' ) ),
                    ip: index( name + '_ip_index' ).using( 'hnsw', table.embedding.op( 'vector_ip_ops' ) ),
                    l2: index( name + '_l2_index' ).using( 'hnsw', table.embedding.op( 'vector_l2_ops' ) ),
                    hamming: index( name + '_hamming_index' ).using( 'hnsw', table.embedding.op( 'bit_hamming_ops' ) )
                }
            }
        )
    }

    static testTypeID ( table?: string ): (
        val: string,
        ctx: z.RefinementCtx
    ) => void {
        return (
            val,
            ctx
        ) => {
            try {
                if ( val == null ) {
                    ctx.addIssue( {
                        code: z.ZodIssueCode.custom,
                        message: `Invalid TypeId. Please confirm you have supplied a ${ table } id.`
                    } )
                }
                TypeID.fromString( val, table )
            } catch ( e: unknown ) {
                ctx.addIssue( {
                    code: z.ZodIssueCode.custom,
                    message: e instanceof Error
                        ? e.message
                        : `Invalid TypeId. Please confirm you have supplied a ${ table } id.`
                } )
            }
        }
    }

    abstract toObject (): SelectType
}

const tableName = 'base'
const baseTable = Base.createTable( tableName, {} )

export const dateInBrand = Symbol( 'DateIn' )
export type DateInSchema = ReturnType<typeof Base.dateIn>
export const dateOutBrand = Symbol( 'DateOut' )
export type DateOutSchema = ReturnType<typeof Base.dateOut>
export type InsertBase = typeof baseTable.$inferInsert;
export type PlainBase = typeof baseTable.$inferSelect;
