const express = require('express');
const posts = require("./data.js");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.get('/api/posts', (req, res) => res.json(posts))

app.listen(port, () => console.log(`http-backend listening on port ${port}!`))