import { Handler, HandlerEvent } from "@netlify/functions";
import { HEADERS, fromBodyToObject } from "../../config/utils";
import { RecentProducts } from "./use-cases/recent-products";

const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path, } = event;
  const body = event.body ? fromBodyToObject(event.body) : {};
  const token = path.split("/").pop();


if (httpMethod === "GET" && path.includes("/recent-products")) {


  return new RecentProducts()
    .execute()
    .then((res) => res)
    .catch((error) => error);
}
}

export { handler };