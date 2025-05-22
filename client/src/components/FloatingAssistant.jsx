// components/FloatingAssistant.jsx
import Vapi from "@vapi-ai/web";

import { useState } from "react";

export default function FloatingAssistant() {
  const [show, setShow] = useState(false);

  const toggleAssistant = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-20 right-6 z-50 bg-white p-4 rounded-xl shadow-lg">
          <Vapi
            apiKey={import.meta.env.VITE_VAPI_PUBLIC_KEY}
            assistantId={import.meta.env.VITE_VAPI_ASSISTANT_ID}
            startListening={true}
          />
        </div>
      )}

      <button
        onClick={toggleAssistant}
        className="fixed top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg z-50 transition-all duration-300"
      >
        🎙️ {show ? "Hide" : "Talk"}
      </button>
    </>
  );
}
