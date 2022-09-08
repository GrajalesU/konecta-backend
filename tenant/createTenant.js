import mysql from "../database.js";
import AWS from "aws-sdk";

import { CREATE_REPRESENTATIVE, CREATE_COMPANY, CREATE_TENANT, CREATE_DYNAMIC_TABLES, UPDATE_LOGO } from "../utils/tenant.queries.js";

const s3 = new AWS.S3();
const cognito = new AWS.CognitoIdentityServiceProvider()

const createBucket = async (id, logo) => {
  try {
    let encodedImage = logo.encodedImage;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    var filePath = `${id}/logo/logo_${id}.${logo.extension}`
    var params = {
      "Body": decodedImage,
      "Bucket": "konectapp",
      "Key": filePath,
      "ACL": "public-read"
    };

    const res = await s3.upload(params).promise()
    const url = res.Location
    return url;
  }
  catch (err) {
    return err;
  }

}

const createCognitoUser = async (email) => {
  try {
    await cognito.adminCreateUser({
      UserPoolId: "us-west-2_EK6HGmGk4",
      Username: email,
    }).promise()

    await cognito.adminAddUserToGroup({
      GroupName: "client",
      UserPoolId: "us-west-2_EK6HGmGk4",
      Username: email,
    }).promise()
  }
  catch (err) {
    return err
  }
}


export async function handler(event, context) {
  let tenant_id;

  const body = JSON.parse(event.body);
  context.callbackWaitsForEmptyEventLoop = false;

  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  await mysql
    .transaction()
    .query(CREATE_REPRESENTATIVE, [body["REPRESENTATIVE_NAME"], body["REPRESENTATIVE_EMAIL"], body["REPRESENTATIVE_PHONE"]])
    .query((r) => [CREATE_COMPANY, [body.ADDRESS, body["COMPANY_ACTIVITY"], body["COMPANY_EMAIL"], body["COMPANY_NAME"], body["COMPANY_PHONE"], body.COUNTRY, body.DEPARTMENT, body.CITY, body.NIT, r.insertId]])
    .query((r) => [CREATE_TENANT, [r.insertId]])
    .query((r) => {
      tenant_id = r.insertId
      const stock = `konecta.stock_${tenant_id}`
      const product = `konecta.product_${tenant_id}`
      const image = `konecta.image_${tenant_id}`


      return [CREATE_DYNAMIC_TABLES(stock,product,image)]
    })
    .rollback((error) => {
      return({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    })
    .commit()

  await createCognitoUser(body["REPRESENTATIVE_EMAIL"]);
  const currentLogo = await createBucket(tenant_id, body.LOGO)
  const tenant = await mysql.query(UPDATE_LOGO, [tenant_id, currentLogo])
  await mysql.end()

  return({
    statusCode,
    body: JSON.stringify(tenant),
    headers
  })
};
