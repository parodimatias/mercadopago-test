import mercadopago from "mercadopago";
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function getMerchandOrder(id) {
  console.log("id es", id);
  try {
    const res = await mercadopago.merchant_orders.get(id);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
