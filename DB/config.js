const mysql = require('mysql2/promise')
require('dotenv').config({path:'config/.env.DB'});
const logger = require('winston')

const TAG_SUCCESS = 'Create Pool Success!';
const TAG_PROTOCOL_CONNECTION_LOST = 'Database connection was closed.';
const TAG_ER_CON_COUNT_ERROR = 'Database has too many connections.';
const TAG_ECONNREFUSED = 'Database connection was refused.';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB,
    connectionLimit: 50
});

logger.info(TAG_SUCCESS);

exports.connection = async function () {
    const connection = await pool.getConnection(async (conn) => conn)
    try {
        return connection;
    } catch (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                logger.error(TAG_PROTOCOL_CONNECTION_LOST)
                break
            case 'ER_CON_COUNT_ERROR':
                logger.error(TAG_ER_CON_COUNT_ERROR)
                break
            case 'ECONNREFUSED':
                logger.error(TAG_ECONNREFUSED);
                break;
        }
    }
}