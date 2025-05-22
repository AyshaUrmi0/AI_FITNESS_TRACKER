export async function sendMessage({ input, userId, mode }) {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, userId, mode }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}
