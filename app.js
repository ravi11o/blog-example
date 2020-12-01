// requires
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');



// connect to db
mongoose.connect(
  "mongodb://localhost:27017/blog",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("Connected", err ? err : true);
  }
);

// instantiate express app
var app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routing middlewares
app.use("/", require("./routes/index"));
app.use("/articles", require("./routes/articles"))

// 404 error
app.use((req, res, next) => {
  res.status(404).send('Page Not Found')
})

// custom error handler
app.use((err, req, res, next) => {
  res.json(err);
})

// listener
app.listen(4000, () => {
  console.log("server is listenng on port 4k")
})