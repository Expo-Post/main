//import userdb from './src/db/userdb';
//import messagesdb from './src/db/messagesdb';

var express = require('express');

const app = express();
const cors = require('cors')

app.use(cors())
app.set('view engine', 'ejs');

var path = require('path');

var config = require('./src/config/config.js');
var config = config.config; 

const PORT = config.PORT;
const dev = config.DEV;
const home_file = dev ? "indexDev.ejs" : "indexActive.ejs";
 
app.use(express.static(path.join(__dirname, 'files/js'))); 

app.get('/', function (req, res, next) {
    try {
        var query = req.query;
        if (query.github == "true") {
            res.redirect("https://github.com/Expo-Post/main");
        }
    } catch(err) {/* Do nothing */}

    res.render(home_file);
})

app.all("*", function (req, res, next) {
    if(dev == true) {
        res.redirect("/");
        return;
    } else {
        next();
    }
})

app.get("/index.html", (req, res, next) => {
    res.redirect('/');
    return;
})

app.all("/index.html", (req, res, next) => {
    res.json('{"active":false');
    return
})

app.all("*", (req, res, next) => {
    //res.redirect("/")
    res.render("404.ejs")
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
