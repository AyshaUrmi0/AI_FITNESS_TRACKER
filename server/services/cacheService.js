const NodeCache = require('node-cache');

// Cache for storing responses (TTL: 1 hour)
const responseCache = new NodeCache({
  stdTTL: 3600, // 1 hour in seconds
  checkperiod: 600, // Check for expired keys every 10 minutes
  useClones: false
});

// Cache for storing conversation history (TTL: 24 hours)
const conversationCache = new NodeCache({
  stdTTL: 86400, // 24 hours in seconds
  checkperiod: 3600, // Check for expired keys every hour
  useClones: false
});

// Maximum number of messages to keep in conversation history
const MAX_HISTORY_LENGTH = 10;

function getCacheKey(input, type) {
  // Create a unique key based on input and type
  return `${type}:${input.toLowerCase().trim()}`;
}

function getConversationKey(userId) {
  return `conv:${userId || 'anonymous'}`;
}

const cacheService = {
  // Response caching
  getCachedResponse: (input, type) => {
    const key = getCacheKey(input, type);
    return responseCache.get(key);
  },

  setCachedResponse: (input, type, response) => {
    const key = getCacheKey(input, type);
    responseCache.set(key, response);
  },

  // Conversation history
  getConversationHistory: (userId) => {
    const key = getConversationKey(userId);
    return conversationCache.get(key) || [];
  },

  addToConversationHistory: (userId, message) => {
    const key = getConversationKey(userId);
    let history = conversationCache.get(key) || [];
    
    // Add new message to history
    history.push(message);
    
    // Keep only the last MAX_HISTORY_LENGTH messages
    if (history.length > MAX_HISTORY_LENGTH) {
      history = history.slice(-MAX_HISTORY_LENGTH);
    }
    
    conversationCache.set(key, history);
    return history;
  },

  clearConversationHistory: (userId) => {
    const key = getConversationKey(userId);
    conversationCache.del(key);
  },

  // Cache statistics
  getStats: () => {
    return {
      responseCache: responseCache.getStats(),
      conversationCache: conversationCache.getStats()
    };
  }
};

module.exports = cacheService; 