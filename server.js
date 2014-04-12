var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

server.use(restify.CORS());

server.get('/blogs/:num', function(req, res, next) {

var DUMMYDATA = [];

for (var i = 0; i < req.params.num; i++) {
  DUMMYDATA.push({
    id: i,
    title: 'Dummy blog' + i,
    content: 'Dummy content' + Math.random()
  });
}

  res.send(DUMMYDATA);
  next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


