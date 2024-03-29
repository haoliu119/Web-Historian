var stubs = require("./helpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
var fs = require("fs");
var path = require('path');

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];

    var filePath = path.join(__dirname, "/testdata/sites.txt");


    var resultArray = [];
    var result = htmlFetcherHelpers.readUrls(__dirname + "/testdata/sites.txt", function(urls){
      resultArray.push(urls);
    });

    waits(200);

    runs(function() {
      expect(resultArray).toEqual(urlArray);
    });
  });

  it("should have a working 'downloadUrls' function", function(){
    var result = htmlFetcherHelpers.downloadUrls(['www.google.com', 'www.amazon.com']);
    expect(result).toBeTruthy();
  });
});
