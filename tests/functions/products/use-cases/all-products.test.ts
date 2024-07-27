import { HandlerResponse } from "@netlify/functions";
import {AllProducts} from "../../../../netlify/functions/product/use-cases/all-products"
import { HEADERS } from "../../../../netlify/config/utils/constants";
import { ProductRepository } from "../../../../netlify/services";
import {expect, jest, test} from '@jest/globals';
import { describe, beforeEach } from "node:test";



jest.mock("../../../../netlify/services");

describe('Probar AllProducts', () => {

    let allProducts: AllProducts;

    beforeEach(() => {
        jest.clearAllMocks();
        allProducts = new AllProducts();

    });

    test('Debe retornar 204 si no hay productos', async () => {
        let mockCountProducts = jest.fn() as jest.MockedFunction<() => Promise<number>>;

        ProductRepository.prototype.countProducts = mockCountProducts;

        mockCountProducts.mockReturnValue(Promise.resolve(0));
        
        allProducts = new AllProducts();

        const response: HandlerResponse = await allProducts.execute({});

        expect(response).toEqual({
            statusCode: 204,
            headers: HEADERS.json,
        });

        expect(ProductRepository.prototype.countProducts).toHaveBeenCalled();

    });
});
