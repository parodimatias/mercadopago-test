import mercadopago from "mercadopago";
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function getMerchandOrder(id) {
  try {
    const res = await mercadopago.merchant_orders.get(id);
    return res.body;
  } catch (err) {
    console.error(err);
  }
}

export async function createPreference(preference) {
  try {
    const res = await mercadopago.preferences.create(preference);
    return res;
  } catch (err) {
    console.error(err);
  }
}
