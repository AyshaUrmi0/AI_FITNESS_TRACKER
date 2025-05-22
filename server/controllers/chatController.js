const { openai } = require('../utils/openai');
const db = require('../db');

async function processChat(req, res) {
  try {
    const { input, userId, mode } = req.body;

    // Call OpenAI API (GPT-3.5-turbo)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful fitness coach. Provide personalized workout and diet advice.'
        },
        { role: 'user', content: input }
      ],
    });

    const responseText = completion.choices[0].message.content;

    // Store interaction in DB
    await db.query(
      'INSERT INTO interactions (user_id, input, response, mode) VALUES ($1, $2, $3, $4)',
      [userId || null, input, responseText, mode || 'text']
    );

    res.json({ response: responseText });
  } catch (error) {
    console.error('Error in processChat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { processChat };
