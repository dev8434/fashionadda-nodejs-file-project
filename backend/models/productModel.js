import { pool } from '../config/mysql.js';

const findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows.map(row => ({
        ...row,
        image: JSON.parse(row.image),
        sizes: JSON.parse(row.sizes)
    }));
};

const findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows[0]) {
        return {
            ...rows[0],
            image: JSON.parse(rows[0].image),
            sizes: JSON.parse(rows[0].sizes)
        };
    }
    return null;
};

const create = async (product) => {
    const { name, description, price, image, category, subCategory, sizes, bestseller, stock } = product;
    const [result] = await pool.query(
        'INSERT INTO products (name, description, price, image, category, subCategory, sizes, bestseller, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, price, JSON.stringify(image), category, subCategory, JSON.stringify(sizes), bestseller, stock]
    );
    return { id: result.insertId, ...product };
};

const update = async (id, product) => {
    const { name, description, price, image, category, subCategory, sizes, bestseller, stock } = product;
    await pool.query(
        'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, subCategory = ?, sizes = ?, bestseller = ?, stock = ? WHERE id = ?',
        [name, description, price, JSON.stringify(image), category, subCategory, JSON.stringify(sizes), bestseller, stock, id]
    );
    return { id, ...product };
};

const remove = async (id) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
};

export default {
    findAll,
    findById,
    create,
    update,
    remove
};
