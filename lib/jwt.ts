import jwt from "jsonwebtoken";
export function generateToken(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET);
}

export function decode(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("token incorrecto");
    return null;
  }
}
