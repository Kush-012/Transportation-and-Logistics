import React, { useState } from "react";
import axios from "axios";

export default function AI() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Store full chat history (AI + user)
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Namaste! I am your <strong>SetuAI</strong> assistant, here to empower smarter, faster, and Atmanirbhar transportation.<br/>How may I assist you today?`
    }
  ]);

  const askAI = async () => {
    if (!prompt.trim()) return;

    const userText = prompt;
    setPrompt("");

    // Store user message
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4500/api/ai", {
        prompt: userText
      });

      const aiText = res.data.reply;

      // Store AI response
      setMessages(prev => [...prev, { sender: "ai", text: aiText }]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "❌ Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  return (
    <>
      {/* Floating glowing orb button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 w-16 h-16 rounded-full 
          bg-[#060b16] shadow-xl border border-blue-800
          flex items-center justify-center hover:scale-110 
          transition-all duration-300 z-[9999]
        "
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full shadow-[0_0_20px_#3b82f6]"></div>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-28 right-6 w-80 
            bg-[#0a1120] rounded-xl shadow-2xl 
            border border-[#1d2a40] overflow-hidden 
            animate-in slide-in-from-bottom-5 duration-300 z-[9999]
          "
        >
          {/* Header */}
          <div className="bg-[#0f1c33] p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
              </div>

              <div>
                <h2 className="text-white text-sm font-bold">SetuAI Assistant</h2>
                <p className="text-gray-300 text-xs">BharatConnect Support</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-[#0a1120]">

            {messages.map((msg, index) => (
              <div key={index} className="flex w-full">
                
                {/* USER MESSAGE */}
                {msg.sender === "user" && (
                  <div className="ml-auto bg-blue-600 text-white p-3 rounded-xl max-w-[70%] shadow-md text-sm">
                    {msg.text}
                  </div>
                )}

                {/* AI MESSAGE */}
                {msg.sender === "ai" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 rounded bg-blue-500 h-full"></div>
                    <div
                      className="bg-[#121b2e] text-gray-200 p-3 rounded-xl max-w-[85%] shadow-md text-xs leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {loading && (
              <p className="text-gray-400 text-xs italic">SetuAI is typing...</p>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0f1829] border-t border-[#1e2d45]">
            <div className="flex items-center space-x-2">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="
                  flex-1 bg-[#0d1627] text-gray-200 text-xs p-3 rounded-lg 
                  border border-[#23334d] focus:ring-2 focus:ring-blue-600 
                  placeholder:text-[10px] placeholder-gray-500 outline-none
                "
              />

              {/* Normal SEND Button */}
              <button
                onClick={askAI}
                disabled={loading || !prompt.trim()}
                className="
                  px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                  font-semibold text-xs rounded-lg shadow-md transition-all
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
