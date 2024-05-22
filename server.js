// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

let salaries = [];

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'build'))); // Serve frontend build files if any

// Load CSV data
fs.createReadStream('salaries.csv')
  .pipe(csv())
  .on('data', (data) => salaries.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// API endpoint
app.get('/api/salaries', (req, res) => {
  res.json(salaries);
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
