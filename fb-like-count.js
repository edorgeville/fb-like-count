var FB = require('fb');
    FB.options({version: 'v2.6'});
var fb = new FB.Facebook();

var fblc = {};

fblc.client_id = null;
fblc.client_secret = null;
fblc.debug = false;
fblc.callback = null;

fblc.getAccessToken = function(callback){
  fb.api('oauth/access_token', {
    client_id: fblc.client_id,
    client_secret: fblc.client_secret,
    grant_type: 'client_credentials'
  }, function (res) {
    if(!res || res.error) {
      fblc.log(!res ? 'error occurred' : res.error);
      return;
    }

    var accessToken = res.access_token;
    fblc.log('New token set');
    fb.setAccessToken(res.access_token);
    callback();
  });
}

fblc.get = function(id, callback){
  fblc.log('Getting fans');
  if(id){
    fblc.id = id;
  }
  if(callback){
    fblc.callback = callback;
  }
  fb.api(fblc.id + '/?fields=fan_count', function (res) {
    fblc.log('Got response');
    if(!res || res.error) {
      if(res.error.code == 104){
        fblc.error('Missing or expired OAuth Token');
        fblc.getAccessToken(fblc.get);
        fblc.callback(-1);
      } else{
        fblc.error('Other error');
        fblc.error(!res ? 'error occurred' : res.error);
        fblc.callback(-1);
      }
      return;
    } else{
      if(res.fan_count){
        fblc.log('Got fan count: ' + res.fan_count);
        fblc.callback(res.fan_count);
      } else{
        fblc.log('No fan count returned');
        fblc.callback(0);
      }
    }
  });
}

fblc.log = function(data){
  if(fblc.debug){
    console.log(data);
  }
}

fblc.error = function(data){
  console.error(data);
}

module.exports = fblc;