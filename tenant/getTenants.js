import mysql from "../database.js";

module.exports.getTenants = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = `SELECT * FROM konecta.tenant
      JOIN company
      ON tenant.id = company.id
      JOIN representative
      ON representative_id = representative.id
    WHERE its_active = 1`;
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
