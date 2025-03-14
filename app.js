const express = require('express');
const app = express();

const { getElementById, getIndexById, updateElement,
  seedElements, createElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const expressionsRouter = require('./expressions.js');
app.use('/expressions', expressionsRouter);

const animalsRouter = require('./animals.js');
app.use('/animals', animalsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
