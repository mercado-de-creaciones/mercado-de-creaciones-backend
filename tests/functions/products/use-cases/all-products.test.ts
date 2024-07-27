import { HandlerResponse } from "@netlify/functions";
import {AllProducts} from "../../../../netlify/functions/product/use-cases/all-products"
import { HEADERS } from "../../../../netlify/config/utils/constants";
import { ProductRepository } from "../../../../netlify/services";
import {expect, jest, test} from '@jest/globals';
import { describe, beforeEach } from "node:test";
import { ProductDto } from "../../../../netlify/functions/product/dtos";
import { mockProducts } from "../../../_mocks_/db/productsTable";



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


    test('Debe retornar 200 y los productos', async () => {
        let mockCountProducts = jest.fn() as jest.MockedFunction<() => Promise<number>>;
        let mockGetProducts = jest.fn() as jest.MockedFunction<(size: number, offset: number) => Promise<ProductDto[]>>;

        ProductRepository.prototype.countProducts = mockCountProducts;
        ProductRepository.prototype.getProducts = mockGetProducts;
        
        mockCountProducts.mockReturnValue(Promise.resolve(mockProducts.length));
        mockGetProducts.mockReturnValue(Promise.resolve(mockProducts));
        
        allProducts = new AllProducts();

        const response: HandlerResponse = await allProducts.execute({});

        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                productPaginationDto: {
                    page: 1,
                    size: 10,
                    products: mockProducts,
                    hasPrev: false,
                    hasNext: false,
                },
            }),
            headers: HEADERS.json,
        });

        expect(ProductRepository.prototype.countProducts).toHaveBeenCalled();

    });
});
