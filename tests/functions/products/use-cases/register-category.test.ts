import { HandlerResponse } from "@netlify/functions";
import {RegisterCategory} from "../../../../netlify/functions/product/use-cases/register-category"
import { CategoryService,  } from "../../../../netlify/services";
import {expect, jest, test} from '@jest/globals';
import { describe, beforeEach } from "node:test";
import { RegisterCategoryDto } from "../../../../netlify/functions/product/dtos";
import { QueryResult } from "@neondatabase/serverless";
import { registerCategoryMocks } from "../../../_mocks_/products/dtoMocks";



jest.mock("../../../../netlify/services");

describe('Probar RegisterCategory', () => {

    let registerCategory: RegisterCategory = new RegisterCategory();

    beforeEach(() => {
        jest.clearAllMocks();
        
    });

    test('Debería retornar 201 y registrar la categoría', async () => {
        let mockInsertCategory = jest.fn() as jest.MockedFunction<(category: RegisterCategoryDto) => Promise<QueryResult<never>>>;
        registerCategory = new RegisterCategory();
        CategoryService.prototype.insert = mockInsertCategory;
                
        let {name, active} = registerCategoryMocks.validMockData;
        let [,dto] = RegisterCategoryDto.create({name, active});

        const response: HandlerResponse = await registerCategory.execute(dto!);
        
        expect(response.statusCode).toEqual(201);

    });

    test('Debería retornar 500', async () => {
        registerCategory = new RegisterCategory();
        jest.spyOn(CategoryService.prototype, 'insert').mockImplementation(() => {
            throw new Error('Internal server Error');
        });

        let {name, active} = registerCategoryMocks.validMockData;
        let [,dto] = RegisterCategoryDto.create({name, active});

        const response: HandlerResponse = await registerCategory.execute(dto!);
        
        expect(response.statusCode).toEqual(500);

    });
});
