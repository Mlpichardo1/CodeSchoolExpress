// EXPRESS Level 1
var express = require('express')
var app = express();

// var requestTime = function (request, response, next) {
//   request.requestTime = Date.now()
//   next()
// }

// app.use(requestTime)

// app.get('/', function (request, response) {
//   response.send('Hello World!')
// })

// app.get('/name', function (request, response) {
//   response.send('Manny Pichardo')
// })

// app.get('/redirect', function(request, response) {
//   response.redirect(301, '/surprise');
// });

// app.listen(process.env.PORT);

// EXPRESS Level 2
app.get('/cities', function (request, response) {                                                                                                     
  var cities = ['Providence', 'Warwick', 'Lincoln', 'Cranston'];
  response.json(cities);
});

app.use(express.static('public')); //MIDDLEWARE

// app.get("/", function(request, response) {
//   response.sendFile(__dirname + "/public/index.html");
// });

app.listen(process.env.PORT);