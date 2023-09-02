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

//set up logger
app.use(morgan("combined", { stream: accessLogStream }));

//GET with "/movie endpont"
//returns JSON topMovies

app.get("/movies", (req, res) => {
  const topMovies = [
    { title: "Aliens", year: "1986" },
    { title: "Star Wars: Episode IV - A New Hope", year: "1977" },
    { title: "Terminator 2: Judgment Day", year: "1991" },
    { title: "The Matrix", year: "1999" },
    { title: "Inception", year: "2010" },
    { title: "Dark Knight", year: "2008" },
  ];
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to the movie club!");
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broken!");
});
