import { CategoryDto } from "../../../netlify/functions/product/dtos/db-category.dto";

export const mockCategories = [
    new CategoryDto(
        1, 
        "Casual",
        [],
        true
    ),
    new CategoryDto(
        2, 
        "Elegante",
        [],
        true
    ),

];
