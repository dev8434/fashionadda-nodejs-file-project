import { pool } from '../config/mysql.js';

const create = async (userId, items, amount, address, paymentMethod, payment) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, address, paymentMethod, payment) VALUES (?, ?, ?, ?, ?)',
            [userId, amount, JSON.stringify(address), paymentMethod, payment]
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price]
            );
        }

        await connection.commit();
        return { id: orderId };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const findByUserId = async (userId) => {
    const [orders] = await pool.query('SELECT id, user_id, total_amount as amount, address, paymentMethod, payment, status, created_at, updated_at FROM orders WHERE user_id = ?', [userId]);

    for (let order of orders) {
        const [items] = await pool.query(`
            SELECT oi.*, p.name, p.image 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        `, [order.id]);
        
        order.items = items.map(item => ({
            ...item,
            image: JSON.parse(item.image)
        }));

        try {
            order.address = order.address ? JSON.parse(order.address) : null;
        } catch (error) {
            console.error(`Failed to parse address for order ${order.id}:`, error);
            order.address = null;
        }
    }

    return orders;
};

const findAll = async () => {
    const [orders] = await pool.query('SELECT id, user_id, total_amount as amount, address, paymentMethod, payment, status, created_at, updated_at FROM orders');

    for (let order of orders) {
        const [items] = await pool.query(`
            SELECT oi.*, p.name, p.image 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        `, [order.id]);
        
        order.items = items.map(item => ({
            ...item,
            image: JSON.parse(item.image)
        }));

        try {
            order.address = order.address ? JSON.parse(order.address) : null;
        } catch (error) {
            console.error(`Failed to parse address for order ${order.id}:`, error);
            order.address = null;
        }
    }

    return orders;
};

const updateStatus = async (orderId, status) => {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
};

export default {
    create,
    findByUserId,
    findAll,
    updateStatus
};
