import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export interface msg {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}
export async function sendEmail(msg: msg) {
  try {
    const response = await sgMail.send(msg);
    console.log(
      "Mail has been sent",
      msg,
      response[0].statusCode,
      response[0].headers
    );

    return `Mail has been sent, ${response[0].statusCode}`;
  } catch (error) {
    console.error(error);
    return `${error}`;
  }
}
