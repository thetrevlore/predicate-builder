const express = require('express');
const app = express();

app.use(express.json({ type: 'application/json', strict: false }));

app.post('/api/query', (req, res) => {
  console.log('req.body ->', req.body);
  res.status(200).end();
});

app.listen(5000, console.log('Server running on port 5000'))