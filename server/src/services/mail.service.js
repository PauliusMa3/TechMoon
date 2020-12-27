const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
})

const baseEmail = text => `
  <div className="email" style="
    border: 20px solid #0763e5;
    text-align:center;
    padding: 10px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello</h2>
    <div>${text}</div>
    <p>© TechMoon</p>
  </div>
`;

module.exports= { 
    transport,
    baseEmail
}