import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_DATABASE || "ejercicio1",
  password: process.env.DB_PASSWORD || "",
  port: 3306,
  connectionLimit: 10,
  queueLimit: 0,
});

const verificarConexion = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado exitosamente a la base de datos");
    connection.release();
  } catch (error: any) {
    console.error("Error al conectarse con la base de datos");
  }
};

verificarConexion()

export default pool
