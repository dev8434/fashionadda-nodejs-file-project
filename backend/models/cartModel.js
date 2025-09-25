import { pool } from '../config/mysql.js';

const getCartByUserId = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
    return rows[0];
};

const createCart = async (userId) => {
    const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    return { id: result.insertId, user_id: userId };
};

const getCartItems = async (cartId) => {
    const [rows] = await pool.query(
        `SELECT ci.*, p.name, p.image, p.price as product_price
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.id
         WHERE ci.cart_id = ?`,
        [cartId]
    );
    return rows.map(row => ({
        ...row,
        image: JSON.parse(row.image)
    }));
};

const upsertCartItem = async (cartId, productId, quantity, unitPrice, size) => {
    await pool.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, size)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = ?`,
        [cartId, productId, quantity, unitPrice, size, quantity]
    );
};

const removeCartItem = async (cartId, productId, size) => {
    await pool.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?', [cartId, productId, size]);
};

const clearCartItems = async (cartId) => {
    await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
};

export default {
    getCartByUserId,
    createCart,
    getCartItems,
    upsertCartItem,
    removeCartItem,
    clearCartItems
};
