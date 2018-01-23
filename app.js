var express = require('express')
var app = express();

app.use(express.static('public')); //MIDDLEWARE
// EXPRESS Level 3
var cities = ['Providence', 'Warwick', 'Lincoln', 'Cranston', 'Johnston'];
app.get("/cities", function(request, response) {
  if(request.query.limit >= 0) {
    response.json(citySearch.slice(0, request.query.limit));
  } else if (request.query.limit > 5){
     response.status(404).json
  } else {
       response.json(cities);
  }
});

function citySearch (keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.params.name];
    if(cities[request.params.name]) {
      response.json(cityInfo);
    } else {
      response.status(404).json("City not found");
    }
});

app.listen(process.env.PORT);