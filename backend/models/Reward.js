const db = require('../config/db')();

const createRewardTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS rewards (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      badge VARCHAR(255) NOT NULL,
      points INT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createRewardTable();

module.exports = db;
