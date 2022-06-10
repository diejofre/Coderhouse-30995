const express = require("express");
const usersRouter = express.Router();
const tweetBank = require("../tweetBank");

usersRouter.get("/:name", (req, res) => {
  const tweets = tweetBank.findAllMatch(req.params.name);
  res.send(tweets);
});

module.exports = usersRouter;

