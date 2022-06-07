import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decode } from "./jwt";
export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseBearerToken(req);
    if (!token) {
      res.status(401).send({ message: "No token" });
    }

    const decodedToken = decode(token);
    console.log(decodedToken);
    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "Wrong token" });
    }
  };
}
