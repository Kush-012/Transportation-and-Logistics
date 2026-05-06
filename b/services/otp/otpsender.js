const { sendmail } = require("../mail/sendmail");

async function otpSender(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        await sendmail(email);

        return res.status(200).send({
            message: "OTP sent to email"
        });

    } catch (err) {
        console.error("OTP Sender Error"); // Do not log sensitive error details
        return res.status(500).send({ message: "Server error" });
    }
}

module.exports = { otpSender };
