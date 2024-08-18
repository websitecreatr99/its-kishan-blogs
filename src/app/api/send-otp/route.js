import { mailOptions, transporter } from "../../../components/nodemailerotp";

const CONTACT_MESSAGE_FIELDS = {
  email: "Email",
  otp: "Otp",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
  
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border: 1px solid #dddddd;
        border-radius: 5px;
      }
      .email-header {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .email-body {
        padding: 20px;
        font-size: 16px;
        line-height: 24px;
      }
      .email-footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #999999;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
      }
      .cta {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        display: inline-block;
      }
    </style>
  </head>
  
  <body>
    <div class="email-container">
      <div class="email-header">
        <h2>KishanBlogs OTP Verification</h2>
      </div>
      <div class="email-body">
        <p>Hi there,</p>
        <p>Thank you for verifying your email with KishanBlogs. Please use the following OTP (One-Time Password) to complete your verification:</p>
        <div class="otp">${data.otp}</div>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email or contact support.</p>
        <p>Best regards,</p>
        <p>KishanBlogs Team</p>
      </div>
      <div class="email-footer">
        <p>© 2024 KishanBlogs. All rights reserved.</p>
        <p><a href="https://its-kishan-portfolio.vercel.app/" target="_blank">Visit our website</a></p>
      </div>
    </div>
  </body>
  
  </html>`
  return {
    text: stringData,
    html: htmlContent,
  };
};

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  if (!data || !data.email || !data.otp) {
    return new Response(JSON.stringify({ message: "Bad request" }), { status: 400 });
  }


  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //       user: 'tristin.flatley@ethereal.email',
  //       pass: '7tTqEAxyDypvBUmcC3'
  //   }
  // });

  try {
    await transporter.sendMail({
      ...mailOptions,
      // from: 'email@example.com',
      // from: "kishanvir4321@gmail.com",
      // to: "kishanpaha0099@gmail.com",
      to: [data.email, kishanpaha0099@gmail.com],
      subject: 'Your OTP for KishanBlogs Verification',
      ...generateEmailContent(data),
      // otp: data.otp,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}




