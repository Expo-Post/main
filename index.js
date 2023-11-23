/*
Hints:
Creating a new ejs file with its own route.

Steal the code from post.js into a new file.
Edit 'post.ejs' to your new .ejs file.
Return here, find "//Routers"
require your new route.
go towards bottom with other "app.use(...)"
app.use('/<where?>, route); //Route being your newly required route and where being /x. eg: /x, x
------------------------------

*/

var express = require('express');

const app = express(); //Create app
const cors = require('cors') //Allow Cors

app.use(cors()) //Enable Cors
const cookieParser = require('cookie-parser');
app.use(cookieParser()); //Enable Cookies

app.set('view engine', 'ejs'); //Render EJS

var path = require('path'); //Create ways to send files/

var config = require('./src/config/config.js'); // Retrieve config
var config = config.config; // Get config

const PORT = config.PORT; //Init PORT
const dev = config.DEV; // Init DEV mode
const home_file = dev ? "indexDev.ejs" : "indexActive.ejs"; //home_file to dev/active in dev mode.
 
//app.use(express.static(path.join(__dirname, 'files/js'))); TODO: Make sure this gets pushed to the API section.


//Routers.
const post = require('./routes/post.js');
const about = require('./routes/about.js');
const textpad = require("./routes/textpad.js");
const fourofour = require('./routes/404.js');

app.all("*", function (req, res, next) {
    // Check to see if in dev mode
    // how is dev mode activated?
    // query parameter?
    // Config. (./src/config/config.js [dev])
    if(dev == true) { //If yes, go back. Server is 'in development mode'
        res.render(home_file);
        return;
    } else {
        next(); //Else, continue on.
    }
})

app.get('/', function (req, res, next) { //Main, does not need router.
    try {
        var query = req.query;
        if (query.github == "true") {
            res.redirect("https://github.com/Expo-Post/main");
        }
    } catch(err) {/* Do nothing */} //TODO: Check err against 'params are missing' vs req error itself. [Optional]
    var cookies = req.cookies;
    var cookieOK = 0;
    try {
        cookieOK = cookies.cookieOK;
    } catch(err) {}
    if (cookieOK == undefined || cookieOK == null) {
        cookieOK = 0;
        res.cookie("cookieOK", 0);
    }
    return res.cookie("where", "undefined").render(home_file, {x: cookieOK});
})

app.get("/index.html", (req, res, next) => { //Also doesnt need router.
    res.redirect('/');
    return;
})

app.use('/post', post);
app.use('/about', about);
app.use('/textpad', textpad);
app.use('*', fourofour); //404 handeler.

app.listen(PORT, function (err) { //Launch server.
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);

});
