import { createClient } from '@libsql/client';

const createDbClient = () => {
  const url = import.meta.env.VITE_DB_URL;
  const authToken = import.meta.env.VITE_DB_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error('Database configuration missing. Please check your environment variables.');
  }

  return createClient({
    url,
    authToken,
  });
};

let dbInstance: ReturnType<typeof createClient> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    dbInstance = createDbClient();
  }
  return dbInstance;
};

export const initDb = async () => {
  const db = getDb();
  
  try {
    await db.batch([
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        profession TEXT,
        experience TEXT,
        interests TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        estimated_time TEXT NOT NULL,
        questions TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS results (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        score INTEGER NOT NULL,
        answers TEXT NOT NULL,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (assessment_id) REFERENCES assessments(id)
      )`
    ]);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};