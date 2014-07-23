exports.opbeat = function(api, next){

  api.opbeat = {};

  api.opbeat.configure = function(){
    var opbeatPrototype = require('opbeat');
    api.opbeat.client   = opbeatPrototype.createClient(api.config.opbeat);

    api.opbeat.client.on('logged', function (url) {
      api.log('Logged Error to OpBeat @ ' + url, 'error');
    });

    api.opbeat.client.on('error', function (err) {
      api.log('opBeat Error: ', 'error', err);
    });

    api.opbeat.client.on('connectionError', function (err) {
      api.log('opBeat Error: ', 'error', err);
    });
  }

  api.opbeat.notifier = function(type, err, extraMessages, severity){
    api.opbeat.client.captureError(err, {'extraMessages': extraMessages});
  }

  api.opbeat._start = function(api, next){
    if(api.env != 'test'){
      api.opbeat.configure();
      api.exceptionHandlers.reporters.push(api.opbeat.notifier);
    }
    next();
  };

  api.opbeat._stop =  function(api, next){
    next();
  };

  next();
}