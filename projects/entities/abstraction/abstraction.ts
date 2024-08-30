/*
 * Project: Eventiva
 * File: abstraction.ts
 * Last Modified: 30/08/2024, 12:25
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

import { PgColumnBuilderBase, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
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

    static generateId<
        TTableName extends string,
    > ( name: TTableName ) {
        if ( !name ) {
            throw new Error( 'Table name cannot be blank' )
        }
        return typeid<TTableName>( name )
    }

    static ZodSharedColumns<TTableName extends string> ( table: TTableName ) {
        return {
            id: z.string().superRefine(
                this.testTypeID( table )
            ).transform( arg => TypeID.fromString<TTableName>( arg ) ).describe(
                'TypeID - A type-safe, K-sortable, globally'
                + ' unique identifier' ),
            createdAt: z.date().or( z.string().date().transform( ( arg ) => new Date( arg ) ) ),
            updatedAt: z.date().or( z.string().date().transform( ( arg ) => new Date( arg ) ) ),
            deletedAt: z.date().or( z.string().date().transform( ( arg ) => new Date( arg ) ) ).nullable()
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
        return createInsertSchema( baseTable, this.ZodSharedColumns( table ) )
    }

    static createTable<
        TTableName extends string,
        TColumnsKey extends string,
        TColumnsMap extends Record<TColumnsKey, PgColumnBuilderBase>
    > (
        name: TTableName,
        columns: TColumnsMap
    ) {
        // Check that the table names can generate safe TypeID objects. Throws on invalid table names
        Base.generateId( name )

        const defaultColumns = {
            ...columns,
            id: text( 'id' ).primaryKey().$defaultFn( () => typeid( name ).toString() ),
            createdAt: timestamp( 'created_at' ).defaultNow().notNull(),
            updatedAt: timestamp( 'updated_at' ).defaultNow().$onUpdate( () => new Date() ).notNull(),
            deletedAt: timestamp( 'deleted_at' )
        }

        // create the table with the default values
        return pgTable(
            name,
            defaultColumns
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

export type InsertBase = typeof baseTable.$inferInsert;
export type PlainBase = typeof baseTable.$inferSelect;
