const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  logRequest(parsedUrl.pathname);
  if (parsedUrl.pathname === "/documentation") {
    fs.readFile("documentation.html", (error, content) => {
      if (error) {
        response.writeHead(500);
        response.end("Internet Server Error");
      } else {
        response.writeHead(200, { "Content-type": "text/html" });
        response.end(content);
      }
    });
  } else {
    fs.readFile("index.html", (error, content) => {
      if (error) {
        response.writeHead(500);
        response.end("Internal Server Error");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(content);
      }
    });
  }
});

function logRequest(url) {
  let timestamp = new Date();
  let string = `
URL: ${url}
Timestamp: ${timestamp}`;
  fs.appendFile("log.txt", string, function (error) {
    if (error) {
      console.log(error);
    }
  });
}

const port = 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
