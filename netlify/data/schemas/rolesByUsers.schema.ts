import { integer, pgTable, serial } from "drizzle-orm/pg-core";

import { rolesTable } from "./roles.schema";
import { usersTable } from "./user.schema";

export const rolesByUsersTable = pgTable("roles_x_users", {
  id: serial("id").primaryKey(),
  roleId: integer("roleId").references(() => rolesTable.id, { onDelete: "set null" }),
  userId: integer("userId").references(() => usersTable.id, { onDelete: "set null" }),
});

export type InsertRoleByUser = typeof rolesByUsersTable.$inferInsert;
export type SelectRoleByUser = typeof rolesByUsersTable.$inferSelect;
