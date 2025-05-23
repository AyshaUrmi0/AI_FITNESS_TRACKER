const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dbConfig = require('../config/database');

async function initializeDatabase() {
  // Create a new pool for initialization
  const pool = new Pool({
    ...dbConfig,
    database: 'postgres' // Connect to default database first
  });

  try {
    // Connect to PostgreSQL
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbConfig.database]
    );

    // Create database if it doesn't exist
    if (dbCheck.rows.length === 0) {
      console.log(`Creating database: ${dbConfig.database}`);
      await client.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log('Database created successfully');
    } else {
      console.log(`Database ${dbConfig.database} already exists`);
    }

    // Release the client back to the pool
    client.release();

    // Create a new pool for the actual database
    const dbPool = new Pool(dbConfig);
    const dbClient = await dbPool.connect();

    // Read and execute the schema file
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Creating tables...');
    await dbClient.query(schema);
    console.log('Tables created successfully');

    // Release the client
    dbClient.release();

    console.log('Database initialization completed successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  } finally {
    // Close all pools
    await pool.end();
  }
}

// Run the initialization
initializeDatabase(); 