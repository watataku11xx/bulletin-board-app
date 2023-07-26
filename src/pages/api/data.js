require('dotenv').config()
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
  } else {
    console.log('success');
  }
});

export default function handler(req, res) {
  connection.query(
    'SELECT * FROM users;',
    (error, results) => {
        console.log(results);
        res.status(200).json(results);
    }
  );
}
