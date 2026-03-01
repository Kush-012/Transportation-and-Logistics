const nodemailer = require("nodemailer");
require("dotenv").config();
const { generateOTP, storeOTP } = require("../otp/otpService");

async function sendmail(receiverEmail) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Generate & Store OTP
        const otp = generateOTP();
        await storeOTP(receiverEmail, otp);

        await transporter.sendMail({
            from: `Transportation & Logistics! <${process.env.SMTP_USER}>`,
            to: receiverEmail,
            subject: "OTP Verification",
            html: `
                <h2>Welcome to Transportation & Logistics</h2>
                <p>Your OTP Code:</p>
                <h1><b>${otp}</b></h1>
                <p>⚠ Valid for <b>2 minutes</b>.</p>
            `
        });

        console.log(`Email OTP sent to ${receiverEmail}`);
        // Do not log generated OTP for security

    } catch (err) {
        console.error("Error sending email:", err);
    }
}

module.exports = { sendmail };
