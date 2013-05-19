var colors = require('colors');
var readline = require('readline');

colors.setTheme({
  verbose: 'grey',
  info: 'white',
  warn: 'yellow',
  debug: 'cyan',
  error: 'red'
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var filter;
if (process.argv.length > 2) {
  filter = new RegExp(process.argv[2], 'gi');
  console.log('Filtering using: %s', process.argv[2]);
}


rl.on('line', function(line) {
  if(!filter || filter.test(line)) {
    var matches = /\[(\w+)\]/gi.exec(line);
    var level = (matches && matches[1]) || 'debug';
    console.log(line[level]);
  }
});
