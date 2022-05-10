import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f7b058f2c3fd2",
    pass: "6d2fd62a371eba"
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create(({
    data: {
      comment,
      type,
      screenshot
    }
  }))

  await transport.sendMail({
    from: 'Equipe FeedGet <equipe@feedget.com.br>',
    to: 'Victor Kist <victoraugustokist@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div>`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})