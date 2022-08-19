import mysql from '../database.js';

export async function handler(event) {
  let results = await mysql.query('SELECT 1 + 1 AS solution')
  await mysql.end()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        results,
        input: event,
      },
    ),
  };
}