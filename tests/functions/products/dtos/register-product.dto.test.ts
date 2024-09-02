import { RegisterProductDto } from "../../../../netlify/functions/product/dtos/register-product.dto";
import { registerProductMocks } from "../../../_mocks_/products/dtoMocks";
import { emptyObject } from "../../../_mocks_/sharedMocks";


describe('Probar RegisterProductDto', () => {
        test('Debe crear una instancia de RegisterProductDto cuando todos los campos son válidos', () => {
            const mockData = registerProductMocks.validMockDataWOptionalFields;

            const [error, productDto] = RegisterProductDto.create(mockData);

            expect(error).toBeUndefined();
            expect(productDto).toBeInstanceOf(RegisterProductDto);
            expect(productDto!.name).toBe(mockData.name);
            expect(productDto!.price).toBe(mockData.price);
            expect(productDto!.stock).toBe(mockData.stock);
            expect(productDto!.size).toBe(mockData.size);
            expect(productDto!.status).toBe(mockData.status);
            expect(productDto!.categoryId).toBe(mockData.categoryId);
            expect(productDto!.description).toBe(mockData.description);
            expect(productDto!.img).toBe(mockData.img);

        });


        test('Debe crear una instancia de RegisterProductDto cuando todos los campos son válidos, sin los campos opcionales', () => {
            const mockData = registerProductMocks.validMockData;;
            const [error, productDto] = RegisterProductDto.create(mockData);

            expect(error).toBeUndefined();
            expect(productDto).toBeInstanceOf(RegisterProductDto);
            expect(productDto!.name).toBe(mockData.name);
            expect(productDto!.price).toBe(mockData.price);
            expect(productDto!.stock).toBe(mockData.stock);
            expect(productDto!.size).toBe(mockData.size);
            expect(productDto!.status).toBe(mockData.status);
            expect(productDto!.categoryId).toBe(mockData.categoryId);
            expect(productDto!.description).toBeUndefined();
            expect(productDto!.img).toBeUndefined();

        });


        test('Debe retornar los mensajes errores cuando falta algún dato obligatorio', () => {
            const mockData = emptyObject;

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors!.length).toEqual(6);
            expect(productDto).toBeUndefined();
        });


        test('Debe retornar un mensaje de error cuando el estatus o el tamaño no coinciden con los enums', () => {
            const mockData = registerProductMocks.invalidSizeMockData;

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors).toContain('Invalid size');
            expect(productDto).toBeUndefined();
        });


        test('Debe retornar un mensaje de error cuando el precio o el stock no son positivos', () => {
            const mockData = registerProductMocks.invalicPriceMockData;

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors).toContain('Price must be positive');
            expect(productDto).toBeUndefined();
        });
        
});
