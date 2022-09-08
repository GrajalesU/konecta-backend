import mysql from "../database.js";
import { GET_PRODUCTS } from "../utils/product.queries.js";

export async function handler(event, context, callback) {
  const { id_tenant } = event.queryStringParameters
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = GET_PRODUCTS(id_tenant)
  mysql.query(sql, (error, rows) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          tenant: rows,
        }),
      });
    }
  });
};