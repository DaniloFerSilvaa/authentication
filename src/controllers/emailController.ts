import { Request, Response } from "express";
import nodemailer from 'nodemailer';

export const contato = async (req:Request, res:Response) => {
     
     //configurando o transporter
     let transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
               user: "34e94dc8b33cf0",
               pass: "a4a70636a843c0"
          }
        });

        //Configurando a mensagem
        let message = {
          from: 'não-responda@email.com',
          to: 'danilofernandessilva98@gmail.com',
          replyTo: req.body.from,
          subject: req.body.subject,
          html: req.body.email,
          text: req.body.email
}

     //Enviar a mensagem
     let info = await transport.sendMail(message);

     console.log("INFO", info);

     res.json({ success: true })
 }