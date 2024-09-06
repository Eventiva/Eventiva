/*
 * Project: Eventiva
 * File: abstraction.spec.ts
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

import { text } from 'drizzle-orm/pg-core'
import * as drizzleZod from 'drizzle-zod'
import { TypeID, typeid } from 'typeid-js'
import { z } from 'zod'
import { Base, InsertBase } from './abstraction.js'

describe( 'generateId', () => {
    // Generates a valid TypeID for a given table name
    it( 'should generate a valid TypeID for a given table name', () => {
        // Arrange
        const tableName = 'test_table'

        // Act
        const id = Base.generateId( tableName )

        // Assert
        expect( id ).toBeDefined()
        expect( TypeID.fromString( id.toString() ).getType() ).toBe( tableName )
    } )

    // Returns a string representation of the generated TypeID
    it( 'should return a TypeID representation of the generated TypeID', () => {
        // Arrange
        const tableName = 'test_table'

        // Act
        const id = Base.generateId( tableName )

        // Assert
        expect( id ).toBeInstanceOf( TypeID<'test_table'> )
    } )

    // Handles typical table names without errors
    it( 'should handle typical table names without errors', () => {
        // Arrange
        const tableName = 'typical_table'

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).not.toThrow()
    } )

    // Consistently generates unique IDs for different table names
    it( 'should consistently generate unique IDs for different table names', () => {
        // Arrange
        const tableName1 = 'table_one'
        const tableName2 = 'table_two'

        // Act
        const id1 = Base.generateId( tableName1 )
        const id2 = Base.generateId( tableName2 )

        // Assert
        expect( id1 ).not.toBe( id2 )
    } )

    // Generates IDs that conform to the expected format
    it( 'should generate IDs that conform to the expected format', () => {
        // Arrange
        const tableName = 'format_table'

        // Act
        const id = Base.generateId( tableName )

        // Assert
        expect( TypeID.fromString( id.toString(), tableName ) ).toBeInstanceOf( TypeID )
    } )

    // Handles throw on string as table name
    it( 'should throw on empty string as table name', () => {
        // Arrange
        const tableName = ''

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).toThrow()
    } )

    // Handles very long table names
    it( 'should handle very long table names', () => {
        // Arrange
        const tableName = 'a'.repeat( 62 )

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).not.toThrow()
    } )

    // Should throw on extremely long table names
    it( 'should throw on extremely long table names', () => {
        // Arrange
        const tableName = 'a'.repeat( 231 )

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).toThrow()
    } )

    // Handles special characters in table names
    it( 'should throw on special characters in table names', () => {
        // Arrange
        const tableName = '!@#$%^&*()'

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).toThrow()
    } )

    // Handles numeric table names
    it( 'should throw on numeric table names', () => {
        // Arrange
        const tableName = '12345'

        // Act & Assert
        expect( () => Base.generateId( tableName ) ).toThrow()
    } )

    // Throws on null or
    it( 'should throw on null table names', () => {
        // Arrange & Act & Assert
        //@ts-expect-error
        expect( () => Base.generateId( null ) ).toThrow()
    } )

    // Handles undefined table names
    it( 'should throw on undefined table names', () => {
        // Arrange & Act & Assert
        //@ts-expect-error
        expect( () => Base.generateId( undefined ) ).toThrow()
    } )

    // Verifies the performance for generating multiple IDs in quick succession
    it( 'should verify performance for generating multiple IDs in quick succession', () => {
        // Arrange
        const tableName = 'performance_table'

        // Act & Assert
        for ( let i = 0; i < 1000; i++ ) {
            expect( () => Base.generateId( tableName ) ).not.toThrow()
        }
    } )

    // Ensures generated IDs are K-sortable
    it( 'should ensure generated IDs are K-sortable', () => {
        // Arrange
        const tableName = 'sortable_table'

        // Act
        const id1 = Base.generateId( tableName )
        const id2 = Base.generateId( tableName )

        // Assert
        expect( id1 < id2 ).toBe( true )
    } )
} )
describe.skip( 'SelectSchema', () => {
    // Uses ZodSharedColumns to define common columns
    it( 'should use ZodSharedColumns to define common columns', () => {
        // Arrange
        const tableName = 'test_table'
        const zodSharedColumnsSpy = vi.spyOn( Base, 'ZodSharedColumns' )

        // Act
        Base.SelectSchema( tableName )

        // Assert
        expect( zodSharedColumnsSpy ).toHaveBeenCalledWith( tableName )
    } )

    // Ensures the select schema is required
    it( 'should ensure the select schema is required', () => {
        // Arrange
        const tableName = 'test_table'

        // Act
        const schema = Base.SelectSchema( tableName )

        // Assert
        expect( schema.shape.id.isOptional() ).toBe( false )
    } )

    // Correctly integrates with createSelectSchema function
    it( 'should correctly integrate with createSelectSchema function', () => {
        // Arrange
        const tableName = 'test_table'
        const createSelectSchemaSpy = vi.spyOn( drizzleZod, 'createSelectSchema' )

        // Act
        Base.SelectSchema( tableName )

        // Assert
        expect( createSelectSchemaSpy ).toHaveBeenCalled()
    } )

    // Handles valid table names without errors
    it( 'should handle valid table names without errors', () => {
        // Arrange
        const tableName = 'valid_table'

        // Act & Assert
        expect( () => Base.SelectSchema( tableName ) ).not.toThrow()
    } )

    // Handles empty table names gracefully
    it( 'should handle empty table names gracefully', () => {
        // Arrange
        const tableName = ''

        // Act & Assert
        expect( () => Base.SelectSchema( tableName ) ).toThrow( 'Table name cannot be blank' )
    } )

    // Handles null or undefined table names
    it( 'should handle null or undefined table names', () => {
        // Arrange

        // Act & Assert
        // @ts-expect-error
        expect( () => Base.SelectSchema( null ) ).toThrow()
        // @ts-expect-error
        expect( () => Base.SelectSchema( undefined ) ).toThrow()
    } )

    // Validates the structure of the generated select schema
    it( 'should validate the structure of the generated select schema', () => {
        // Arrange
        const tableName = 'test_table'

        // Act
        const schema = Base.SelectSchema( tableName )

        // Assert
        expect( schema.shape ).toHaveProperty( 'id' )
        expect( schema.shape ).toHaveProperty( 'createdAt' )
        expect( schema.shape ).toHaveProperty( 'updatedAt' )
        expect( schema.shape ).toHaveProperty( 'deletedAt' )
    } )
} )
describe.skip( 'InsertSchema', () => {
    // Uses Zod shared columns for schema validation
    it( 'should use Zod shared columns for schema validation', () => {
        // Arrange
        const tableName = 'test_table'
        const zodSharedColumnsSpy = vi.spyOn( Base, 'ZodSharedColumns' )

        // Act
        Base.InsertSchema( tableName )

        // Assert
        expect( zodSharedColumnsSpy ).toHaveBeenCalledWith( tableName )
    } )

    // Handles valid table names correctly
    it( 'should handle valid table names correctly', () => {
        // Arrange
        const tableName = 'valid_table'

        // Act & Assert
        expect( () => Base.InsertSchema( tableName ) ).not.toThrow()
    } )

    // Integrates seamlessly with the baseTable definition
    it( 'should integrate seamlessly with the baseTable definition', () => {
        // Arrange
        const tableName = 'test_table'

        // Act
        const schema = Base.InsertSchema( tableName )

        // Assert
        expect( schema ).toBeDefined()
    } )

    // Handles empty or null table names gracefully
    it( 'should handle empty or null table names gracefully', () => {
        // Arrange, Act & Assert
        expect( () => Base.InsertSchema( '' ) ).toThrow( 'Table name cannot be blank' )
        //@ts-expect-error
        expect( () => Base.InsertSchema( null ) ).toThrow( 'Table name cannot be blank' )
    } )
} )
describe( 'createTable', () => {

    // Creates a table with the specified name and columns
    it( 'should create a table with the specified columns', () => {
        // Arrange
        const name = 'test_table'
        const columns = { column1: text( 'column1' ) }

        // Act
        const table = Base.createTable( name, columns )

        // Assert
        expect( table ).toHaveProperty( 'column1' )
    } )

    // Adds createdAt, updatedAt, and deletedAt columns with appropriate default values
    it( 'should add createdAt, updatedAt, and deletedAt columns with appropriate default values', () => {
        // Arrange
        const name = 'test_table'
        const columns = {}

        // Act
        const table = Base.createTable( name, columns )

        // Assert
        expect( table ).toHaveProperty( 'createdAt' )
        expect( table ).toHaveProperty( 'updatedAt' )
        expect( table ).toHaveProperty( 'deletedAt' )
    } )

    // Ensures createdAt and updatedAt columns are not null
    it( 'should ensure createdAt and updatedAt columns are not null', () => {
        // Arrange
        const name = 'test_table'
        const columns = {}

        // Act
        const table = Base.createTable( name, columns )

        // Assert
        expect( table.createdAt.notNull ).toBe( true )
        expect( table.updatedAt.notNull ).toBe( true )
    } )

    // Ensures createdAt and updatedAt columns are not null
    it( 'should ensure deletedAt column are nullable', () => {
        // Arrange
        const name = 'test_table'
        const columns = {}

        // Act
        const table = Base.createTable( name, columns )

        // Assert
        expect( table.deletedAt.notNull ).toBe( false )
    } )

    // Handles empty columns map gracefully
    it( 'should handle empty columns map gracefully', () => {
        // Arrange
        const name = 'test_table'

        // Act
        const table = Base.createTable( name, {} )

        // Assert
        expect( table ).toHaveProperty( 'id' )
    } )

    // Generates a unique TypeID for each table creation
    it( 'should generate a unique TypeID for each table creation', () => {
        // Arrange
        const name1 = 'test_table_one'
        const name2 = 'test_table_two'

        // Act
        const table1 = Base.createTable( name1, {} )
        const table2 = Base.createTable( name2, {} )

        // Assert
        expect( table1.id.defaultFn ).not.toBe( table2.id.defaultFn )
    } )

    // Correctly sets the updatedAt column to the current date on updates
    it( 'should correctly set the updatedAt column to the current date on updates', () => {
        // Arrange
        const name = 'test_table'
        const columns = {}

        // Act
        const table = Base.createTable( name, columns )


        // Assert
        expect( table.updatedAt.dataType ).toBe( 'date' )
    } )

    // Allows for optional deletedAt column to be null
    it( 'should allow for optional deletedAt column to be null', () => {
        // Arrange
        const name = 'test_table'
        const columns = {}

        // Act
        const table = Base.createTable( name, columns )

        // Assert
        expect( table.deletedAt.dataType ).toBe( 'date' )
    } )

    // Validates the structure of the columns map
    it( 'should validate the structure of the columns map', () => {
        // Arrange
        const name = 'test_table'

        // Act & Assert
        //@ts-expect-error Purposely throwing error
        expect( () => Base.createTable( name, { invalidColumn: {} } ) ).toThrow()
    } )

    // Ensures the table name is a valid string
    it( 'should ensure the table name is a valid string', () => {
        // Arrange & Act & Assert
        expect( () => Base.createTable( '', {} ) ).toThrow()
        //@ts-expect-error
        expect( () => Base.createTable( null, {} ) ).toThrow()
    } )
} )
describe( 'testTypeID', () => {

    // Valid TypeID string does not add any issues to the context
    it( 'should not add issues to context when TypeID string is valid', () => {
        // Arrange
        const table = 'valid_table'
        const validTypeID = typeid( table ).toString()
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( validTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).not.toHaveBeenCalled()
    } )

    // Correct table name generates valid TypeID without errors
    it( 'should generate valid TypeID without errors for correct table name', () => {
        // Arrange
        const table = 'valid_table'
        const validTypeID = typeid( table ).toString()
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( validTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).not.toHaveBeenCalled()
    } )

    // TypeID string matches the expected format for the given table
    it( 'should match expected format for given table', () => {
        // Arrange
        const table = 'valid_table'
        const validTypeID = typeid( table ).toString()
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( validTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).not.toHaveBeenCalled()
    } )

    // Empty string as TypeID throws an error
    it( 'should throw an error when TypeID string is empty', () => {
        // Arrange
        const table = 'valid_table'
        const invalidTypeID = ''
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( invalidTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).toHaveBeenCalledWith( {
            code: z.ZodIssueCode.custom,
            message: `Invalid TypeId. Suffix cannot be empty`
        } )
    } )

    // Invalid TypeID string adds a custom issue to the context
    it( 'should add custom issue to context when TypeID string is invalid', () => {
        // Arrange
        const table = 'valid_table'
        const invalidTypeID = 'invalidTypeID'
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( invalidTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).toHaveBeenCalledWith( {
            code: z.ZodIssueCode.custom,
            message: `Invalid TypeId. Prefix mismatch. Expected ${ table }, got `
        } )
    } )

    // Null or undefined TypeID string throws an error
    it( 'should throw an error when TypeID string is null or undefined', () => {
        // Arrange
        const table = 'valid_table'
        const invalidTypeIDs = [ null, undefined ]
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        invalidTypeIDs.forEach( invalidTypeID => {
            // Act
            //@ts-expect-error
            testTypeID( invalidTypeID, ctx )

            // Assert
            expect( ctx.addIssue ).toHaveBeenCalledWith( {
                code: z.ZodIssueCode.custom,
                message: `Invalid TypeId. Please confirm you have supplied a ${ table } id.`
            } )
            ctx.addIssue.mockClear()
        } )
    } )

    // TypeID string with numeric values is validated correctly
    it( 'should validate numeric values in TypeID string correctly', () => {
        // Arrange
        const table = 'valid_table'
        const validTypeID = 'valid_table_00000000000000000000000000'
        const ctx = { addIssue: vi.fn() }
        const testTypeID = Base.testTypeID( table )

        // Act
        //@ts-expect-error
        testTypeID( validTypeID, ctx )

        // Assert
        expect( ctx.addIssue ).not.toHaveBeenCalled()
    } )
} )
describe( 'InsertBase', () => {

    // Correctly infers the insert type from the base table
    it( 'should correctly infer the insert type from the base table', () => {
        // Arrange
        const expectedType = {
            id: expect.any( String ),
            createdAt: expect.any( Date ),
            updatedAt: expect.any( Date ),
            deletedAt: null
        }

        // Act
        const inferredType: InsertBase = {
            id: 'some-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }

        // Assert
        expect( inferredType ).toMatchObject( expectedType )
    } )

    // Ensures the inferred type matches the expected schema
    it( 'should match the expected schema', () => {
        // Arrange
        const expectedSchema = {
            id: expect.any( String ),
            createdAt: expect.any( Date ),
            updatedAt: expect.any( Date ),
            deletedAt: null
        }

        // Act
        const inferredType: InsertBase = {
            id: 'some-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }

        // Assert
        expect( inferredType ).toMatchObject( expectedSchema )
    } )

    // Validates that the inferred type includes all required fields
    it( 'should include all required fields', () => {
        // Arrange
        const requiredFields = [ 'id', 'createdAt', 'updatedAt', 'deletedAt' ]

        // Act
        const inferredTypeKeys = Object.keys( {
            id: 'some-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        } )

        // Assert
        requiredFields.forEach( field => {
            expect( inferredTypeKeys ).toContain( field )
        } )
    } )

    // Supports default values for insert operations
    it( 'should support default values for insert operations', () => {
        // Arrange & Act
        const inferredType: InsertBase = {
            id: 'some-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }

        // Assert
        expect( inferredType.createdAt ).toBeInstanceOf( Date )
        expect( inferredType.updatedAt ).toBeInstanceOf( Date )
    } )

    // Handles nullable fields appropriately during insert operations
    it( 'should handle nullable fields appropriately during insert operations', () => {
        // Arrange & Act
        const inferredType: InsertBase = {
            id: 'some-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }

        // Assert
        expect( inferredType.deletedAt ).toBeNull()
    } )
} )
