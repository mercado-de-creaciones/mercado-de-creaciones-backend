# Mercado de creaciones Backend - Serverless Functions

Backend de proyecto de mercado de creaciones que estará construido con **Serverless Functions** usando el servicio de _Netlify_.

Además, este backend usará una base de datos _SQL_ que se usará en las **Serverless Functions** de _Netlify_, así creando una _API_ para cada caso de uso.

___

#### **Ejemplo estructura _Netlify Function_ con _NodeJS_:**

![Esquema de Netlify Function](https://www.netlify.com/v3/img/products/functions-manage.webp)
___

## Tecnologías a utilizar:
#### **NodeJS** 
![Tecnologias](https://skillicons.dev/icons?i=nodejs)
#### **Typescript**
![Tecnologias](https://skillicons.dev/icons?i=typescript)
#### **MySQL**
![Tecnologias](https://skillicons.dev/icons?i=mysql)
#### **Docker**
![Tecnologias](https://skillicons.dev/icons?i=docker)
#### **Netlify Functions**
![Tecnologias](https://skillicons.dev/icons?i=netlify)
#### **Planetscale**
![Tecnologias](https://skillicons.dev/icons?i=planetscale)
#### **Jest**
![Tecnologias](https://skillicons.dev/icons?i=jest)
#### **Git**
![Tecnologias](https://skillicons.dev/icons?i=git)
#### **Github**
![Tecnologias](https://skillicons.dev/icons?i=github)

## Referencias hosting o proveedores para producción:
- **Netlify Function:** [Netlify Function](https://www.netlify.com/platform/core/functions/)
- **Planet Scale:** [Planetscale](https://planetscale.com/)

---

## Diagrama de arquitectura limpia
Esta app see desarrollará bajo una arquitectura limpia incompleta, ya que no usaremos los _Datasources_, el patrón _Repository_ y lo adaptaremos según la estructura dada de las _Serverless Function_ de Netlify. Sin embargo, se usarán buenas prácticas de _Clean code_ y principios _SOLID_ que permitirá la mantenibilidad y escalabilidad de la aplicación.

![arquitectura-limpia](https://www.redalyc.org/journal/3442/344268257016/344268257016_gf4.png)


## Estructura de carpetas y archivos:

| Carpeta                          | Descripción | Formato para nombrar archivo | 
| -------------------------------- | ----------- | ------------------- |
| `/netlify/functions/modulo`      | Contiene toda el código y estructura de una serverless function de netlify |  N/A |
| `/modulo/config`                 | Contiene archivos de configuración global para nuestra app(adaptadores, utilidades, variables de entorn, etc)  | N/A  |
| `/modulo/config/adapter`         | Contiene adaptadores que son piezas de código de librerías externas que adapta funcionalidades para que sean flexibles al cambio | `nombre-modulo.adapter.ts` |
| `/modulo/config/utils`           | Contiene funciones que realizan tareas comunes y que pueden ser reutilizadas(por ejemplo, formatear fechas, montos, calculos, etc)  | `nombre-descriptivo.ts` |
| `/modulo/data/mysql/index.ts`    | Contiene la configuración de prisma que es el ORM que usaremos para conectarnos a una BD de MySQL  | `nombre-descriptivo.ts` |
| `/modulo/dtos`                   | Contiene los _"dtos"_ de nuestra app que se usan para validar los datos recibidos en peticiones _POST_ y _PUT_ comunmente | `/nombre-modulo/nombre-dto.dto.ts` |
| `/modulo/services`               | Contiene los servicios independientes que son los que se conectan a algo externo(nube, base de datos, storage, servicios de emails, etc) | `nombre-descritivo.service.ts` |
| `/modulo/middlewares`            | Contiene los middlewares que son funciones que se ejecutaran antes de que se haga una petición HTTP | `nombre-descritivo.middleware.ts` |
| `/tests`                         | Aquí se definiran los archivos de prueba |  **_Dentro debe seguir la estructura de carpetas de `/netlify` y los archivos se definen así:_** `archivo.test.ts` |
---
