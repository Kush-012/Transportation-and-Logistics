const nodemailer = require("nodemailer");
require("dotenv").config();
const { generateOTP, storeOTP } = require("../otp/otpservice");

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

        console.log(`[DEBUG] ---------------------------------------------------`);
        console.log(`[DEBUG] EMAIL MOCK: Sending email to ${receiverEmail}`);
        console.log(`[DEBUG] OTP: ${otp}`);
        console.log(`[DEBUG] ---------------------------------------------------`);

        try {
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
        } catch (emailErr) {
            console.log(`[WARN] Email sending failed (likely due to missing credentials). Proceeding with console OTP.`);
            console.log(`[WARN] Error: ${emailErr.message}`);
        }

        console.log(`Generated OTP: ${otp}`);

    } catch (err) {
        console.error("Error in sendmail service:", err);
    }
}

module.exports = { sendmail };
