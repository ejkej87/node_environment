var os = require('os');
var OSinfo = require('./modules/OSInfo');
var time = require('./modules/time');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var StatMode = require('stat-mode');
var fs = require('fs');


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





