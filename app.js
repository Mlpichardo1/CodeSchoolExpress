var express = require('express')
var app = express();

var requestTime = function (request, response, next) {
  request.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.get('/name', function (request, response) {
  response.send('Manny Pichardo')
})

app.get('/redirect', function(request, response) {
  response.redirect(301, '/surprise');
});

app.listen(process.env.PORT);