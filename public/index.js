/*global $ */

$(function(){

  $.get('/cities', appendToList); 

  function appendToList(cities) {
    var list = [];
    for(var i in cities){
      list.push($('<li>', { text: cities[i] }));
    }
    $('#city').append(list);
  }
});

// $(document).ready(function () {
//   $.ajax({
//   url: "test.html",
//   context: document.body
// }).done(function() {
//   $( this ).addClass( "done" );
// });
// });
