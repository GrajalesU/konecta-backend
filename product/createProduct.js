import mysql from "../database.js";
import { ADD_IMAGE, ADD_STOCK, CREATE_PRODUCT } from "../utils/product.queries";

export async function handler(event, context, callback) {
  const { id_tenant, name, description, stock, images } = event.body
  context.callbackWaitsForEmptyEventLoop = false;
  let id_product
  await mysql
    .transaction()
    .query(CREATE_PRODUCT(id_tenant), [name, description])
    .query((r) => {
      id_product = r.insertId;
      return [ADD_STOCK(id_tenant), [id_product, stock]]
    })

  images.forEach((image) => {
    mysql.query(ADD_IMAGE(id_tenant), [id_product, image])
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      id_product,
    }),
  });
}
