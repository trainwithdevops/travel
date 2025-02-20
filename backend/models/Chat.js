const db = require('../config/db')();

const createChatTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS chats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      room_id INT NOT NULL,
      message TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createChatTable();

module.exports = db;
