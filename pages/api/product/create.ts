import { authMiddleware } from "lib/middlewares";
import { Product } from "lib/models/products";
import method from "micro-method-router";
import { NextApiRequest, NextApiResponse } from "next";
async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId }
) {
  try {
    const product = await Product.createNewProduct(req.body);
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
}

const handler = method({
  post: postHandler,
});

export default authMiddleware(handler);
