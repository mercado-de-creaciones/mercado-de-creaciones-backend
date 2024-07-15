import { RegisterCategoryDto } from "../../../../netlify/functions/product/dtos/register-category.dto";
import { registerCategoryMocks } from "../../../_mocks_/products/dtoMocks";
import { emptyObject } from "../../../_mocks_/sharedMocks";

describe('Probar RegisterCategoryDto', () => {
        test('Debe crear una instancia de RegisterCategoryDto cuando todos los campos son válidos', () => {
            const mockData = registerCategoryMocks.validMockData;

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toBeUndefined();
            expect(categoryDto).toBeInstanceOf(RegisterCategoryDto);
            expect(categoryDto!.name).toBe(mockData.name);
            expect(categoryDto!.active).toBe(mockData.active);
            expect(categoryDto!.products).toEqual([]);
        });

        test('Debe retornar un mensaje de error cuando falta el nombre', () => {
            const mockData = emptyObject;

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toEqual('Missing name');
            expect(categoryDto).toBeUndefined();
        });

        test('Debe crear una instancia de RegisterCategoryDto inactiva cuando active = false', () => {
            const mockData = registerCategoryMocks.validMockDataInactive;

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toBeUndefined();
            expect(categoryDto).toBeInstanceOf(RegisterCategoryDto);
            expect(categoryDto!.name).toBe(mockData.name);
            expect(categoryDto!.active).toBe(mockData.active);
            expect(categoryDto!.products).toEqual([]);
        });

});
