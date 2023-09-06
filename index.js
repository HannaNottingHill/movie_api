const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3030;

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

const movies = [
  {
    title: "The Best of Me",
    description: "Description of Movie",
    genre: "Genre",
    director: "Director",
    imageUrl: "URL 1",
  },
  {
    title: "Equalizer",
    description: "Description of Movie",
    genre: "Genre",
    director: "Director",
    imageUrl: "URL 2",
  },
  {
    title: "Inception",
    description: "Description of Movie",
    genre: "Genre",
    director: "Director",
    imageUrl: "URL 3",
  },
  {
    title: "The Godfather",
    description: "Description of Movie ",
    genre: "Genre",
    director: "Director",
    imageUrl: "URL 4",
  },
  {
    title: "Die Hard",
    description: "Description of Movie ",
    genre: "Genre",
    director: "Director",
    imageUrl: "URL 5",
  },
];
//set up logger
app.use(morgan("combined", { stream: accessLogStream }));

//Get a list of ALL movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

//Get data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.name;
    })
  );
});

//Get data about genre by title
app.get("/movies/:title/:genre", (req, res) => {
  res.send("Successful GET request returning data on genre");
});

//Get data about the director by name
app.get("/directorNames", (req, res) => {
  res.send("Successful GET request returning data on director");
});

//Add a new user !!
app.post("/users", (req, res) => {
  res.send("Successful POST request, new user successfully created");
});

//Update a user information (username)
app.put("/users", (req, res) => {
  res.send("Successful PUT, information successfully updated");
});

//Add a movie to a favorites list
app.put("/users/:favorite", (req, res) => {
  res.send("Successful PUT request, favorite added");
});

//Remove a movie from the favorites list
app.delete("/users/:favorite", (req, res) => {
  res.send("Successful DELETE request, favorite removed");
});

//Remove users account
app.delete("/users", (req, res) => {
  res.send("Successful DELETE request, account deleted");
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broken!");
});
