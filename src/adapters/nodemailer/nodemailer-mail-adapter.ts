import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapte";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f7b058f2c3fd2",
    pass: "6d2fd62a371eba"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data
    await transport.sendMail({
      from: 'Equipe FeedGet <equipe@feedget.com.br>',
      to: 'Victor Kist <victoraugustokist@gmail.com>',
      subject,
      html: body
    })
  };
}