const app = require('./app');

app.set('port', process.env.PORT || 5000);

var server = app.listen(
  app.get('port'), () => {
    console.log('Express at [%o]',
      server.address()
  );
});
