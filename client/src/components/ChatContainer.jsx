import React from 'react';
import { HF_CHATBOT_URL } from '../utils/api';

const ChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 py-6 sm:py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-orange-500 text-white">
          <h1 className="text-xl sm:text-2xl font-bold text-center">AI Fitness Coach</h1>
        </div>
        <div className="p-4">
          <div className="w-full">
            <iframe
              src={HF_CHATBOT_URL}
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] border-0 rounded-lg"
              title="AI Fitness Coach Chatbot"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
