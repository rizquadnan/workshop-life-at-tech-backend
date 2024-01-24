import nodemailer from "nodemailer";
import config from "config";

const smtp = config.get<{
  host: string;
  port: number;
  user: string;
  pass: string;
}>("smtp");

type EmailUser = {
  email: string;
  name: string;
};

export default class Email {
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: EmailUser, private url: string) {
    this.#firstName = user.name.split(" ")[0];
    this.#to = user.email;
    this.#from = `Baret PT <admin@admin.com>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(html: string, subject: string) {
    // Generate HTML template based on the template string
    // const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
    //   firstName: this.#firstName,
    //   subject,
    //   url: this.url,
    // });
    // Create mailOptions
    const mailOptions = {
      from: this.#from,
      to: this.#to,
      subject,
      text: html,
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send(
      `Hi, ${this.#firstName}. <a href="${
        this.url
      }"> click here to get activate your verification code</a>`,
      "Your account verification code"
    );
  }

  async sendPasswordResetToken() {
    await this.send(
      `Hi, ${this.#firstName}. <a href="${
        this.url
      }"> click here to get reset your password</a>`,
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
