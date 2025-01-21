import nodemailer from "nodemailer";

const sendEmailAlert = async (subject, message, recipient) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"No-Reply" <${process.env.EMAIL_USERNAME}>`,
        to: recipient,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send email alert:", error);
    }
};

export default sendEmailAlert;
