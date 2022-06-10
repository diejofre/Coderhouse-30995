const express = require("express");
const tweetsRouter = express.Router();
const tweetBank = require("../tweetBank");

tweetsRouter.get("/", (req, res) => {
  const tweets = tweetBank.list();
  res.send(tweets);
});

tweetsRouter.post("/", (req, res) => {
  const { name, content, imgURL } = req.body;
  const tweet = tweetBank.add(name, content, imgURL);
  res.status(201).send(tweet);
});

tweetsRouter.get("/:id", (req, res) => {
  const tweet = tweetBank.findOne(Number(req.params.id));
  res.send(tweet);
});

tweetsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const tweet = tweetBank.findOne(id);
  tweetBank.remove(id);
  res.status(202).send(tweet);
});

tweetsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const content  = req.body.content;
  tweetBank.update(id, content);
  res.sendStatus(200);
});

module.exports = tweetsRouter;
