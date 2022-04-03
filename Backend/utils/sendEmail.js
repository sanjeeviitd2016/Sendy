const nodeMailer= require('nodemailer')
const sendEmail= async(options)=>{
    const mailTransporter= nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.POSTBOOK_EMAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const MailOptions= {
        from: process.env.POSTBOOK_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await mailTransporter.sendMail(MailOptions);

}
module.exports= sendEmail;