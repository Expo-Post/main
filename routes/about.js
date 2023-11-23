const express = require('express');

const index = express.Router();

index.get('/', (req, res, next) => { //This becomes /about
    var cookies = req.cookies;
    var cookieOK = 0;
    try {
        cookieOK = cookies.cookieOK;
    } catch(err) {}
    if (cookieOK == undefined || cookieOK == null) {
        cookieOK = 0;
        res.cookie("cookieOK", 0);
    }
    return res.cookie("where", "about").render("about.ejs", {x: cookieOK});
})

module.exports = index;