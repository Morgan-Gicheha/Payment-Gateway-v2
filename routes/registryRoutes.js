const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("registry routes");
});

module.exports = { router };
