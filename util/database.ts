import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

/**
 * The standard SQL operator.
 */
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default sql;
