import { BcriptAdapter } from "../../config/adapters";
import { roleNamesEnum, sizesEnum, statusEnum } from "../schemas";

export const seedData = {
  countries: [
    {
      id: 1,
      name: "Argentina",
      domain: "ar",
    },
    {
      id: 2,
      name: "Brasil",
      domain: "br",
    },
    {
      id: 3,
      name: "Chile",
      domain: "cl",
    },
    {
      id: 4,
      name: "Colombia",
      domain: "co",
    },
    {
      id: 5,
      name: "Ecuador",
      domain: "ec",
    },
    {
      id: 6,
      name: "México",
      domain: "mx",
    },
    {
      id: 7,
      name: "Perú",
      domain: "pe",
    },
    {
      id: 8,
      name: "Uruguay",
      domain: "uy",
    },
  ],
  users: [
    {
      id: 1,
      name: "Moises",
      lastName: "Prado",
      username: "Admoises",
      emailValidated: true,
      email: "moisesfriki15@gmail.com",
      password: BcriptAdapter.hash("admin123"),
      phone: "123-456-7890",
      address: "123 Main St",
      zipCode: "12345",
      city: "Anytown",
      img: "https://www.xtrafondos.com/wallpapers/programacion-computadora-y-lentes-10837.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      countryId: 3,
    },
    {
      id: 2,
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      emailValidated: true,
      email: "johndoe@example.com",
      password: BcriptAdapter.hash("password123"),
      phone: "123-456-7890",
      address: "123 Main St",
      zipCode: "12345",
      city: "Anytown",
      img: "https://dewey.edu/wp-content/uploads/2020/08/cbanner..jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      countryId: 1,
    },
    {
      id: 3,
      name: "Jane",
      lastName: "Smith",
      username: "janesmith",
      emailValidated: false,
      email: "janesmith@example.com",
      password: BcriptAdapter.hash("password456"),
      phone: "987-654-3210",
      address: "456 Elm St",
      zipCode: "67890",
      city: "Othertown",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuh5aLOcYBw7thTH8kOnIiUkleFvv-rgHe0g&s",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      countryId: 2,
    },
    {
      id: 4,
      name: "Alice",
      lastName: "Johnson",
      username: "alicejohnson",
      emailValidated: true,
      email: "alicejohnson@example.com",
      password: BcriptAdapter.hash("password789"),
      phone: "555-555-5555",
      address: "789 Oak St",
      zipCode: "11223",
      city: "Sometown",
      img: "https://assets.bitdegree.org/online-learning-platforms/storage/media/2018/08/what-is-a-web-developer.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      countryId: 3,
    },
  ],
  categories: [
    {
      id: 1,
      name: "Accesorios",
      description: "Accesorios de mascotas como collares, correas, etc.",
      active: true,
    },
    {
      id: 2,
      name: "Ropa",
      description: "Ropa para mascotas como camisetas, suéteres, etc.",
      active: true,
    },
    {
      id: 3,
      name: "Comida",
      description: "Comida para mascotas como croquetas, latas, etc.",
      active: true,
    },
    {
      id: 4,
      name: "Juguetes",
      description: "Juguetes para mascotas como pelotas, cuerdas, etc.",
      active: true,
    },
    {
      id: 5,
      name: "Cuidado",
      description:
        "Productos de cuidado para mascotas como shampoo, cortauñas, etc.",
      active: true,
    },
    {
      id: 6,
      name: "Otros",
      description: "Otros productos para mascotas.",
      active: false,
    },
  ],
  subcategories: [
    {
      id: 1,
      name: "Collares",
      description: "Collares para perros y gatos.",
      active: true,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Correas",
      description: "Correas para perros.",
      active: true,
      categoryId: 1,
    },
    {
      id: 3,
      name: "Ropa para perros",
      description: "Ropa para perros.",
      active: true,
      categoryId: 2,
    },
    {
      id: 4,
      name: "Ropa para gatos",
      description: "Ropa para gatos.",
      active: true,
      categoryId: 2,
    },
    {
      id: 5,
      name: "Croquetas",
      description: "Croquetas para perros y gatos.",
      active: true,
      categoryId: 3,
    },
    {
      id: 6,
      name: "Latitas",
      description: "Latitas para gatos.",
      active: true,
      categoryId: 3,
    },
    {
      id: 7,
      name: "Pelotas",
      description: "Pelotas para perros.",
      active: true,
      categoryId: 4,
    },
    {
      id: 8,
      name: "Cuerdas",
      description: "Cuerdas para perros.",
      active: true,
      categoryId: 4,
    },
    {
      id: 9,
      name: "Shampoo",
      description: "Shampoo para perros y gatos.",
      active: true,
      categoryId: 5,
    },
    {
      id: 10,
      name: "Cortauñas",
      description: "Cortauñas para perros y gatos.",
      active: true,
      categoryId: 5,
    },
    {
      id: 11,
      name: "Otros accesorios",
      description: "Otros accesorios para mascotas.",
      active: false,
      categoryId: 6,
    },
    {
      id: 12,
      name: "Otros productos",
      description: "Otros productos para mascotas.",
      active: false,
      categoryId: 6,
    },
  ],
  products: [
    {
      name: "Collar de cuero",
      description: "Collar de cuero para perros de tamaño mediano.",
      img: "https://www.mauloa.cl/cdn/shop/products/AAA-DU-S-RO-NE-0.jpg?v=1598641917",
      price: 19.99,
      stock: 50,
      size: sizesEnum.enumValues[2],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 1,
    },
    {
      name: "Correa extensible",
      description: "Correa extensible para perros de hasta 20 kg.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSGZXxZrL__79VR30M5bbgu9iq-_KQV7I-1g&s",
      price: 29.99,
      stock: 30,
      size: sizesEnum.enumValues[3],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 2,
    },
    {
      name: "Suéter para perros",
      description: "Suéter de lana para perros pequeños.",
      img: "https://omydog.cl/wp-content/uploads/2024/01/1-4.jpg",
      price: 24.99,
      stock: 20,
      size: sizesEnum.enumValues[1],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 3,
    },
    {
      name: "Camiseta para gatos",
      description: "Camiseta de algodón para gatos.",
      img: "https://img.kwcdn.com/product/1d14c6c1222/1b0a94d7-c013-48cd-80dc-67eaf7794234_1600x1600.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
      price: 14.99,
      stock: 40,
      size: sizesEnum.enumValues[2],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 4,
    },
    {
      name: "Croquetas premium",
      description: "Croquetas premium para perros adultos.",
      img: "https://laikapp.s3.amazonaws.com/dev_images_products/7d8001a6ae610a63db5823800c4080cd_1720186878.jpg",
      price: 49.99,
      stock: 100,
      size: sizesEnum.enumValues[3],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 5,
    },
    {
      name: "Latitas de atún",
      description: "Latitas de atún para gatos.",
      img: "https://www.clubdeperrosygatos.cl/wp-content/uploads/2023/05/t-formula-lata-gato-atun-y-vegetales-600x600.webp",
      price: 9.99,
      stock: 200,
      size: sizesEnum.enumValues[1],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 6,
    },
    {
      name: "Pelota de goma",
      description: "Pelota de goma para perros.",
      img: "https://www.worldpet.cl/wp-content/uploads/2020/06/pelotasgoma.png",
      price: 7.99,
      stock: 150,
      size: sizesEnum.enumValues[2],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 7,
    },
    {
      name: "Cuerda de juguete",
      description: "Cuerda de juguete para perros.",
      img: "https://www.buddypet.cl/wp-content/uploads/2020/12/juguete-pelota-tenis-y-cuerda-2-1.jpg",
      price: 12.99,
      stock: 80,
      size: sizesEnum.enumValues[3],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 8,
    },
    {
      name: "Shampoo para mascotas",
      description: "Shampoo para perros y gatos.",
      img: "https://cdnx.jumpseller.com/pet-bj/image/44491234/resize/810/810?1705387352",
      price: 15.99,
      stock: 60,
      size: sizesEnum.enumValues[2],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 9,
    },
    {
      name: "Cortauñas",
      description: "Cortauñas para perros y gatos.",
      img: "https://rimage.ripley.cl/home.ripley/Attachment/MKP/6079/MPM10000195985/full_image-1.jpg",
      price: 10.99,
      stock: 70,
      size: sizesEnum.enumValues[1],
      status: statusEnum.enumValues[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      subcategoryId: 10,
    },
  ],
  sales: [
    {
      id: 1,
      total: 100,
      createdAt: new Date(),
      userId: 1,
    },
    {
      id: 2,
      total: 200,
      createdAt: new Date(),
      userId: 2,
    },
    {
      id: 3,
      total: 150,
      createdAt: new Date(),
      userId: 3,
    },
  ],
  itemsBySale: [
    {
      quantity: 2,
      price: 50,
      saleId: 1,
      productId: 1,
    },
    {
      quantity: 1,
      price: 100,
      saleId: 2,
      productId: 2,
    },
    {
      quantity: 3,
      price: 50,
      saleId: 3,
      productId: 3,
    },
    {
      quantity: 1,
      price: 50,
      saleId: 1,
      productId: 2,
    },
    {
      quantity: 2,
      price: 100,
      saleId: 2,
      productId: 3,
    },
    {
      quantity: 1,
      price: 150,
      saleId: 3,
      productId: 1,
    },
  ],
  roles: [
    {
      id: 1,
      name: roleNamesEnum.enumValues[0],
      description: "Administrador con acceso completo a todos los recursos.",
    },
    {
      id: 2,
      name: roleNamesEnum.enumValues[1],
      description:
        "Usuario regular con acceso para navegar y comprar productos.",
    },
    {
      id: 3,
      name: roleNamesEnum.enumValues[2],
      description:
        "Vendedor con acceso para gestionar sus propios productos y ventas.",
    },
  ],
  permissions: [
    {
      id: 1,
      name: "VIEW_PRODUCTS",
      description: "Permiso para ver productos.",
    },
    {
      id: 2,
      name: "ADD_PRODUCTS",
      description: "Permiso para agregar nuevos productos.",
    },
    {
      id: 3,
      name: "EDIT_PRODUCTS",
      description: "Permiso para editar productos existentes.",
    },
    {
      id: 4,
      name: "DELETE_PRODUCTS",
      description: "Permiso para eliminar productos.",
    },
    {
      id: 5,
      name: "VIEW_SALES",
      description: "Permiso para ver datos de ventas.",
    },
    {
      id: 6,
      name: "MANAGE_USERS",
      description: "Permiso para gestionar cuentas de usuarios.",
    },
    {
      id: 7,
      name: "VIEW_ORDERS",
      description: "Permiso para ver pedidos.",
    },
    {
      id: 8,
      name: "PROCESS_ORDERS",
      description: "Permiso para procesar pedidos.",
    },
  ],
  permissionsByRoles: [
    // Permisos para ADMIN_ROLE
    { permissionId: 1, roleId: 1 }, // VER_PRODUCTOS
    { permissionId: 2, roleId: 1 }, // AGREGAR_PRODUCTOS
    { permissionId: 3, roleId: 1 }, // EDITAR_PRODUCTOS
    { permissionId: 4, roleId: 1 }, // ELIMINAR_PRODUCTOS
    { permissionId: 5, roleId: 1 }, // VER_VENTAS
    { permissionId: 6, roleId: 1 }, // GESTIONAR_USUARIOS
    { permissionId: 7, roleId: 1 }, // VER_PEDIDOS
    { permissionId: 8, roleId: 1 }, // PROCESAR_PEDIDOS

    // Permisos para USER_ROLE
    { permissionId: 1, roleId: 2 }, // VER_PRODUCTOS
    { permissionId: 7, roleId: 2 }, // VER_PEDIDOS

    // Permisos para VENDOR_ROLE
    { permissionId: 1, roleId: 3 }, // VER_PRODUCTOS
    { permissionId: 2, roleId: 3 }, // AGREGAR_PRODUCTOS
    { permissionId: 3, roleId: 3 }, // EDITAR_PRODUCTOS
    { permissionId: 4, roleId: 3 }, // ELIMINAR_PRODUCTOS
    { permissionId: 5, roleId: 3 }, // VER_VENTAS
    { permissionId: 7, roleId: 3 }, // VER_PEDIDOS
    { permissionId: 8, roleId: 3 }, // PROCESAR_PEDIDOS
  ],
  rolesByUsers: [
    {
      roleId: 1, // ADMIN_ROLE
      userId: 1, // Moises prado
    },
    {
      roleId: 2, // USER_ROLE
      userId: 2, // Jane Smith
    },
    {
      roleId: 3, // VENDOR_ROLE
      userId: 3, // Alice Johnson
    },
    {
      roleId: 2, // USER_ROLE
      userId: 1, // John Doe
    },
    {
      roleId: 3, // VENDOR_ROLE
      userId: 2, // Jane Smith
    },
  ],
};