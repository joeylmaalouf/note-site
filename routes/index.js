var mongoose = require("mongoose");
var chance = require("chance").Chance();

var Notepad = mongoose.model("Notepad", mongoose.Schema({
  "id": {type: String, required: true},
  "text": {type: String, required: true},
  "password": {type: String, default: ""},
  "locked": {type: Boolean, default: false}
}), "notepads");

var routes = {};

routes.home = function (req, res) {
  res.redirect("/" + chance.string({"length": 8, "pool": "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}));
};

routes.id = function (req, res) {
  Notepad.findOne(
    {id: req.params.id},
    function (err, notepad) {
      if (!notepad.text) {
        notepad.text = "Welcome to your new online notepad!\n\nWhatever you type here will be persistent for this notepad, specified by the ID in the URL.\nThis pad's ID is " + req.params.id + ".\nMake sure to always hit that \"Save\" button at the top of the page!\nYou can also enter your own custom ID in the URL!\n";
      }
      res.render("notepad", {
        "notepad": notepad,
        "layout": false
      });
    });
};

routes.setlock = function (req, res) {
  Notepad.findOne(
    {id: req.body.id},
    function (err, notepad) {
      if (err) {
        res.status(500).send(err);
      }
      else if (notepad && (req.body.password == notepad.password)) {
        notepad.locked = req.body.locked;
        notepad.save(function (err, notepad) {
          if (err) { res.status(500).send(err); }
          else { res.json(req.body); }
        });
      }
      else {
        res.status(401).send(err);
      }
    });
};

routes.updatepass = function (req, res) {
  Notepad.findOneAndUpdate(
    {"id": req.body.id},
    {"password": req.body.password},
    {"upsert": true},
    function (err, notepad) {
      if (err) { res.status(500).send(err); }
      else { res.json(req.body); }
    });
};

routes.savetext = function (req, res) {
  Notepad.findOneAndUpdate(
    {"id": req.body.id},
    {"text": req.body.text},
    {"upsert": true},
    function (err, notepad) {
      if (err) { res.status(500).send(err); }
      else { res.json(req.body); }
    });
};

module.exports = routes;
