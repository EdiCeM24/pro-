import { Sequelize } from 'sequelize';
// import { PostgresDialect } from 'sequelize/postgres';

import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT, } from '../config/env.js';


const sequelize = new Sequelize({
  dialect: 'postgres',
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  ssl: true,
  clientMinMessages: 'notice',
});

export default sequelize;
