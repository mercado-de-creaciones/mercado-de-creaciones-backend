import {
  serial,
  varchar,
  boolean,
  pgTable,
} from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  active: boolean("active").default(true),
});
