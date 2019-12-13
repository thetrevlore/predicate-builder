const express = require('express');
const app = express();

app.use(express.json({ type: 'application/json', strict: false }));

app.post('/api/query', (req, res) => {
  const queryRows = req.body;
  let query = "SELECT * FROM session WHERE\n";
  for (let i = 0; i < queryRows.length; i++) {
    let row = queryRows[i];
    query += `  ${row.attribute} ${row.operator} ${row.userInput}`;
    query += i !== queryRows.length - 1 ? "\nAND\n" : "";
  }
  console.log('--query--')
  console.log(query)
  res.status(200).send({ query: query });
});

app.listen(5000, console.log('Server running on port 5000'))