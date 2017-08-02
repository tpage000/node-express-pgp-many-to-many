// dependencies
const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const pe         = require('pretty-error').start();
const app        = express();

// config
const PORT       = process.env.PORT || 3000;

// controllers
const booksController = require('./controllers/books');
const notesController = require('./controllers/notes');
const tagsController = require('./controllers/tags');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/books', booksController);
app.use('/notes', notesController);
app.use('/tags', tagsController);

// root
app.get('/', (req, res) => {
  res.send('books API');
});

// listener
app.listen(PORT, () => console.log('Running on port: ', PORT));

