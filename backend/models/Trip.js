const db = require('../config/db')();

const createTripTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS trips (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      destination VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createTripTable();

const createTripParticipantsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS trip_participants (
      trip_id INT NOT NULL,
      user_id INT NOT NULL,
      PRIMARY KEY (trip_id, user_id),
      FOREIGN KEY (trip_id) REFERENCES trips(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  await db.query(query);
};

createTrip
