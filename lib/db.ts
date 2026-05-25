import mysql from "mysql2/promise";

// MySQL 연결 풀 생성 (앱 전체에서 공유)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
