const express = require('express');

const index = express.Router();

index.get('*', (req, res, next) => {
    return res.cookie("error", "Not Found").render("404.ejs");
})
module.exports = index;