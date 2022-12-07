const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// to secure username and pass
const dotenv = require("dotenv");
const { render } = require("ejs");
dotenv.config();

// express app
const app = express();
// connect to mongodb
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9stild4.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) // listen for requests

  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // accepts form data
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page, must be at bottom
app.use((req, res) => {
  res.status(404).render("404", { title: 404 });
});
