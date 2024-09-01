# Mercado De Creaciones BD

## Listado de Entidades

### paises (EC)

- pais_id **(PK)**
- nombre
- dominio

### roles (EC)

- roles_id **(PK)**
- nombres
- descripcion

### permisos **(EC)**

- permiso_id **(PK)**
- nombre
- descripcion

### usuarios (ED)

- usuario_id **(PK)**
- nombre
- username
- password
- emailValidated (boolean)
- apellidos
- telefono **(UQ)**
- email **(UQ)**
- dirección
- cp
- ciudad
- pais_id **(FK)**
- avatar
- fecha_creacion
- fecha_actualizacion
- activo

### roles_x_usuario **(EP)**

- rxu_id **(PK)**
- usuario_id **(FK)**
- rol_id **(FK)**

### permisos_x_roles **(EP)**

- pxr_id **(PK)**
- rol_id **(FK)**
- permiso_id **(FK)**

### categorias (EC)

- categoria_id **(PK)**
- nombre
- activo
- subcategoria **(FK)**

### productos (ED)

- producto_id **(PK)**
- nombre
- descripcion
- foto
- precio
- cantidad
- pais_id **(FK)**
- categoria_id **(FK)**

### productos_x_usuarios (ED|EP)

- pxu_id **(PK)**
- producto_id **(FK)**
- usuario_id **(FK)**

### Ventas (ED)

- venta_id **(PK)**
- usuario_id **(FK)**
- fecha
- total

### articulo_x_venta (ED|EP)

- articulo_id **(PK)**
- venta_id **(FK)**
- producto_id **(FK)**
- cantidad

## Relaciones

1. Un **usuario** tiene **país** (1 - M).
2. Un **usuario** genera **venta** (1 - M).
3. Una **venta** tiene **artículo** (1 - M).
4. Un **artículo** es un **producto** (1 - 1).
5. Los **roles** tienen **permiso** (M - M).
6. Los **usuario** tienen **roles**(M - M).
7. Una **categoria** tiene **productos**(1 - M).
8. Una **categoria** tiene **subcategorias**(1 - M).

## Modelo Relacional de la BD

![Imagen modelo](/models/mercado-de-creaciones-modelo.png)

## Reglas de Negocio


### paises

- Crear un pais.
- Actualizar un pais.


### roles

- Crear un rol.
- Leer todos los roles.
- Leer un rol en particular.
- Actualizar un rol.
- Eliminar un rol.


### permisos

- Crear un permiso.
- Leer todos los permisos.
- Leer un permiso en particular.
- Actualizar un permiso.
- Eliminar un permiso.


### usuarios

- Crear un usuario.
- Leer todos los usuarios.
- Leer un usuario en particular.
- Actualizar un usuario.
- Validar un usuario.
- Habilitar un usuario.
- Inhabilitar un usuario.
- Actualizar datos de un usuario.
- Actualizar password de un usuario.
- Eliminar un usuario.


### roles_x_usuario

- Crear un rol por usuario.
- Leer todos los roles por usuario.
- Leer un rol por usuario en particular.
- Leer todos los roles por usuario de un usuario.
- Eliminar un rol por usuario.


### permisos_x_roles

- Crear un permiso por rol.
- Leer todos los permisos por roles.
- Leer un un permiso por rol en particular.
- Leer todos los permisos por roles de un rol.
- Eliminar un pxr.


### categorias

- Crear una categoría.
- Leer todas las categorías.
- Leer una categoría en particular.
- Actualizar una categoría.
- Eliminar una categoría.


### productos

- Crear un producto.
- Leer todos los productos.
- Leer un producto en particular.
- Actualizar un producto.
- Eliminar un producto.
- Cada que haya una venta restar a la cantidad de productos disponibles, el número de artículos que se vendieron.


### productos_x_usuarios
- Crear un producto por usuario.
- Leer todos los productos por usuario.
- Leer un producto por usuario en particular.
- Leer todos los productos por usuario de un usuario.
- Eliminar un producto por usuario.

### ventas
- Crear una venta.
- Leer todas las ventas.
- Leer una venta en particular.
- Leer todas las ventas de un usuario.
- Leer todas las ventas de un producto.
- Actualizar una venta.
- Eliminar una venta.


### articulo_x_venta

- Crear un artículo.
- Leer todos los artículos.
- Leer un artículo en particular.
- Leer todos los artículos de una venta.
- Leer todos los artículos de un producto.
- Leer todos los artículos de un usuario.
- Actualizar un artículo.
- Eliminar un artículo.

