import { createTransport } from 'nodemailer';
import loggerInfo from './pinoInfo.js';
import loggerError from './pinoError.js';
import {SERVICEEMAIL} from './config.js'
import {PORTEMAIL} from './config.js'
import {EMAILADMIN} from './config.js'
import {PASSWORDADMIN} from './config.js'


export default async function enviarMail(from, to, subject, html, attachment){
    const clienteNodemailer = createTransport({
        service: SERVICEEMAIL,
        port: PORTEMAIL,
        auth: {
            user: EMAILADMIN,
            pass: PASSWORDADMIN
        },
        attachments: [
            {
                path: attachment
            }
        ]
    });
    
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    }
    
    try {
        const info = await clienteNodemailer.sendMail(mailOptions)
        loggerInfo(info)
    } catch (error) {
        loggerError(error)
    }
}
