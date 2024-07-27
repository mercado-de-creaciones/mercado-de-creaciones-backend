import { ProductDto } from "../../../netlify/functions/product/dtos";

export const mockProducts = [
    new ProductDto(
        1,
        "Chamarra urbana",
        "1.82",
        "2",
        "M",
        "PUBLISHED",
        1,
        new Date("2024-06-09T16:15:57.687Z"),
        null,
        "Prenda para el frío.",
        "imagen.com"
    ),
    new ProductDto(
        2,
        "Playera deportiva",
        "3.50",
        "5",
        "L",
        "PUBLISHED",
        2,
        new Date("2024-07-01T12:00:00.000Z"),
        null,
        "Prenda para hacer ejercicio.",
        "imagen2.com"
    ),
    new ProductDto(
        3,
        "Sudadera",
        "2.82",
        "2",
        "M",
        "PUBLISHED",
        1,
        new Date("2024-06-09T16:15:57.687Z"),
        null,
        "Prenda para el frío.",
        "imagen.com"
    ),
    new ProductDto(
        4,
        "Playera deportiva",
        "3.50",
        "5",
        "L",
        "PUBLISHED",
        2,
        new Date("2024-07-01T12:00:00.000Z"),
        null,
        "Prenda para hacer ejercicio.",
        "imagen2.com"
    )
];
