import { Column, ColumnBaseConfig, ColumnDataType } from "drizzle-orm";

export class FindAllOptionsDto {
    public constructor(
        public size?: number, 
        public offset?: number, 
        public value?: any,
        public field?: Column<ColumnBaseConfig<ColumnDataType, string>>,
    ) { }

}