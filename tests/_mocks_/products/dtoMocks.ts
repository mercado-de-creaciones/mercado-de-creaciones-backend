export const registerCategoryMocks = {
    validMockData: {
        name: 'Category Name',
        active: true,
    },

    validMockDataInactive: {
        name: 'Category Name',
        active: false,
    }
}


export const registerProductMocks = {
    validMockDataWOptionalFields: {
        name: "Chamarra",
        price: "1.82",
        stock: "2",
        size: "M",
        status: "PUBLISHED",
        categoryId: 1,
        description: "Prenda para el frío.",
        img: "imagen.com",
    },

    validMockData: {
        name: "Chamarra",
        price: "1.82",
        stock: "2",
        size: "M",
        status: "PUBLISHED",
        categoryId: 1,
    },

    invalidSizeMockData: {
        name: "Chamarra",
        price: "1.82",
        stock: "2",
        size: "LL",
        status: "PUBLISHED",
        categoryId: 1,
    },

    invalicPriceMockData: {
        name: "Chamarra",
        price: "0",
        stock: "2",
        size: "L",
        status: "PUBLISHED",
        categoryId: 1,
    },

    



}

export const productPaginationMocks = {
    validMockData: {
        page: 1,
        size: 10,
        products: [
            registerProductMocks.validMockData
        ],
        hasPrev: false,
        hasNext: false
    },

    invalidPageMockData: {
        page: 0,
        size: 10,
        products: [
            registerProductMocks.validMockData
        ],
        hasPrev: false,
        hasNext: false
    },

    invalidSizeMockData: {
        page: 1,
        products: [
            registerProductMocks.validMockData
        ],
        hasPrev: false,
        hasNext: false
    }
    
}


