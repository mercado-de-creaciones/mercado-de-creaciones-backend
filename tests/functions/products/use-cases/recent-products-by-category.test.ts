import { HandlerResponse } from "@netlify/functions";
import {RecentProductsByCategory} from "../../../../netlify/functions/product/use-cases/recent-products-by-category"
import { CategoryService, ProductService } from "../../../../netlify/services";
import {expect, jest, test} from '@jest/globals';
import { describe, beforeEach } from "node:test";
import { ProductDto } from "../../../../netlify/functions/product/dtos";
import { mockProducts } from "../../../_mocks_/db/productsTable";
import { mockCategories } from "../../../_mocks_/db/categoryTable";
import { FindAllOptionsDto } from "../../../../netlify/functions/product/dtos/findAll-options.dto";
import { CategoryDto } from "../../../../netlify/functions/product/dtos/db-category.dto";



jest.mock("../../../../netlify/services");

describe('Probar RecentProductsByCategory', () => {

    let recentProductsByCategory: RecentProductsByCategory;

    beforeEach(() => {
        jest.clearAllMocks();
        recentProductsByCategory = new RecentProductsByCategory();

    });

    test('Debería retornar 200 y el producto más reciente por categoría', async () => {
        let mockGetProducts = jest.fn() as jest.MockedFunction<(options: FindAllOptionsDto) => Promise<ProductDto[]>>;
        let mockGetCategories = jest.fn() as jest.MockedFunction<() => Promise<CategoryDto[]>>;

        ProductService.prototype.findAll = mockGetProducts;
        CategoryService.prototype.findAll = mockGetCategories;
        
        mockGetProducts.mockReturnValue(Promise.resolve(mockProducts));
        mockGetCategories.mockReturnValue(Promise.resolve(mockCategories));
        
        recentProductsByCategory = new RecentProductsByCategory();

        const response: HandlerResponse = await recentProductsByCategory.execute();
        
        expect(response.statusCode).toEqual(200);

        expect(JSON.parse(response.body!).productsByCategory.length).toEqual(
            mockCategories.length
        );

    });
});
