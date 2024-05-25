import {
  serial,
  varchar,
  boolean,
  pgTable,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";


export const rolesEnum = pgEnum("roles", ["ADMIN_ROLE", "USER_ROLE"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  emailValidated: boolean("emailValidated").default(false),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  img: varchar("img"),
  role: rolesEnum('roles').default('USER_ROLE'),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
