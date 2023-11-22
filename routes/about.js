const express = require('express');

const index = express.Router();

index.get('/', (req, res, next) => { //This becomes /about
    res.render('./about.ejs')
})

module.exports = index;