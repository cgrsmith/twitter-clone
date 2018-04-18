const express = require("express");
const router = express.Router();

//Require  user model authentication methods
const {signup, signin} = require("../handlers/auth");

//routes prefixed with /api/auth
router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;