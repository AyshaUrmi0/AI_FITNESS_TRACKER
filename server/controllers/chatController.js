const { openai } = require('../utils/openai');
const db = require('../db');

async function processChat(req, res) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env file');
    }

    const { input, userId, mode } = req.body;

    // Validate input
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: 'Invalid input: Please provide a text message' });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful fitness coach. Provide personalized workout and diet advice. Be specific and actionable in your responses.'
        },
        { role: 'user', content: input }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const responseText = completion.choices[0].message.content;

    // Store interaction in DB
    try {
      await db.query(
        'INSERT INTO interactions (user_id, input, response, mode) VALUES ($1, $2, $3, $4)',
        [userId || null, input, responseText, mode || 'text']
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if DB storage fails
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error('Error in processChat:', error);
    
    // Handle specific OpenAI errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.error?.message || 'OpenAI API error';
      
      if (statusCode === 401) {
        return res.status(401).json({ 
          error: 'Invalid API key. Please check your OpenAI API key configuration.' 
        });
      } else if (statusCode === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded. Please try again in a few moments.' 
        });
      }
      
      return res.status(statusCode).json({ error: errorMessage });
    }
    
    // Handle other errors
    res.status(500).json({ 
      error: error.message || 'An error occurred while processing your request' 
    });
  }
}

module.exports = { processChat };