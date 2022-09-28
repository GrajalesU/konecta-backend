import { validateCartItems } from "../utils/checkout";
import Stripe from "stripe";
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export async function handler(event, context, callback) {
  try {
    const products = await dynamo
      .scan({ TableName: event.queryStringParameters.tableName })
      .promise();

    if (!products?.Items) {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "No products found",
        }),
      });
    }

    const cartItems = event?.body && JSON.parse(event.body);
    if (!cartItems) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: "No order items found",
        }),
      });
    }

    const StripeManager = new Stripe(process.env.STRIPE_KEY);

    const line_items = validateCartItems(products.Items, cartItems);

    const sessionParms = {
      mode: "payment",
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["CO", "US", "CA"],
      },
      success_url: `https://google.com`,
      cancel_url: `https://facebook.com`,
      line_items,
    };
    const session = await StripeManager.checkout.sessions.create(sessionParms);

    if (session) {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          session,
        }),
      });
    } else {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "Could not create the session",
        }),
      });
    }
  } catch (err) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        body: { message: err.message },
      }),
    });
  }
}
