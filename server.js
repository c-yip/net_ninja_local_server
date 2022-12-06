// Localhost is like a domain name on web but points directly back to your own computer
// So, browser is connecting back to own computer that is acting as a host for our website

// http module required
const http = require("http");
const fs = require("fs");

// creates server, two objects, req, res
const server = http.createServer((req, res) => {
  // callback function called every time server request
  console.log(req.url, req.method);

  // sending responses
  // set header content type > writing content > ending the response which then sends to browser
  res.setHeader("Content-Type", "text/html");

  // routing
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // sending html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

// Port numbers are like "doors" into a computer through which internet communications can be made to different programs
// Our website needs its own port number, common one is 3000 for web dev

// listening for request
server.listen(3000, "localhost", () => {
  // fires when we start listening
  console.log("listening for requests on port 3000");
});
