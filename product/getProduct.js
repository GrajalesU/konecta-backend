import mysql from "../database.js";
import { GET_PRODUCT } from "../utils/product.queries.js";

export async function handler(event, context, callback) {
  const { id_tenant, id_product } = event.queryStringParameters;
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = GET_PRODUCT(id_tenant);
  mysql.query(sql, [id_product], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          tenant: row,
        }),
      });
    }
  });
};