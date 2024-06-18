import { Handler, HandlerEvent } from "@netlify/functions";
import { HEADERS, fromBodyToObject } from "../../config/utils";
import { RecentProducts } from "./use-cases/recent-products";
import { RegisterProduct } from "./use-cases/register-product";
import { RegisterProductDto } from "./dtos/product.dto";
import { parse } from "path";
import { RegisterCategoryDto } from "./dtos/category.dto";
import { RegisterCategory } from "./use-cases/register-category";

const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path, } = event;
  const body = event.body ? JSON.parse(event.body) : {};
  const token = path.split("/").pop();


  if (httpMethod === "GET" && path.includes("/recent-products")) {


    return new RecentProducts()
      .execute()
      .then((res) => res)
      .catch((error) => error);
  }

  if (httpMethod === "POST" && path.includes("/register-product")) {    
  

  const [error, registerProductDto] = RegisterProductDto.create(body);


    if (error)
      return {
        statusCode: 400,
        body: JSON.stringify( {
          message: error
        }),
        headers: HEADERS.json
      }

    return new RegisterProduct()
      .execute(registerProductDto!)
      .then((res) => res)
      .catch((error) => error);
  }

  if (httpMethod === "POST" && path.includes("/register-category")) {
  

  const [error, registerCategoryDto] = RegisterCategoryDto.create(body);


    if (error)
      return {
        statusCode: 400,
        body: JSON.stringify( {
          message: error
        }),
        headers: HEADERS.json
      }

    return new RegisterCategory()
      .execute(registerCategoryDto!)
      .then((res) => res)
      .catch((error) => error);
  }
}

export { handler };