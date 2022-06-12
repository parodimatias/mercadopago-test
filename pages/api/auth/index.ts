import { sendCode } from "lib/controllers/auth";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body.email) throw "No email";
    const result = await sendCode(req.body.email);
    if (!result) throw "Error";
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}
