const express = require("express");
const mongoose = require("mongoose");
const Movie = require('./models/movie');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://db/vidly' , { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.log);

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

app.post('/movies', async (req, res) => {
  if (!req.body.title) return res.status(400).send('Title is required.');
  
  const movie = new Movie({ title: req.body.title });
  await movie.save();
  res.send(movie);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
