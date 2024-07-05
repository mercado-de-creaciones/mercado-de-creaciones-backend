import { Handler, HandlerEvent } from "@netlify/functions";
import { HEADERS } from "../../config/utils";
import { RecentProducts, RecentProductsByCategory, RegisterCategory, RegisterProduct } from "./use-cases";
import { RegisterProductDto } from "./dtos/register-product.dto";
import { RegisterCategoryDto } from "./dtos/register-category.dto";

const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path, } = event;
  const body = event.body ? JSON.parse(event.body) : {};


  if (httpMethod === "GET" && path.includes("/recent-products")) {
    console.log("recent");
    

    return new RecentProducts()
      .execute()
      .then((res) => res)
      .catch((error) => error);
  }

  if (httpMethod === "GET" && path.includes("/last-product-by-category")) {

    return new RecentProductsByCategory()
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