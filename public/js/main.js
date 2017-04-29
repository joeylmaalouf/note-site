var setlock = function (id, locked) {
  $.post("/setlock", {
    "id": id,
    "locked": locked,
    "password": $("#password").val()
  }).done(function (data, status) {
    location.reload(true); // maybe?
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var updatepass = function (id) {
  $.post("/updatepass", {
    "id": id,
    "password": $("#password").val()
  }).done(function (data, status) {
    // nothing to do here
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var savetext = function (id) {
  $.post("/savetext", {
    "id": id,
    "text": $("#notepad").val()
  }).done(function (data, status) {
    // nothing to do here
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
