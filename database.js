import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: process.env.RDS_HOST,
    database: process.env.RDS_DATABASE,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  }
})


export default db;