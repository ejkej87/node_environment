var os = require('os');
var OSinfo = require('./modules/OSInfo');
var time = require('./modules/time');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var StatMode = require('stat-mode');
var fs = require('fs');
var http = require('http');
var server = http.createServer();

var emitter = new EventEmitter();
emitter.on("beforeCommand", function (instruction) {
   console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("afterCommand", function () {
   console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
   var input = process.stdin.read();
   if(input !== null) {
      var instruction = input.trim();

      emitter.emit('beforeCommand', instruction);
      switch(instruction) {
         case '/exit':
            process.stdout.write('Quiting app!');
            process.exit();
            break;
         case '/sayhello':
            process.stdout.write('hello!\n');
            break;
         case '/getOSinfo':
            OSinfo.get();
            break;
         default:
            process.stderr.write('Wrong instruction!\n');
      };
      
      emitter.emit('afterCommand');
   }
});


fs.stat('./cat.jpg', function (err, stats) {
   var statMode = new StatMode(stats);
   console.log(statMode.toString());
});

fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
   console.log('Dane przed zapisem!'.blue);
   console.log(data);
   fs.appendFile('./tekst.txt', '\nA tak wyglądają po zapisie!', function(err) {
      if (err) throw err;
      console.log('Zapisano!'.blue);
      fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
         console.log('Dane po zapisie'.blue)
         console.log(data);
      });
   });
});
       
//from read.txt to write.txt

fs.readFile('./read.txt', 'utf-8', function (err, data) {
   if (err) throw err;
   console.log(data);
   fs.writeFile('./write.txt', data, function (err, data) {
      if (err) throw err;
      fs.readFile('./write.txt', 'utf-8', function (err, data) {
         console.log(data);
      })
   });
});

http

server.on('request', function (request, response) {
         var html = fs.readFile('./index.html', function (err, html) {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            if (request.method === 'GET' && request.url === '/hello') {
               response.write('<h1>Hello World!</h1>');
               response.end();
            } else {
               response.statusCode = 404;
               response.write('<img src="https://zawodbloger.pl/wp-content/uploads/2018/08/404.png">');
               response.end();
            };
         });
      });

server.listen(8061);