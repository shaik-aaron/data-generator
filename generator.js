import mysql from "mysql2";
import Chance from "chance";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "shaikaaron",
  password: process.env.DB_PASSWORD,
  database: "users_database",
});

const connection = pool.promise();

const tempData = [];

for (let i = 0; i < 50; i++) {
  let chance = new Chance();
  tempData.push([
    chance.name(),
    chance.age(),
    chance.birthday({ string: true, american: false }),
  ]);
}

const sql = "INSERT INTO users (name,age,dob) VALUES ?";

const [rows, fields] = await connection.query(sql, [tempData]);
console.log("Records added: ", rows.affectedRows);
