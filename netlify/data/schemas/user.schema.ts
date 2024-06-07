import {
  serial,
  varchar,
  boolean,
  pgTable,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";


export const rolesEnum = pgEnum("roles", ["ADMIN_ROLE", "USER_ROLE"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  emailValidated: boolean("emailValidated").default(false),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  img: varchar("img"),
  role: rolesEnum("role").default("USER_ROLE"),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;






