import dotenv from "dotenv";
import app from "./app";
import { pool } from "./config/db";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

// Start server only after DB connects
pool.connect()
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("❌ Database connection failed:", error.message);
    } else {
      console.error("❌ Database connection failed:", error);
    }

    process.exit(1);
  });