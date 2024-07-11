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
export const sendVerificationEmail = async (user, res) => {}
const { _id, email, lastName} = user;   
const token = _id + uuidv4();

const link = PORT + "user/verify" + _id + "/" + token;

//mail option

const mailOtions = {
  from:AUTH_EMAIL,
  to:email,
  subject:"Email verification",
  html:`<div style= 'font-family:Arial`
}
