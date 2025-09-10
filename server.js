const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint untuk mengunduh file
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public', filename);

  console.log(`Mencoba mengirim file: ${filePath}`);

  // Mengirim file ke user
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error mengirim file:", err);
      if (!res.headersSent) {
        res.status(404).send('File tidak ditemukan!');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});