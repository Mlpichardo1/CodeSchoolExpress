/*global $ */
$(function(){
  $.get('/cities', appendToList); 

  function appendToList(cities) {
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i];
      content = '<a href="cities/' +city+' ">'+city+'</a> ' + 
      '<a href="#" data-block="'+city+'"><img src="del.jpg" width="20"></a>';
      list.push($('<li>', { html: content }));
    }
    $('#city').append(list);
    $('#city').on('click', 'a[data-block]', function(event) {
      if(!confirm('Are you sure?')) {
        return false;
      }
      
      var target = $(event.currentTarget);
      
      $.ajax({
        type: 'DELETE', url: '/cities/' + target.data('city')
      }).done(function() {
        
      });
       target.parents('li').remove();
       console.log(city);
    });
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

