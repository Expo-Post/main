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
    return res.cookie("where", "textpad").render("textpad.ejs", {x: cookieOK});
    // like this?
    // yes but not fully done, got to require the route in index.js
})

module.exports = index; 
//Steal from literally post.js and config.