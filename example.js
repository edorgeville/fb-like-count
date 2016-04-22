var fbLikeCount = require('./fb-like-count');
fbLikeCount.client_id = process.env.FB_APP_ID || '123456789000000';
fbLikeCount.client_secret = process.env.FB_APP_SECRET || '123456789012345678901234567890ee';
// fbLikeCount.debug = true;

setTimeout(function(){
  fbLikeCount.get('FacebookforDevelopers', function(count){
    console.log(count);
  });
}, 5000);
