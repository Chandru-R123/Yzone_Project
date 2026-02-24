import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

const runSQLFile = async (filePath: string) => {
  const sql = fs.readFileSync(filePath, "utf-8");

  try {
    await pool.query(sql);
    console.log(`${path.basename(filePath)} executed successfully`);
  } catch (err) {
    console.error(`Error executing ${path.basename(filePath)}:`, err);
  }
};

(async () => {
  try {
    const facilitatorSchemaPath = path.join(
      __dirname,
      "../modules/facilitator/facilitator.schema.sql"
    );

    const executiveSchemaPath = path.join(
      __dirname,
      "../modules/tynExecutive/tynExecutive.schema.sql"
    );

    await runSQLFile(facilitatorSchemaPath);
    await runSQLFile(executiveSchemaPath);

  } catch (error) {
    console.error("Error initializing schemas:", error);
  }
})();