const express = require('express');
const passport = require('passport');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => 'Server started!');
