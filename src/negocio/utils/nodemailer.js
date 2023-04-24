import { createTransport } from 'nodemailer';
import loggerInfo from '../utils/pinoInfo.js';
import loggerError from '../utils/pinoError.js';
import {SERVICEEMAIL} from '../../config/config.js'
import {PORTEMAIL} from '../../config/config.js'
import {EMAILADMIN} from '../../config/config.js'
import {PASSWORDADMIN} from '../../config/config.js'


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


