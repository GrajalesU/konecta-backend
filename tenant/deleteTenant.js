import mysql from "../database.js";
import { DELETE_TENANT } from "../utils/queries.js";

export async function handler(event, context, callback){
  const id = event.queryStringParameters.id;
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = DELETE_TENANT;
  mysql.query(sql, [id], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Eliminado correctamente`,
        }),
      });
    }
  });
};
