
import { db } from '../data/db';
import { countriesTable, InsertUser, SelectUser, usersTable } from '../data/schemas';

import { Column, ColumnBaseConfig, ColumnDataType, eq } from "drizzle-orm";


export class UserService {
  async findOne(
    field: Column<ColumnBaseConfig<ColumnDataType, string>>,
    value: unknown,
    fieldsToShow?: Record<string, any>
  ): Promise<InsertUser | undefined> {
    const oneRecordByFilter = await db
      .select(fieldsToShow!)
      .from(usersTable)
      .where(eq(field, value));

    return oneRecordByFilter.at(0) as InsertUser;
  }

  async innerJoinCountry(
    fieldsToShow?: Record<string, any>
  ): Promise<Partial<SelectUser | undefined>> {
    const oneRecordByFilter = await db
      .select(fieldsToShow!)
      .from(usersTable)
      .innerJoin(countriesTable, eq(usersTable.id, countriesTable.id));

    return oneRecordByFilter.at(0) as Partial<SelectUser | undefined>;
  }

  async insert(newUser: InsertUser) {
    const addedUser = db.insert(usersTable).values(newUser);

    return addedUser;
  }

  async update(
    values: Partial<InsertUser>,
    field: Column<ColumnBaseConfig<ColumnDataType, string>>,
    value: unknown
  ) {
    const updatedUser = db
      .update(usersTable)
      .set(values)
      .where(eq(field, value));

    return updatedUser;
  }
}