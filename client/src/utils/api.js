const API_BASE_URL = 'http://localhost:5000/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Failed to send message');
  }
  return data;
}

export async function sendMessage({ input, userId, mode }) {
  try {
    console.log('Sending message:', { input, userId, mode });
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ input, userId, mode }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Health check function
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Server health check failed:', error);
    throw error;
  }
}
