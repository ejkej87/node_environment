var os = require('os');
var OSinfo = require('../modules/OSInfo');
var time = require('../modules/time');

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function () {
   var input = process.stdin.read();
   if (input !== null) {
      var instruction = input.trim();
      switch (instruction) {
         case '/exit':
            process.stdout.write('Quitting app!\n');
            process.exit();
            break;
         case '/version':
            console.log(process.env);
            break;
         case '/getOSinfo': 
           OSinfo.print();
            break;
         case '/gettime':
            console.log(time.print());
            break;
         default:
            process.stderr.write('Wrong instruction!\n');
      }
   }
});

