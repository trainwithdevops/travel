const db = require('../config/db')();

const createBudgetTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS budgets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      trip_id INT NOT NULL,
      item VARCHAR(255) NOT NULL,
      cost DECIMAL(10, 2) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trip_id) REFERENCES trips(id)
    )
  `;
  await db.query(query);
};

createBudgetTable();

module.exports = db;
