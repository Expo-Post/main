const express = require('express');

const index = express.Router();

index.get('/create', (req, res, next) => { //This becomes /post/create
    
})
module.exports = index;