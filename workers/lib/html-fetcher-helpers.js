var http = require('http-get');
var fs = require('node-fs');
var _ = require('underscore');
exports.readUrls = function(filePath, cb){
  _.each(fs.readFileSync(filePath, 'utf8').split('\n'), function(value){
    if (value !== ''){
      cb(value);
    }
  });
};
exports.downloadUrls = function(url){
  http.get(url, '../data/sites/' + url + '.html', function(error, result){
    if (error) {
      console.error(error, 'hellp');
    } else {
      console.log('File downloaded at: ' + result.file);
    }
  });
};