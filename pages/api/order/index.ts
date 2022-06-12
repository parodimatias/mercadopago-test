import { createOrderAndPreference } from "lib/controllers/orders";
import { authMiddleware } from "lib/middlewares";
import { Product } from "lib/models/products";
import { User } from "lib/models/users";
import method from "micro-method-router";
import { NextApiRequest, NextApiResponse } from "next";
async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId }
) {
  try {
    const user = new User(token.userId);
    await user.pull();
    const { productId } = req.query;
    const product = new Product(productId);
    await product.pull();
    if (!product.data) res.status(404).send("Product does not exist");
    const payUrl = await createOrderAndPreference({
      userId: token.userId,
      productId,
      quantity: req.body.data.quantity,
    });
    res.send(payUrl);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

const handler = method({
  post: postHandler,
});

export default authMiddleware(handler);
