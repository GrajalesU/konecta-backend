import mysql from "../database.js";

module.exports.deleteTenant = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = `UPDATE konecta.tenant
          SET its_active = 0
          WHERE id = ?`;
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
