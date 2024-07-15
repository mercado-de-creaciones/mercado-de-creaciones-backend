import { HandlerResponse } from "@netlify/functions";
import {AllProducts} from "../../../../netlify/functions/product/use-cases/all-products"
import { mockDB } from "../../../_mocks_/db/mockDB";
import { HEADERS } from "../../../../netlify/config/utils/constants";
describe('Probar AllProducts', () => {

    let allProducts: AllProducts;

    beforeEach(() => {
        allProducts = new AllProducts();
    });

    test('Debe retornar 204 si no hay productos', async () => {
        mockDB.select.mockResolvedValueOnce([{ count: 0 }]);
        console.log("Mock configurado:", mockDB.select.mock.calls);

        const result: HandlerResponse = await allProducts.execute({});
        console.log("Resultado de execute:", result);

        expect(result.statusCode).toBe(204);
        expect(result.headers).toEqual(HEADERS.json);
    });

    it('should return products with pagination', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        mockDB.select
            .mockResolvedValueOnce([{ count: 20 }]) 
            .mockResolvedValueOnce(mockProducts); 

        const result: HandlerResponse = await allProducts.execute({ page: 1, size: 10 });

        expect(result.statusCode).toBe(200);
        expect(result.headers).toEqual(HEADERS.json);
        expect(JSON.parse(result.body!)).toEqual({
            response: {
                page: 1,
                size: 10,
                products: mockProducts,
                hasPrev: false,
                hasNext: true,
            }
        });
    });
});
