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
    const schemas = [
      "../modules/facilitator/facilitator.schema.sql",
      "../modules/tynExecutive/tynExecutive.schema.sql",
      "../modules/facultyPrincipal/facultyPrincipal.schema.sql",
      "../modules/industryMentor/industryMentor.schema.sql",
      "../modules/student/student.schema.sql" // optional
    ];

    for (const schemaPath of schemas) {
      const fullPath = path.join(__dirname, schemaPath);
      await runSQLFile(fullPath);
    }

    console.log("All schemas initialized successfully");

  } catch (error) {
    console.error("Error initializing schemas:", error);
  }
})();