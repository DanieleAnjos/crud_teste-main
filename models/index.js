import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('biblioteca_db', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql' 
  });

export { sequelize };
