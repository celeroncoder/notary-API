import { Users } from "src/users/entities/users.entity";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const typeOrmDevOptions: MysqlConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "notary-db",
    synchronize: true,
    logging: false,
    entities: [Users],
};

export default typeOrmDevOptions;
