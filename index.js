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
if (dev == true) {
    const home_file = "dev.html";
} else {
    const home_file = "index.html";
}


 
app.use(express.static(path.join(__dirname, 'files/js'))); 

app.get('/', function (req, res, next) {
    try {
        var query = req.query;
        if (query.github == "true") {
            res.redirect("https://github.com/Expo-Post/main");
        }
    } catch(err) {/* Do nothing */}

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
