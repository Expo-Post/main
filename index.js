//import userdb from './src/db/userdb';
//import messagesdb from './src/db/messagesdb';

var express = require('express');

const app = express();

var path = require('path');

var config = require('./src/config/index.json');

const PORT = config.PORT;
const home_file = config.INDEX;
const dev = config.DEV;


 
app.use(express.static(path.join(__dirname, 'files/js'))); 

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, `./files/html/${home_file}`));
})

app.all("*", function (req, res, next) {
    if(dev == true) {
        res.redirect("/");
        return;
    } else {
        next();
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
