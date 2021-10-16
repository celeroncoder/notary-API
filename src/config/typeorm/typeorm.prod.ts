import { Users } from "src/users/entities/users.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const typeOrmProdOptions: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    entities: [Users],
    synchronize: false,
    migrations: ["dist/src/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations",
    },
    ssl: {
        rejectUnauthorized: false,
    },
};

export default typeOrmProdOptions;
