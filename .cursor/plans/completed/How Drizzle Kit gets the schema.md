How Drizzle Kit gets the schema
CLI (glob): Config has schema: "./src/schema/**/*.ts". Kit loads those files (e.g. via import), and the schema it uses is the exported object: { brand: brandTable, tag: tagTable, ... } where each value is a PgTable.
So the real input to the generator is that single object whose values are table instances, not “files” per se. The glob only decides which modules to load to build that object.
So if we build that same shape at runtime (an object of PgTable instances), we can feed it straight into the API that the CLI uses under the hood.
Programmatic API (no glob)
From discussion #4373 and related issues, the flow is:
generateDrizzleJson(schema, prevId?, dialect?, casing?) – first argument is the schema object: Record<string, PgTable> (plus relations if you use them). Same shape as import * as schema from '@/db/schema'.
generateMigration(prevJson, curJson) – returns an array of SQL statements to go from prevJson to curJson.
So “where the glob files would have normally been passed” is literally: that schema object as the first argument to generateDrizzleJson. No files needed if we construct the object ourselves.
Your approach: column definitions → runtime schema → generate
Your abstraction already separates “column definitions” from “table”: e.g. createTable(name, (db) => ({ ... }), ...) or pgTable(name, (db) => columns(database)). So conceptually you have:
Column set = the object returned by (db) => ({ id: ..., name: ..., ... }) — the second argument to pgTable.
Table = pgTable(tableName, columns).
So the plan fits Drizzle like this:
Export column definitions (not full tables)
Extensions export something that looks like the “columns” part of a table:
Either a function (db: AllBuilders) => Record<string, PgColumnBuilderBase> (like your (db) => ({ name: db.text('name').notNull(), ... })),
Or a plain object of column builders (if you don’t need db for custom types).
Register at runtime
Same as you said: a registry or a list where each extension registers, e.g.:
registerTable('contact', contactBaseColumns)
registerTable('contact', contactSocialColumns) (additive for the same table name).
Compose into full table definitions
For each logical table (e.g. contact):
Gather all registered column sets for that table (e.g. base + contact-social).
Merge with your standard columns (id, created_at, etc.) exactly like in abstraction.ts:
pgTable(tableName, { ...standardColumns, ...baseColumns, ...extensionColumns }).
You get a single PgTable per table name.
Build the schema object
const schema = { contact: contactTable, other: otherTable, ... }
Same shape as the object that the glob-loaded files would have exported.
Pass that into the generate command
prevJson = generateDrizzleJson({}) (or from your stored snapshot if you persist it).
curJson = generateDrizzleJson(schema, prevJson.id, undefined, 'snake_case').
statements = await generateMigration(prevJson, curJson).
Execute each statement (e.g. with your DB client or Drizzle’s db.execute(statement)).
So yes: you do “pass the found definitions exactly where the glob files would have normally been passed” — you just build the schema object yourself and pass it to generateDrizzleJson instead of loading it from disk.
Does that allow “dynamic tables at runtime”?
Yes, in the sense you mean:
Tables are defined at runtime from registered column definitions.
Generation (SQL diff) is done by Drizzle’s own logic via generateDrizzleJson + generateMigration.
You run that SQL at runtime (e.g. on startup, or in tests like in the discussion).
So you get “dynamic” in the sense: no static schema files required; schema is whatever you compose from registered column definitions when the process runs. The only caveat: drizzle-kit/api has had ESM/import quirks (see e.g. #2853); the discussion uses createRequire for a workaround. So you may need a small loader shim depending on your environment.
Relations / FKs
Same schema object can include relations: many codebases export both schema and relations and pass schema to the DB client. For migration generation, generateDrizzleJson cares about tables (and their columns, FKs, indexes). So:
If relations are expressed as foreign keys on the table definitions (e.g. brandId: typeid('brand_id', ...).references(() => brand.id)), they’re already inside the PgTable and are included when you build the table with your merged columns. No extra step.
If you add relations via Drizzle’s relations() only (no FK columns), then the migration generator doesn’t create FKs from that; you’d need FKs on the table defs. So for “dynamic tables at runtime” with FKs, keep defining FKs in the column definitions (or in the merged column set) when you call pgTable, and the generated SQL will include them.
Summary
Drizzle Kit’s generator effectively takes a single schema object (table name → PgTable). The glob is just one way to produce that object.
You can instead: export column definitions → register them at runtime → compose full tables with your abstractions (pgTable + standard columns) → build that same schema object → pass it into generateDrizzleJson / generateMigration and run the returned SQL. That gives you dynamic table generation at runtime using Drizzle’s own logic, without the non-Drizzle custom SQL route.

