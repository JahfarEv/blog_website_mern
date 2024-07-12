const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
import { v4, uuidv4 } from "uuid";

dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",

  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});
export const sendVerificationEmail = async (user, res) => {
const { _id, email, lastName} = user;   
const token = _id + uuidv4();

const link = PORT + "user/verify" + _id + "/" + token;

//mail option

const mailOtions = {
  from:AUTH_EMAIL,
  to:email,
  subject:"Email verification",
  html:`<div style= 'font-family:Arial, sans-serif; font-size:20px;color:#333;background-color:
  <h1 style="color: rgb(8, 56, 188)"> Please verify your email address</h1>
  <hr>
  <h4>Hi ${lastName},</h4>
  <p>
  Please verify your email address so we can know that its realy you.
  <br>
  <p>This link <b>expires in 1 hour </b> </p>
  <br>
  <a href=${link}
  style="color: #fff; padding:14px; text-decoration: none; background-color: #000;
  Email address </a>
  </P>
  <div style="margin-top: 20px;">
  <h5>Best regards </h5>
  <h5>Share fun teams</h5>
  </div>
  </div>`
};

try {
  const hashedToken = await 
} catch (error) {
  console.log(error);
}


}