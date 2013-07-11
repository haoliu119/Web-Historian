exports.datadir = '/Users/hackreactor/code/krgeppert/2013-06-web-historian/data/sites.txt'; // tests will need to override this.
var url = require('url');
var fs = require('node-fs');
var _ = require('underscore');

exports.handleRequest = function (req, res) {
  switch (req.method){
    case 'GET' :
      if (url.parse(req.url).pathname === '/') {
        endRequest(200, '/<input/');
      } else if (fileContainsUrl(url.parse(req.url).pathname)) { //todo FIX THIS.
        endRequest(200, '/google/');
      } else {
        endRequest(404, 'bad url');
      }
      break;
    case 'POST':
      var data = '';
      req.on('data', function(chunk){
        if (chunk !== undefined){
        data += chunk;
      }
      });
      req.on('end', function(){
        console.log(data);
        var url = data.replace('url=', '');
        console.log(url);
        if (!fileContainsUrl(url)) {
          url += '\n';
          fs.appendFileSync(exports.datadir, url, 'utf8');
          endRequest(302, url);
        } else {
          endRequest(200);
        }
      });
      break;
  }
  function endRequest (code, responseData){
    res.writeHead(code);
    res.end(responseData);
  }
  function fileContainsUrl(url){
    return fs.readFileSync(exports.datadir, 'utf8').contains(url);
  }
};
var originalHtml = '<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="styles.css" /> </head> <body> <form method="POST"> <input type="input" name="url"></input> </form> </body> </html>';
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
