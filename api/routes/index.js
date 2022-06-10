const express = require("express");
const router = express.Router();
const tweetsRouter = require("./tweets");
const usersRouter = require("./users");

router.use("/tweets", tweetsRouter)
router.use("/users", usersRouter)

module.exports = router;