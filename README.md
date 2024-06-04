# Mercado de creaciones Backend - Serverless Functions

Backend de proyecto de mercado de creaciones que estará construido con **Serverless Functions** usando el servicio de _Netlify_.

Además, este backend usará una base de datos _SQL_ de _Neon Serverless_ que se usará en las **Serverless Functions** de _Netlify_, así creando una _API_ para cada caso de uso.

___

#### **Ejemplo estructura _Netlify Function_ con _NodeJS_:**

![Esquema de Netlify Function](https://www.netlify.com/v3/img/products/functions-manage.webp)
___

## Tecnologías a utilizar:
#### **NodeJS** 
![Tecnologias](https://skillicons.dev/icons?i=nodejs)
#### **Typescript**
![Tecnologias](https://skillicons.dev/icons?i=typescript)
#### **Docker**
![Tecnologias](https://skillicons.dev/icons?i=docker)
#### **Netlify Functions**
![Tecnologias](https://skillicons.dev/icons?i=netlify)
#### **Neon Serverless PostgreSQL**
![Tecnologias](https://skillicons.dev/icons?i=postgres)
#### **Jest**
![Tecnologias](https://skillicons.dev/icons?i=jest)
#### **Git**
![Tecnologias](https://skillicons.dev/icons?i=git)
#### **Github**
![Tecnologias](https://skillicons.dev/icons?i=github)

## Referencias hosting o proveedores para producción:
- **Netlify Function:** [Netlify Function](https://www.netlify.com/platform/core/functions/)
- **Planet Scale:** [Neon Serverless](https://neon.tech/)

---

## Diagrama de arquitectura limpia
Esta app see desarrollará bajo una arquitectura limpia incompleta, ya que no usaremos los _Datasources_, el patrón _Repository_ y lo adaptaremos según la estructura dada de las _Serverless Function_ de Netlify. Sin embargo, se usarán buenas prácticas de _Clean code_ y principios _SOLID_ que permitirá la mantenibilidad y escalabilidad de la aplicación.

![arquitectura-limpia](https://www.redalyc.org/journal/3442/344268257016/344268257016_gf4.png)


## Estructura de carpetas y archivos:

| Carpeta                               | Descripción | Formato para nombrar archivo | 
| ------------------------------------  | ----------- | ---------------------------- |
| `/netlify/functions/modulo`           | Contiene toda el código y estructura de una serverless function en especifico de netlify |  N/A |
| `/netlify/functions/modulo/dtos`      | Contiene los _"dtos"_ de nuestra serverless function que se usan para validar los datos recibidos en peticiones _POST_ y _PUT_ comunmente | `nombre-dto.dto.ts` |
| `/netlify/functions/modulo/use-cases` | Contiene los casos de uso de nuestra serverless function que serían las funcionalidades de un determinado módulo (por ejemplo el CRUD de productos) | `nombre-dto.dto.ts` |
| `/netlify/services`                   | Contiene los servicios globales que son los que se conectan a algo externo(storage, servicios de emails, etc). Estos se pueden usar en varias Serverless Functions | `nombre-descritivo.service.ts` |
| `/netlify/config`                     | Contiene archivos de configuración global para nuestra app(adaptadores, utilidades, variables de entorn, etc)  | N/A  |
| `/netlify/config/adapter`             | Contiene adaptadores que son piezas de código de librerías externas que adapta funcionalidades para que sean flexibles al cambio | `nombre-modulo.adapter.ts` |
| `/netlify/config/utils`               | Contiene funciones que realizan tareas comunes y que pueden ser reutilizadas(por ejemplo, formatear fechas, montos, calculos, etc)  | `nombre-descriptivo.ts` |
| `/netlify/middlewares`                | Contiene los middlewares que son funciones que se ejecutaran antes de que se haga una petición HTTP | `nombre-descritivo.middleware.ts` |
| `/netlify/data/db.ts`                 | Contiene la configuración de Drizzle que es el ORM que usaremos para conectarnos a una BD de PostgreSQL con Neon Serverless  | N/A |
| `/netlify/data/schemas/`              | Contiene los esquemas o tablas de nuestra base de datos postgreSQL que se migraran a Neon Serverless  | `nombre-tabla.schema.ts` |
| `/netlify/interfaces/`                | Interfaces globales o de un contexto en especifico de nuestra app  | `nombre.interface.ts` |
| `/tests`                              | Aquí se definiran los archivos de prueba |  **_Dentro debe seguir la estructura de carpetas de `/netlify` y los archivos se definen así:_** `archivo.test.ts` |
---
