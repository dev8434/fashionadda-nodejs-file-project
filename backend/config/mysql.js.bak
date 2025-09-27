import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'e_commerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log("MySQL DB Connected");
  } catch (error) {
    console.error("MySQL DB Connection Error:", error);
    process.exit(1);
  }
};

export { pool };
export default connectDB;
