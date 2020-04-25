// modulo que nos permite ejecutar codigo js del lado del servidor
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var log = require('./modules/my-log');
var consts = require('./utils/consts');
var firebase = require('../libs/firebase');

var { countries } = require('countries-list');



var server = http.createServer((req, res) => {

    var parsed = url.parse(req.url);
    console.log("parsed: ", parsed);
    
    var pathname = parsed.pathname;

    var query = querystring.parse(parsed.query);
    console.log("query: ", query)

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><h1>Inicio</h1></body></html>');
        res.end();
    } else if (pathname === '/exit') {

        res.writeHead(200, { 'Content-Type': 'applicatiopn/json' });
        res.write('<html><body><h1>Adios</h1></body></html>');
        res.end();

    } else if (pathname === '/country') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(JSON.stringify(countries[query.code]));
        res.end();

    } else if (pathname === '/info') {

        var result = log.info(pathname)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();

    } else if (pathname === '/error') {

        var result = log.error(pathname)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();

    } else  {

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><body><h1>Error</h1></body></html>');
        res.end();
    }
});

server.listen(4000);
console.log('running on 4000')

