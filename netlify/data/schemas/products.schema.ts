import { serial, varchar, pgTable, pgEnum, timestamp, integer } from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories.schema";


export const sizesEnum = pgEnum("size", ["XS","S", "M", "L", "XL","XXL"]);
export const statusEnum = pgEnum("status", ["PUBLISHED", "INACTIVE"]);

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  img: varchar("img"),
  price: varchar("price").notNull(),
  stock: varchar("stock").notNull(),
  size: varchar("size").notNull(),
  status: varchar("status").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt"),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => categoriesTable.id, { onDelete: "set null" }),
});

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

