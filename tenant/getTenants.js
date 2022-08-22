import mysql from "../database.js";

export async function handler(event) {
  let results = await mysql.query(`
  SELECT * FROM tenant 
    JOIN company
    ON tenant.id = company.id
    JOIN representative
    ON representative_id = representative.id
  WHERE its_active = 1
  
  `);
  await mysql.end();

  return {
    statusCode: 200,
    body: JSON.stringify({
      results,
    }),
  };
}
