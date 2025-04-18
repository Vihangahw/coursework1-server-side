const express = require("express");
const requireUserSession = require("../middleware/sessionAuth");

const router = express.Router();

router.get("/dashboard", requireUserSession, (req, res) => {
    res.json({ message: "Welcome to your dashboard!" });
});

module.exports = router;
