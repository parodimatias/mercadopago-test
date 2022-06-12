import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export interface msg {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}
export function sendEmail(msg: msg) {
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
}
