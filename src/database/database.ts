import util from 'util';
import mysql from 'mysql';

function makeDb(config: string | mysql.ConnectionConfig) {

    console.info('process.env.DB_PASSWORD was ' + process.env.MYSQL_PASSWORD + ' set')
    const connection = mysql.createConnection(config);

    return {
        query(sql: string | mysql.QueryOptions): Promise<unknown> {
            return util.promisify(connection.query).call(connection, sql);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}

export const database = makeDb({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    port: 3306,
    database: process.env.MYSQL_DATABASE!,
    insecureAuth: true,
});

