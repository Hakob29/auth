import { DataSource } from "typeorm"
import * as dotenv from "dotenv" 

dotenv.config();

export const OrmConfig = new DataSource({
    type: "postgres",
    host: process.env.ORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME, 
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ["dist/**/*.entity.js"],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrations: ["dist/**/migrations/*.js"],
    migrationsTableName: "migrations"
});