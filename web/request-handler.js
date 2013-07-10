exports.datadir = __dirname + "/testdata/sites.txt"; // tests will need to override this.
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
      req.on('data', function(data){
        var betterData = data.replace('url=', '');
        if (!fileContainsUrl(betterData)) {
          betterData += '\n';
          fs.appendFileSync(exports.datadir, betterData, 'utf8');
          endRequest(302, betterData);
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
