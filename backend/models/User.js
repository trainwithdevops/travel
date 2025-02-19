const db = require('../config/db')();

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      destination VARCHAR(255),
      budget VARCHAR(255),
      currency VARCHAR(255),
      language VARCHAR(255)
    )
  `;
  await db.query(query);
};

createUserTable();

module.exports = db;
