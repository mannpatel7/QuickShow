import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail=async ({to,subject,body})=>{
    try {
        if(!to || !subject || !body) {
            throw new Error(`Missing email parameters: to=${to}, subject=${subject}, body=${body ? 'present' : 'missing'}`);
        }

        console.log(`[EMAIL] Sending to: ${to}, Subject: ${subject}`);
        
        const response=await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to,
            subject,
            html:body,
        });
        
        console.log(`[EMAIL] Sent successfully to ${to}. Message ID: ${response.messageId}`);
        return response;
    } catch (error) {
        console.error(`[EMAIL] Error sending to ${to}:`, error.message);
        throw error;
    }
}
export default sendEmail;

