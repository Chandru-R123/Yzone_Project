import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432
});

const runSQLFile = async (filePath:any) => {
  const sql = fs.readFileSync(filePath).toString();
  try {
    await pool.query(sql);
    console.log(`${path.basename(filePath)} executed successfully`);
  } catch (err) {
    console.error(`Error executing ${path.basename(filePath)}:`, err);
  }
};

// Run at server startup
(async () => {
  await runSQLFile(path.join("C:/Users/acer/Documents/yzone/yzone app docs/Yzone_App/Backend/src/modules/facilitator/facilitator.schema.sql"));
})();