import { config } from "dotenv"

/* Setting up the database connection. */
config()

export default {
    host: process.env.HOST || "localhost",
    database: process.env.DATABASE || "micarro",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || ""
};