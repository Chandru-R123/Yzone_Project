import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
<<<<<<< HEAD
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
=======
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("Loaded DB_PASSWORD:", process.env.DB_PASSWORD);

if (!process.env.DB_PASSWORD) {
  throw new Error("❌ DB_PASSWORD is missing in .env file");
}

export const pool = new Pool({
>>>>>>> 344fe00 (hello)
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
<<<<<<< HEAD
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
=======
  port: Number(process.env.DB_PORT),
});


// Test connection
pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed:", err);
  });
>>>>>>> 344fe00 (hello)
