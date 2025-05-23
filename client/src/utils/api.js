// This file is kept for future database integration
// For now, we're using the HuggingFace chatbot iframe directly in the UI
export const HF_CHATBOT_URL = 'https://vagabond99-fitness-chat-bot.hf.space';

// This function will be used later for database integration
export async function storeMessage(userId, message, response) {
  // To be implemented when we add the database
  console.log('Message storage will be implemented with database integration');
  return Promise.resolve();
}
