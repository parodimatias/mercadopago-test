import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(11111);

  res.send("hola");
}
