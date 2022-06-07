import { sendCode } from "lib/controllers/auth";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await sendCode(req.body.email);
  if (!result) res.status(401).send("Error");
  res.send(result);
}
