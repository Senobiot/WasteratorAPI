const nodeMailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActimationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activation link",
      html: `<div>
                <h1>Активируйте аккаунт по ссылке:</h1>
                <a href=${link}>${link}</a>
            </div>`, 
    });
  }
}

module.exports = new MailService();
