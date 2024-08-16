import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: email,
    pass,
  },
});

// export const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false,
//   auth: {
//       user: 'tristin.flatley@ethereal.email',
//       pass: '7tTqEAxyDypvBUmcC3'
//   }
// });

export const mailOptions = {
  from: email,
};