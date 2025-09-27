import { pool } from '../config/mysql.js';

const findByEmail = async (email) => {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE email = ?', [email]);
    return rows[0];
};

const findByEmailWithPassword = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const create = async (name, email, password) => {
    const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    return { id: result.insertId, name, email };
};

const findById = async (id) => {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
    return rows[0];
};

const getAll = async () => {
    const [rows] = await pool.query('SELECT id, name, email FROM users');
    return rows;
};

const updateResetToken = async (email, token, expire) => {
    await pool.query('UPDATE users SET resetPasswordToken = ?, resetPasswordExpire = ? WHERE email = ?', [token, expire, email]);
};

const findByResetToken = async (token) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpire > NOW()', [token]);
    return rows[0];
};

const updatePassword = async (id, newPassword) => {
    await pool.query('UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpire = NULL WHERE id = ?', [newPassword, id]);
};

export default {
    findByEmail,
    findByEmailWithPassword,
    create,
    findById,
    getAll,
    updateResetToken,
    findByResetToken,
    updatePassword
};
