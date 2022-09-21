import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "localhost",
    database: process.env.DATABASE || "micarro",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || ""
};