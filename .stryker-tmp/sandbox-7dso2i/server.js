// @ts-nocheck

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskManager')

  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  console.log(`Connecting to MongoDB using URI: [${process.env.MONGO_URI}]`);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Prevents multiple servers in test mode
if (require.main === module || process.env.FORCE_LISTEN === 'true') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

console.log(`✅ Server ready at http://localhost:${PORT}`);

module.exports = { app };
