import addMinutes from "date-fns/addMinutes";
import { Auth } from "lib/models/auth";
import { User } from "lib/models/users";
import { msg, sendEmail } from "lib/sendgrid";
import gen from "random-seed";

var random = gen.create();
export async function findOrCreateAuth(email: string) {
  const clearEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(clearEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({ email: clearEmail });
    const newAuth = await Auth.createNewAuth({
      email: clearEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  auth.data.code = code;
  auth.data.expires = addMinutes(new Date(), 20);
  await auth.push();
  const msg: msg = {
    to: auth.data.email,
    from: "matias.parodi@outlook.com",
    subject: "Access code",
    text: `Your code is ${auth.data.code}`,
  };
  sendEmail(msg);
  return true;
}

export async function checkEmailandCode(email: string, code: number) {
  const auth = await Auth.findByEmailAndCode(email, code);
  if (!auth) {
    return false;
  }
  return auth;
}
export async function checkCodeExpiration(auth) {
  const result = auth.isExpired();
  return result;
}
