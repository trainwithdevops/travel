const db = require('../config/db')();

const createFeedbackTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      feedback TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createFeedbackTable();

module.exports = db;
