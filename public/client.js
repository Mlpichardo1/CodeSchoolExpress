/*global $ */
$(function(){
  $.get('/cities', appendToList); 

  function appendToList(cities) {
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i];
      content = '<a href="cities/' +city+' ">'+city+'</a> ' + 
      '<a href="#" data-block="'+city+'"><img src="del.jpg"></a>';
      list.push($('<li>', { html: content }));
    }
    $('#city').append(list);

  }
  
  $('form').on('submit', function(event) {
      event.preventDefault();
      var form = $(this);
      var blockData = form.serialize();
      
  $.ajax({
      type: 'POST', url: '/cities', data: blockData
  }).done(function(cities){
      appendToList([cities]);
      form.trigger('reset');
      console.log(cities);
  });
 });
});

