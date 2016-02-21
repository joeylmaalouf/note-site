var save = function (id) {
  $.post("/save", {
    "id": id,
    "text": $("#notepad").val()
  }).done(function (data, status) {
    // nothing to do here
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
