// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const tablePrefix = "user-platform";
export const createTable = pgTableCreator((name) => `${tablePrefix}_${name}`);

export const posts = createTable(
  "posts",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    content: varchar("name", { length: 280 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    update_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (post) => [index(`${tablePrefix}-posts-user_id-idx`).on(post.user_id)],
);

export const postsSelectSchema = createSelectSchema(posts);
export const postsInsertSchema = createInsertSchema(posts);
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
