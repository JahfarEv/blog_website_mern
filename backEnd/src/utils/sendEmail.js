const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { hashString } = require("./index");
const Verification = require("../models/verification");
const createError = require("./createError");

dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});
const sendVerificationEmail = async (user, res) => {
  const { _id, email, name } = user;
  const token = _id + uuidv4();

  const link = `${process.env.APP_URL}/user/verify/${token}`;

  //mail option

  const mailOtions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html: `<div style= 'font-family:Arial, sans-serif; font-size:20px;color:#333;background-color:
  <h1 style="color: rgb(8, 56, 188)"> Please verify your email address</h1>
  <hr>
  <h4>Hi ${name},</h4>
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
  </div>`,
  };

  try {
    const hashedToken = await hashString(token);
    const newVerificationEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });

    if (newVerificationEmail) {
      transporter
        .sendMail(mailOtions)
        .then(() => {
          res.status(201).send({
            success: "Pending",
            message:
              "Verification email has been sent to your account. Cheack your email further instruction",
          });
        })
        .catch((err) => {
          console.log(err);
          // next(createError("Somthing went wrong", "NotFOundError"));
        });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  sendVerificationEmail,
};
