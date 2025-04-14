const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public')); // Serve static files

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});