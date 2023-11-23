const express = require('express');

const index = express.Router();

index.get('*', (req, res, next) => {
    var cookies = req.cookies;
    var cookieOK = 0;
    try {
        cookieOK = cookies.cookieOK;
    } catch(err) {}
    if (cookieOK == undefined || cookieOK == null) {
        cookieOK = 0;
        res.cookie("cookieOK", 0);
    }
    return res.cookie("error", "Not Found").cookie("where", "404").render("404.ejs", {x: cookieOK});
})
module.exports = index;