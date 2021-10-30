var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");


router.get("/", function (req, res) {
  var date = new Date();
  fs.writeFileSync("time/currentDateTime.txt", `${date}`);

  const data = fs.readFileSync("time/currentDateTime.txt", "utf-8");
  res.send("Current date and time is " + `${data}`);
});

router.get("/text-files", function (req, res) {
  const data = fs.readdirSync("time");
  var files = [];
  for (i = 0; i < data.length; i++) {
    if (path.extname(data[i]) === ".txt") {
      files.push(data[i]);
    }
  }
  if (files) {
    res.json({ message: files });
  } else {
    res.send({
      message: "No text file present in the folder",
    });
  }
});

module.exports = router;
