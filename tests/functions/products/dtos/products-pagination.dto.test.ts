import { ProductPaginationDto } from "../../../../netlify/functions/product/dtos/products-pagination.dto";
import { productPaginationMocks } from "../../../_mocks_/products/dtoMocks";
describe('Probar ProductPaginationDto', () => {
        test('Debe crear una instancia de ProductPaginationDto cuando todos los campos son válidos', () => {
            const mockData = productPaginationMocks.validMockData;

            const [error, productPaginationDto] = ProductPaginationDto.create(mockData);

            expect(error).toBeUndefined();
            expect(productPaginationDto).toBeInstanceOf(ProductPaginationDto);
            expect(productPaginationDto!.page).toBe(mockData.page);
            expect(productPaginationDto!.size).toBe(mockData.size);
            expect(productPaginationDto!.products).toBe(mockData.products);
            expect(productPaginationDto!.hasPrev).toBe(mockData.hasPrev);
        });

        test('Debe retornar un mensaje de error cuando la página es nula o menor o igual a cero', () => {
            const mockData = productPaginationMocks.invalidPageMockData;

            const [error, productPaginationDto] = ProductPaginationDto.create(mockData);

            expect(error).toEqual('Invalid page number');
            expect(productPaginationDto).toBeUndefined();
        });


        test('Debe retornar un mensaje de error cuando el tamaño es nulo o menor o igual a cero', () => {
            const mockData = productPaginationMocks.invalidSizeMockData;

            const [error, productPaginationDto] = ProductPaginationDto.create(mockData);

            expect(error).toEqual('Invalid size');
            expect(productPaginationDto).toBeUndefined();
        });

});
