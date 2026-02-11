const dotenv = require("dotenv");
dotenv.config();

function validateEnv() {
    const missing = [];
    const required = [
        "MONGO_URI",
        "JWT_SECRET"
    ];

    required.forEach((key) => {
        if (!process.env[key]) {
            missing.push(key);
        }
    });

    if (missing.length > 0) {
        console.error("\x1b[31m%s\x1b[0m", "[FATAL ERROR] Missing required environment variables:");
        missing.forEach((key) => {
            console.error(` - ${key}`);
        });
        console.error("\x1b[33m%s\x1b[0m", "Please add them to your .env file.");
        process.exit(1);
    }

    // Warnings for optional
    const optional = ["ORS_KEY", "redis_endpoint", "redis_password"];
    const warnings = [];

    optional.forEach((key) => {
        if (!process.env[key]) warnings.push(key);
    });

    if (warnings.length > 0) {
        console.warn("\x1b[33m%s\x1b[0m", "[WARN] Missing optional environment variables (Mocking enabled):");
        warnings.forEach(w => console.warn(` - ${w}`));
    }

    console.log("\x1b[32m%s\x1b[0m", "✅ Environment validation passed.");
}

module.exports = validateEnv;
