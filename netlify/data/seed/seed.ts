import { config } from "dotenv";
config();

import { db } from "../db";
import {
  categoriesTable,
  countriesTable,
  itemBySaleTable,
  permissionsByRolesTable,
  permissionsTable,
  productsTable,
  roleNamesEnum,
  rolesByUsersTable,
  rolesTable,
  salesTable,
  subcategoriesTable,
  usersTable,
} from "../schemas";
import { seedData } from "./data";

(async () => {
  await main();
})();

async function main() {
  //* Eliminar todas las tablas 
  await db.delete(itemBySaleTable);
  await Promise.all([
    db.delete(rolesByUsersTable),
    db.delete(productsTable),
    db.delete(salesTable),
  ]);
  await Promise.all([
    db.delete(usersTable),
    db.delete(subcategoriesTable),
    db.delete(permissionsByRolesTable),
  ]);
  await Promise.all([
    db.delete(countriesTable),
    db.delete(categoriesTable),
    db.delete(rolesTable),
    db.delete(permissionsTable),
  ]);

  //* Crear todas las tablas
  await Promise.all([
    db.insert(countriesTable).values(seedData.countries),
    db.insert(categoriesTable).values(seedData.categories),
    db.insert(rolesTable).values(seedData.roles),
    db.insert(permissionsTable).values(seedData.permissions),
  ]);

  await Promise.all([
    db.insert(usersTable).values(seedData.users),
    db.insert(subcategoriesTable).values(seedData.subcategories),
    db.insert(permissionsByRolesTable).values(seedData.permissionsByRoles),
  ]);

  await Promise.all([
    db.insert(rolesByUsersTable).values(seedData.rolesByUsers),
    db.insert(productsTable).values(seedData.products),
    db.insert(salesTable).values(seedData.sales),
  ]);

  await db.insert(itemBySaleTable).values(seedData.itemsBySale);

  console.log("SEEDED");
}
