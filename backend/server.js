const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const tripRoutes = require('./routes/tripRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;

const httpsOptions = {
  key: fs.readFileSync('path/to/your/private.key'),
  cert: fs.readFileSync('path/to/your/certificate.crt'),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
