const db = require('../db');
const { 
  generateResponse, 
  COMMON_RESPONSES, 
  shouldUsePredefinedResponse,
  getConversationHistory,
  clearConversationHistory 
} = require('../services/cloudLLM');

async function processChat(req, res) {
  console.log('Received chat request:', {
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });

  try {
    const { input, userId, mode, clearHistory } = req.body;

    // Handle clear history request
    if (clearHistory) {
      console.log('Clearing conversation history for user:', userId);
      clearConversationHistory(userId);
      return res.json({ 
        response: "Conversation history cleared. How can I help you today?",
        history: []
      });
    }

    // Validate input
    if (!input || typeof input !== 'string') {
      console.log('Invalid input received:', input);
      return res.status(400).json({ error: 'Invalid input: Please provide a text message' });
    }

    console.log('Processing chat input:', {
      input,
      userId,
      mode,
      timestamp: new Date().toISOString()
    });

    let responseText;

    // Determine if the query is about workout or diet
    const type = input.toLowerCase().includes('diet') ? 'diet' : 'workout';
    console.log('Query type determined:', type);
    
    try {
      // Generate response with conversation history
      console.log('Generating response from LLM...');
      responseText = await generateResponse(input, type, userId);
      console.log('Response generated successfully:', {
        length: responseText.length,
        preview: responseText.substring(0, 100) + '...'
      });
    } catch (llmError) {
      console.error('LLM Error details:', {
        message: llmError.message,
        stack: llmError.stack,
        timestamp: new Date().toISOString()
      });
      responseText = COMMON_RESPONSES.error;
    }

    // Get updated conversation history
    const history = getConversationHistory(userId);
    console.log('Current conversation history length:', history.length);

    // Store interaction in DB only if userId is provided and valid
    if (userId) {
      try {
        // First check if user exists
        const userCheck = await db.query('SELECT id FROM users WHERE id = $1', [userId]);
        
        if (userCheck.rows.length > 0) {
          await db.query(
            'INSERT INTO interactions (user_id, input, response, mode) VALUES ($1, $2, $3, $4)',
            [userId, input, responseText, mode || 'text']
          );
          console.log('Interaction stored in database for user:', userId);
        } else {
          console.warn(`Attempted to store interaction for non-existent user: ${userId}`);
        }
      } catch (dbError) {
        console.error('Database error:', {
          message: dbError.message,
          code: dbError.code,
          timestamp: new Date().toISOString()
        });
        // Continue even if DB storage fails
      }
    }

    console.log('Sending response to client:', {
      responseLength: responseText.length,
      historyLength: history.length,
      timestamp: new Date().toISOString()
    });

    res.json({ 
      response: responseText,
      history: history
    });
  } catch (error) {
    console.error('Error in processChat:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      message: error.message
    });
  }
}

module.exports = { processChat };