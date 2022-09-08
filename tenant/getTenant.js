import mysql from "../database.js";
import { GET_TENANT } from "../utils/queries.js";

module.exports.getTenant = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = GET_TENANT;
  mysql.query(sql, [id], (error, row) => {
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
