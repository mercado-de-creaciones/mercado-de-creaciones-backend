import { Column, ColumnBaseConfig, ColumnDataType, eq } from "drizzle-orm";

import { db } from "../data/db";
import { countriesTable } from "../data/schemas";

type NewCountry = typeof countriesTable.$inferInsert;

export class CountryService {
  async findOne(
    field: Column<ColumnBaseConfig<ColumnDataType, string>>,
    value: unknown,
    fieldsToShow?: Record<string, any>
  ): Promise<NewCountry> {
    const oneRecordByFilter = await db
      .select(fieldsToShow!)
      .from(countriesTable)
      .where(eq(field, value));

    return oneRecordByFilter.at(0) as NewCountry;
  }
}
