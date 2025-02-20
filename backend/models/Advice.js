const db = require('../config/db')();

const createAdviceTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS advice (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createAdviceTable();

module.exports = db;
