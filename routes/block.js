var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
  'Providence': 'RI', 
  'Bronx': 'NY',
  'Miami': 'FL',
  'Oakland': 'CA',
  'Boston': 'MA'
};

router.route('/')

.get(function(request, response) {
  if(request.query.limit >= cities.length) {
    response.status(404).json('Error: limit may not exceed' + cities.length);
  } if (request.query.limit > 0){
     response.json(cities.slice(0, request.query.limit));
  } else {
      response.json(Object.keys(cities));
  }
})

// VALIDATION
.post(parseUrlencoded, function (request, response) {
  var newCity = request.body;
  if (newCity.name.length >= 4 && newCity.description.length >= 2){
  cities[newCity.name] = newCity.description
  response.status(201).json(newCity.name);
  } else {
    response.status(400).json('Invalid City and State');
  }
})

router.route('/:name')

.all(function(request, response, next) {
  var name = request.params.name;
  var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
  request.cityName = city;
  next();
})

.get(function(request, response) {
  var description = cities[request.cityName];
    if(!description) {
      response.status(404).json('No description found for ' + request.cityName);
      console.log(description);
    } else {
      response.json(description);
    }
})

// Delete route
.delete(function (request, response) {
delete cities[request.cityName];
    response.status(200);
})


module.exports = router;
