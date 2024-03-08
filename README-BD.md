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

### roles\_x\_usuario **(EP)**

- rxu_id **(PK)**
- usuario_id **(FK)**
- rol_id **(FK)**

### permisos\_x\_roles **(EP)**

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

### productos\_x\_usuarios (ED|EP)

- pxu_id **(PK)**
- producto_id **(FK)**
- usuario_id **(FK)**

### Ventas (ED)
- venta_id **(PK)**
- usuario_id **(FK)**
- fecha
- monto

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
