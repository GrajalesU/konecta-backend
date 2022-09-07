import mysql from "../database.js";

module.exports.getTenant = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = `
  SELECT * FROM konecta.tenant
    JOIN company
    ON tenant.id = company.id
    JOIN representative
    ON representative_id = representative.id
  WHERE tenant.id = ? AND its_active = 1
  `;
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
