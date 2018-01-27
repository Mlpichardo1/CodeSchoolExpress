var express = require('express')
var app = express();
var logger = require('./logger');
app.use(logger);

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public')); //MIDDLEWARE
// EXPRESS Level 5
var blocks = require('./routes/block');
app.use('/cities', blocks);

var cities = {
  'Providence': 'RI', 
  'Bronx': 'NY',
  'Miami': 'FL',
  'Oakland': 'CA',
  'El Paso': 'TX'
};

app.get('/cities/:name', function (request, response) {
  var description = cities[request.params.name];
    if(!description) {
      response.status(404).json('No description found for ' + request.params.name);
      console.log(description);
    } else {
      response.json(description);
    }
});


app.get("/cities", function(request, response) {
  if(request.query.limit >= 0) {
    response.json(citySearch.slice(0, request.query.limit));
  } else if (request.query.limit > 5){
     response.status(404).json
  } else {
      response.json(Object.keys(cities));
  }
});

function citySearch (keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function(city) {
    return city.match(regexp);
  });
  return result;
}

// CREATE CITY
app.post('/cities', parseUrlencoded, function (request, response) {
  var newCity = request.body;  
  cities[newCity.name] = newCity.description;
  
  response.status(201).json(newCity.name);
});

var createCity = function(name, description){
  cities[name] = description;
  return name; 
};

// VALIDATION
app.post('/cities', parseUrlencoded, function (request, response) {
  if(request.body.description.length > 4){
    var city = createCity(request.body.name, request.body.description);
  response.status(201).json(city);
  } else {
    response.status(400).json('Invalid City');
  }
});

// Delete route
app.delete('/cities/:name', function (request, response) {
delete cities[request.cities];
    response.sendStatus(200);
}); 

app.listen(process.env.PORT);