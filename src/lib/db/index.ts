import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schemas";

const sql = createPool(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema, mode: "planetscale"});
