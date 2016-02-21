var mongoose = require("mongoose");
var chance = require("chance").Chance();

var Notepad = mongoose.model("Notepad", mongoose.Schema({
  "id": String,
  "text": String
}));

var routes = {};

routes.home = function (req, res) {
  res.redirect("/" + chance.string({"length": 8, "pool": "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}));
};

routes.new = function (req, res) {
  Notepad.findOne(
    {id: req.params.id},
    function (err, notepad)
    {
      var text = notepad ? notepad.text : "Welcome to your new online notepad!\n\nWhatever you type here will be persistent for this notepad,\nspecified by the ID in the URL. This pad's ID is "+req.params.id+".\nJust make sure to always hit that \"Save\" button at the top of the page!\nYou can also enter your own custom (alphanumeric) ID in the URL!\n";
      res.render("notepad", {"notepad": {"id": req.params.id, "text": text}, "layout": false});
    });
};

routes.save = function (req, res) {
  Notepad.findOneAndUpdate(
    {"id": req.body.id},
    {"text": req.body.text},
    {"upsert": true},
    function (err, notepad) {
      if (err) { res.status(500).send("Error saving notepad: " + err); }
      else { res.json(req.body); }
    });
};

module.exports = routes;
