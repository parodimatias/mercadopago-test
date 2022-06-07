import { checkCodeExpiration, checkEmailandCode } from "lib/controllers/auth";
import { generateToken } from "lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const auth = await checkEmailandCode(req.body.email, req.body.code);
  if (!auth) {
    res.status(401).send("email or code incorrect");
    return;
  }
  const isExpired = await checkCodeExpiration(auth);
  if (isExpired) {
    res.status(401).send("code is expired");
    return;
  }
  var token = generateToken({ userId: auth.data.userId });
  res.send({ token });
}
