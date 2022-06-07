import { getMerchandOrder } from "lib/mercadopago";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    await getMerchandOrder(id);
  }
  res.status(200).send("hola");
}
