import { createPreference } from "lib/mercadopago";
import { Order } from "lib/models/orders";
import { Product } from "lib/models/products";
export async function createOrderAndPreference({
  userId,
  productId,
  quantity,
}) {
  const order = await Order.createNewOrder({
    userId,
    productId,
    quantity,
    status: "pending",
  });

  const product = new Product(productId);
  await product.pull();
  const preference = {
    external_reference: order.id,
    back_urls: {
      success: process.env.VERCEL_URL + "/success",
      pending: process.env.VERCEL_URL + "/pending",
    },

    notification_url:
      "https://mercadopago-test.vercel.app/api/webhooks/mercadopago",
    items: [
      {
        title: product.data.title,
        unit_price: product.data.unit_price,
        description: product.data.description,
        picture_url: product.data.picture_url,
        quantity: order.data.quantity,
        currency_id: "ARS",
        category_id: "cat123",
      },
    ],
  };
  const preferenceRes = await createPreference(preference);
  console.log(preferenceRes);
  console.log(process.env.VERCEL_URL + "/api/webhooks/mercadopago");
  return preferenceRes.body["init_point"];
}
