import mysql from '../database.js';

export async function handler(event) {
  let results = await mysql.query(`
  SELECT * FROM tenant 
  JOIN company
  ON tenant.id = company.id
  JOIN representative
  ON representative_id = representative.id;
  `)
  await mysql.end()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        results,
      },
    ),
  };
}