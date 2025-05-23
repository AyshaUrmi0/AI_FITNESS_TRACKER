require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'fitness_tracker',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  // Add SSL if needed (for production)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
}; 