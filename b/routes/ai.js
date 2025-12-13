const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// ----------------------------------------
//  DIRECT GEMINI API KEY  (from your test file)
// ----------------------------------------
const GEMINI_API_KEY = "AIzaSyD6q4X4JglPVDcQWiepZm00MStbRoxQMbo";

// Initialize Gemini
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// Choose model from your list
const MODEL = "models/gemini-2.5-flash-lite";

// Default SetuAI Greeting
const SETU_GREETING = `
Namaste! I am your <strong>SetuAI</strong> assistant!

`;

// System Prompt to train the AI for your website
const SYSTEM_PROMPT = `
You are <strong>SetuAI</strong> — the official AI assistant of Swadeshi Transport & Logistics.

Your purpose:
- Help users understand how to use the Swadeshi Transport platform.
- Assist shippers with booking transport, tracking shipments, viewing available vehicles, and managing bookings.
- Assist drivers with adding/updating vehicles, dashboard usage, login/signup, and completing profile details.
- Explain logistics concepts: transportation rules, Indian fleet operations, compliance, routing, freight types, capacity, pricing, etc.

Platform contains two user roles:
1️⃣ **Shipper Module**
- Signup, Login, Reset Password
- Home Page
- Book Transport
- View Available Vehicles
- My Bookings

2️⃣ **Driver Module**
- Signup, Login, Reset Password
- Add Vehicle
- Update Vehicle
- Dashboard (view bookings, vehicle status)

Rules you MUST follow:
- Only respond to logistics, transportation, routing, policies, bookings, fleet management, or platform-related questions.
- If user asks unrelated topics (coding, science, jokes, exams, politics, random queries), respond:
  “I can assist only with Swadeshi Transport & Logistics or logistics-related topics.”
- Maintain a friendly, professional Indian tone.
- Keep answers clear and helpful.
- Always provide steps if a user asks “how to do something” on the website.
When the user reports a problem (login issue, booking issue, password reset issue, vehicle issue, etc.), always:
      → Diagnose the issue
      → Ask helpful follow-up questions if needed
      → Provide targeted troubleshooting steps

FINAL RULE:
If after answering, the user's problem may still be unresolved, always end your message with:

“**If the issue still isn’t resolved, please email our administrator for assistance.**”
      
You must ALWAYS respond as SetuAI.
`;

router.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ reply: "Prompt is required." });
    }

    const model = ai.getGenerativeModel({ model: MODEL });

    const result = await model.generateContent({
      contents: [
        { role: "model", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "user", parts: [{ text: prompt }] }
      ],
    });

    let text = result?.response?.text() || "";

   

    // -----------------------------------------
    //  MARKDOWN → HTML FORMATTING ENGINE
    // -----------------------------------------
    text = text
      // exactly 1 blank line before bullet
      .replace(/(\S)\n\*/g, "$1\n\n*")

      // fix triple blank lines
      .replace(/\n\n\n+/g, "\n\n")

      // headings
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")

      // bold italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")

      // bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

      // italic (not bullets)
      .replace(/(^|[^*\n])\*(?!\s)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>")

      // bullet points
      .replace(/(?:^|\n)\* (.*)/g, "<ul><li>$1</li></ul>")

      // horizontal rule
      .replace(/---/g, "<hr/>")

      // newlines
      .replace(/\n/g, "<br/>");

    return res.json({ reply: text });

  } catch (error) {
    console.error("AI Error →", error);

    return res.json({
      reply:
        SETU_GREETING +
        `⚠️ <strong>SetuAI is temporarily unavailable.</strong><br/>Please try again shortly.`
    });
  }
});

module.exports = router;
