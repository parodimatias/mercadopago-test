import { getMerchandOrder } from "lib/mercadopago";
import { Order } from "lib/models/orders";
import { User } from "lib/models/users";
import { sendEmail } from "lib/sendgrid";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(process.env.VERCEL_URL + "/api/webhooks/mercadopago");
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const order = await getMerchandOrder(id);
    if (order.order_status == "paid") {
      const orderId = order.external_reference;
      const myOrder = new Order(orderId);
      await myOrder.pull();
      myOrder.data.status = "closed";
      await myOrder.push();
      const user = new User(myOrder.data.userId);
      await user.pull();
      const msg = {
        to: user.data.email,
        from: process.env.SENDER_EMAIL,
        subject: `Order ${myOrder.id} status has been updated`,
        text: `Your order status has been updated. Its new status is: ${myOrder.data.status}`,
        html: `<p> Your order status has been updated. Its new status is: ${myOrder.data.status}</p>`,
      };
      await sendEmail(msg);
    }
    res.status(200).send("OK");
  }
}
