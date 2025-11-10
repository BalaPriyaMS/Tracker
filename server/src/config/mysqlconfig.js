import mysql from "mysql2";
import { logger } from "../common/logger.js"
import dotenv from "dotenv"
dotenv.config()

const connectionconfig = {
    connectionLimit: 2,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    debug: false
};
logger.info( process.env.SQL_USER)
export const mysqlpool = mysql.createPool(connectionconfig);

mysqlpool.getConnection((err, connection) => {
    if (err){
        logger.info(`Database connection failed:${err.stack}`);

        return
    }
    logger.info("Database connected successfully");
    connection.release();
});

export function queryReturn(queryToRun, queryArg = []) {
    return new Promise((resolve, reject) => {
        mysqlpool.query(queryToRun, queryArg, (err, results) => {
            if (err) {
                logger.error("Query Run Error:", err);
                return reject(err);
            }
            logger.info("Query ran successfully");
            resolve(results);
        });
    });
}

