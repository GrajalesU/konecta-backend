import mysql from "../database.js";
import { GET_TENANTS } from "../utils/queries.js";

module.exports.getTenants = (_, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = GET_TENANTS;
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
