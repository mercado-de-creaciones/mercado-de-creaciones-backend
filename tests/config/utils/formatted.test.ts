import { fromBodyToObject } from '../../../netlify/config/utils/formatted';

describe("Probar formatted.ts", () => {
  test("Debe convertir la query string del body de la serverless function a un objeto", () => {
    const name = "Moises";
    const age = "24";

    const mockQueryString = `name=${name}&age=${age}`;

    const expectedObject = { name, age };

    const result = fromBodyToObject(mockQueryString);

    expect(result).toEqual(expectedObject);
  });

  test("Debe manejar la query string del body de la serverless function cuando venga vacia", () => {
    const mockQueryString = "";
    const expectedObject = {};
    
    const result = fromBodyToObject(mockQueryString);

    expect(result).toEqual(expectedObject);
  });

  test("Debe manejar la query string del body de la serverless function cuando contenga caracteres especiales", () => {
    const mockQueryString = "name=John%20Doe&city=New%20York";

    const expectedObject = { name: "John Doe", city: "New York" };

    const result = fromBodyToObject(mockQueryString);

    expect(result).toEqual(expectedObject);
  });
});