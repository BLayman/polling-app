$(document).ready(function() {

  function fillIn(data) {

      $(".hill").html(data.hillStat);
      $(".bern").html(data.bernStat);
      $(".trump").html(data.trumpStat);
      $(".cruz").html(data.cruzStat);
  }

$("form").on("submit", function(event) {
  event.preventDefault();
var form = $(this);
var serForm = form.serialize();
console.log(serForm);
$.ajax({
  type:"POST", url:"/results", data:serForm
}).done(function (res) {
console.log(res);
fillIn(res);
  form.trigger('reset');
  $(".button").hide();
  $(".results").show();
});
});

$.get('/results', fillIn);

});
