import { RegisterCategoryDto } from "../../../../netlify/functions/product/dtos/register-category.dto";
import { ProductDto } from "../../../../netlify/functions/product/dtos/db-product.dto";

describe('Probar RegisterCategoryDto', () => {
        test('Debe crear una instancia de RegisterCategoryDto cuando todos los campos son válidos', () => {
            const mockData = {
                name: 'Category Name',
                active: true,
            };

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toBeUndefined();
            expect(categoryDto).toBeInstanceOf(RegisterCategoryDto);
            expect(categoryDto!.name).toBe(mockData.name);
            expect(categoryDto!.active).toBe(mockData.active);
            expect(categoryDto!.products).toEqual([]);
        });

        test('Debe retornar un mensaje de error cuando falta el nombre', () => {
            const mockData = {
            };

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toEqual('Missing name');
            expect(categoryDto).toBeUndefined();
        });

        test('Debe crear una instancia de RegisterCategoryDto inactiva cuando active = false', () => {
            const mockData = {
                name: 'Category Name',
                active: false,
            };

            const [error, categoryDto] = RegisterCategoryDto.create(mockData);

            expect(error).toBeUndefined();
            expect(categoryDto).toBeInstanceOf(RegisterCategoryDto);
            expect(categoryDto!.name).toBe(mockData.name);
            expect(categoryDto!.active).toBe(mockData.active);
            expect(categoryDto!.products).toEqual([]);
        });

});
