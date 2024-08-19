import { mailOptions, transporter } from "../../../components/nodemailerotp";

const CONTACT_MESSAGE_FIELDS = {
  email: "Email",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlContent =`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 90%;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .header {
          background-color: #1a73e8;
          color: #ffffff;
          padding: 15px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: normal;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.5;
        }
        .content p {
          margin: 0 0 10px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #dddddd;
          text-align: center;
          font-size: 12px;
          color: #777777;
        }
        .button {
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 20px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        @media screen and (max-width: 600px) {
          .header h1 {
            font-size: 20px;
          }
          .content {
            font-size: 14px;
          }
          .button {
            padding: 8px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Blog Subscription</h1>
        </div>
        <div class="content">
          <p>Dear Kishan,</p>
          <p>A new user has subscribed to your blog, <strong>KishanBlogs</strong>.</p>
          <p><strong>Subscriber Email:</strong> ${data.email}</p>
          <p>Thank you for your continued efforts in sharing valuable content. Stay tuned for more subscribers!</p>
          <p>You can manage your subscribers by visiting your <a href="https://your-website-url.com/admin" class="button">Admin Dashboard</a>.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 KishanBlogs. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

  return {
    text: stringData,
    html: htmlContent,
  };
};

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  if (!data || !data.email) {
    return new Response(JSON.stringify({ message: "Bad request" }), { status: 400 });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: "kishanpaha0099@gmail.com",
      subject: 'Email Verification for KishanBlogs successfully',
      ...generateEmailContent(data),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}