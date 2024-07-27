import { db } from "../../data/db";
import { productsTable } from "../../data/schemas/products.schema";
import { count } from 'drizzle-orm';

export class ProductRepository {

    public async countProducts() {
        try {
            const result = (await db.select({ count: count() }).from(productsTable));
            return result[0].count;
        } catch (error) {
            console.error('Error al contar productos de la db:', error);
            throw new Error('Ocurrió un error al contar productoscon la db');
        }
    }

    public async getProducts(size: number, offset: number){
        try{
            const result = await db
            .select()
            .from(productsTable)
            .limit(size)
            .offset(offset);
        } catch (error) {
            console.error('Error al recuperar productos de la db: ', error);
            throw new Error('Ocurrió un error al contar productoscon la db');
        }
    }
    
}

