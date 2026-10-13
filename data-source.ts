import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity.js';


export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'command_pattern_db',
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});