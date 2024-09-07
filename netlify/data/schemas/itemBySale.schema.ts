import { integer, pgTable, serial } from "drizzle-orm/pg-core";

import { salesTable } from "./sales.schema";

export const itemBySaleTable = pgTable("item_x_sale", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  saleId: integer("saleId").references(() => salesTable.id, { onDelete: "set null" }),
  productId: integer("productId").references(() => salesTable.id, { onDelete: "set null" }),
});

export type InsertItemBySale = typeof itemBySaleTable.$inferInsert;
export type SelectItemBySale = typeof itemBySaleTable.$inferSelect;