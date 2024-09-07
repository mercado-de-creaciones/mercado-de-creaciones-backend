import { integer, pgTable, serial } from "drizzle-orm/pg-core";

import { permissionsTable } from "./permissions.schema";
import { rolesTable } from "./roles.schema";

export const permissionsByRolesTable = pgTable("permissions_x_roles", {
  id: serial("id").primaryKey(),
  permissionId: integer("permissionId").references(() => permissionsTable.id, { onDelete: "set null"}),
  roleId: integer("roleId").references(() => rolesTable.id, { onDelete: "set null" }),
});

export type InsertPermissionByRole = typeof permissionsByRolesTable.$inferInsert;
export type SelectPermissionByRole = typeof permissionsByRolesTable.$inferSelect;