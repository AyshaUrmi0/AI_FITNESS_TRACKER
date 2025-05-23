const axios = require('axios');

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'llama2'; // or 'mistral' for a smaller model

// Pre-defined fitness and diet prompts
const SYSTEM_PROMPTS = {
  workout: `You are a professional fitness trainer. Provide specific, actionable workout advice.
Focus on:
- Exercise form and safety
- Progressive overload
- Rest and recovery
- Realistic goals
Keep responses concise and practical.`,

  diet: `You are a nutrition expert. Provide specific, actionable diet advice.
Focus on:
- Balanced nutrition
- Portion control
- Meal timing
- Hydration
Keep responses concise and practical.`
};

async function generateResponse(prompt, type = 'workout') {
  try {
    const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.workout;
    const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\n\nAssistant:`;

    const response = await axios.post(OLLAMA_API_URL, {
      model: MODEL_NAME,
      prompt: fullPrompt,
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 500
      }
    });

    return response.data.response;
  } catch (error) {
    console.error('Local LLM Error:', error);
    throw new Error('Failed to generate response from local AI model');
  }
}

// Pre-defined responses for common questions
const COMMON_RESPONSES = {
  greeting: "Hello! I'm your AI fitness coach. I can help you with workout plans and diet advice. What would you like to know?",
  workout_basics: "For beginners, I recommend starting with:\n1. Bodyweight exercises (push-ups, squats, lunges)\n2. 20-30 minutes, 3 times per week\n3. Focus on form over intensity\n4. Rest 1-2 minutes between sets\nWould you like more specific advice?",
  diet_basics: "Here's a basic healthy diet plan:\n1. Eat protein with every meal\n2. Include vegetables in 2/3 of your meals\n3. Stay hydrated (2-3 liters of water daily)\n4. Limit processed foods\nWould you like more specific advice?",
  error: "I'm having trouble processing your request. Please try asking in a different way or contact support if the issue persists."
};

// Function to determine if we should use pre-defined response
function shouldUsePredefinedResponse(input) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return 'greeting';
  }
  if (lowerInput.includes('beginner') && lowerInput.includes('workout')) {
    return 'workout_basics';
  }
  if (lowerInput.includes('diet') && (lowerInput.includes('basic') || lowerInput.includes('start'))) {
    return 'diet_basics';
  }
  
  return null;
}

module.exports = {
  generateResponse,
  COMMON_RESPONSES,
  shouldUsePredefinedResponse
}; 