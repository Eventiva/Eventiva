import { pgTable, text } from 'drizzle-orm/pg-core';

const contactSkeleton = pgTable('contact', { id: text('id') });

const someTable = pgTable('some_table', {
    id: text('id').primaryKey(),
    createdBy: text('created_by').references(() => contactSkeleton.id),
});

console.log(someTable.createdBy);
