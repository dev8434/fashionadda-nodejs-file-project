import { DataTypes } from 'sequelize';
import sequelize from '../config/mysql.js';

const Feedback = sequelize.define('Feedback', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Feedback;
