const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js/models");

const port = process.env.PORT || 3000;

const Movies = Models.Movie;
const Users = Models.User;
const Genre = Models.Genre;
const Director = Models.Director;

//const path = require("path");
//const { Model } = require("mongoose");

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// log request to server
app.use(morgan("common"));

//default text response when at /
app.get("/", (req, res) => {
  res.send("Welcome to MoviesApp!");
});

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

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
app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Get all users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
