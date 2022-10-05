import mysql from "promise-mysql";
import config from "../config";

/* Creating a connection to the database. */
const connection=mysql.createConnection({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password

});

/**
 * It returns the connection object.
 * @returns The connection object.
 */
const getConnection = ()=>{
    return connection;
};
 module.exports = {
    getConnection

};