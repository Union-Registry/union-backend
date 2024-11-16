require('dotenv').config();
const app = require('./src/app');
const { connectWithRetry } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectWithRetry();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});