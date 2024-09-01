import { HandlerResponse } from "@netlify/functions";
import {AllProducts} from "../../../../netlify/functions/product/use-cases/all-products"
import { HEADERS } from "../../../../netlify/config/utils/constants";
import { ProductService } from "../../../../netlify/services";
import {expect, jest, test} from '@jest/globals';
import { describe, beforeEach } from "node:test";
import { ProductDto } from "../../../../netlify/functions/product/dtos";
import { mockProducts } from "../../../_mocks_/db/productsTable";
import { FindAllOptionsDto } from "../../../../netlify/functions/product/dtos/findAll-options.dto";



jest.mock("../../../../netlify/services");

describe('Probar AllProducts', () => {

    let allProducts: AllProducts;

    beforeEach(() => {
        jest.clearAllMocks();
        allProducts = new AllProducts();

    });

    test('Debería retornar 204 si no hay productos', async () => {
        let mockCountProducts = jest.fn() as jest.MockedFunction<() => Promise<number>>;

        ProductService.prototype.count = mockCountProducts;

        mockCountProducts.mockReturnValue(Promise.resolve(0));

        allProducts = new AllProducts();

        const response: HandlerResponse = await allProducts.execute({});

        expect(response).toEqual({
            statusCode: 204,
            headers: HEADERS.json,
        });

        expect(ProductService.prototype.count).toHaveBeenCalled();

    });


    test('Debería retornar 200 y los productos', async () => {
        let mockCountProducts = jest.fn() as jest.MockedFunction<() => Promise<number>>;
        let mockGetProducts = jest.fn() as jest.MockedFunction<(options: FindAllOptionsDto) => Promise<ProductDto[]>>;

        ProductService.prototype.count = mockCountProducts;
        ProductService.prototype.findAll = mockGetProducts;
        
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

        
        expect(ProductService.prototype.count).toHaveBeenCalled();

    });
});
