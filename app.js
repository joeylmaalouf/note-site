var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var index = require("./routes/index");

var app = express();
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var mongoURI = process.env.MONGOURI || "mongodb://localhost/notepad-site";
mongoose.connect(mongoURI);

app.get("/", index.home);
app.get("/:id", index.new);
app.post("/save", index.save);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() { console.log("Application running on port", PORT); });

// not yet successfully hosted on http://???.herokuapp.com/
// mongodb://noteusername:notepassword@ds041432.mongolab.com:41432/notepad-site
// put hosted link in readme
