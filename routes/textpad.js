const express = require('express');

const index = express.Router();

index.get('/', (req, res, next) => { //This becomes /about
    res.render('./textpad.ejs')
    // like this?
    // yes but not fully done, got to require the route in index.js
})

module.exports = index; 
//Steal from literally post.js and config.