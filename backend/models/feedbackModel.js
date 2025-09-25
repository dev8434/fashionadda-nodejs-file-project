import { pool } from '../config/mysql.js';

const createFeedback = async (name, email, message, rating) => {
  const [result] = await pool.execute(
    'INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)',
    [name, email, message, rating]
  );
  return result;
};

const getFeedbacks = async () => {
    const [rows] = await pool.execute('SELECT * FROM feedback ORDER BY created_at DESC');
    return rows;
};

export { createFeedback, getFeedbacks };