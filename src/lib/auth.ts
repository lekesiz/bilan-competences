import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { db } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.VITE_JWT_SECRET || 'your-secret-key'
);

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createToken = async (userId: string, role: string) => {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
};

export const createUser = async (email: string, password: string, name: string) => {
  const hashedPassword = await hashPassword(password);
  const userId = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
    args: [userId, email, hashedPassword, name],
  });

  return userId;
};

export const findUserByEmail = async (email: string) => {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  });

  return result.rows[0];
};

export const updateUserProfile = async (userId: string, data: any) => {
  const { name, profession, experience, interests } = data;
  
  await db.execute({
    sql: `UPDATE users 
          SET name = ?, profession = ?, experience = ?, interests = ?
          WHERE id = ?`,
    args: [name, profession, experience, JSON.stringify(interests), userId],
  });
};