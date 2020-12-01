var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {names: ["bharat", "ram", "shyam"]})
});

router.get("/users/:username", (req, res) => {
  res.render("getUsername", { username: req.params.username})
})

// router.get("/users/register", () => {})



module.exports = router;