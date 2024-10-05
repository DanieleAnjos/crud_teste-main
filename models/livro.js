import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Livro = sequelize.define('Livro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponibilidade: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Livro;
