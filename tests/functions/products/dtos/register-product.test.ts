import { RegisterProductDto } from "../../../../netlify/functions/product/dtos/register-product.dto";

describe('Probar RegisterProductDto', () => {
        test('Debe crear una instancia de RegisterProductDto cuando todos los campos son válidos', () => {
            const mockData = {
                name: "Chamarra",
                price: "1.82",
                stock: "2",
                size: "M",
                status: "PUBLISHED",
                categoryId: 1,
                description: "Prenda para el frío.",
                img: "imagen.com",
            };

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
            const mockData = {
                name: "Chamarra",
                price: "1.82",
                stock: "2",
                size: "M",
                status: "PUBLISHED",
                categoryId: 1,
            };

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
            const mockData = {
            };

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors!.length).toEqual(6);
            expect(productDto).toBeUndefined();
        });


        test('Debe retornar un mensaje de error cuando el estatus o el tamaño no coinciden con los enums', () => {
            const mockData = {
                name: "Chamarra",
                price: "1.82",
                stock: "2",
                size: "LL",
                status: "PUBLISHED",
                categoryId: 1,
            };

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors).toContain('Invalid size');
            expect(productDto).toBeUndefined();
        });


        test('Debe retornar un mensaje de error cuando el precio o el stock no son positivos', () => {
            const mockData = {
                name: "Chamarra",
                price: "0",
                stock: "2",
                size: "L",
                status: "PUBLISHED",
                categoryId: 1,
            };

            const [errors, productDto] = RegisterProductDto.create(mockData);

            expect(errors).toContain('Price must be positive');
            expect(productDto).toBeUndefined();
        });
        
});
