import mysql from 'mysql2/promise';

async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DW4class4',
    password: 'Eulogia2020',
    port: 3306
  });
  return connection;
}

export const connection = await connectDB();

