var colors = require('colors');
var readline = require('readline');
var program = require('commander');
var util = require('util');

colors.setTheme({
  verbose: 'grey',
  info: 'white',
  warn: 'yellow',
  debug: 'cyan',
  error: 'red'
});

program
  .version('0.0.1')
  .option('-f, --filter [regexp]', 'regex to filter the input by')
  .option('-t, --transform [regexp]', 'regex with at least one capturing group that will be used to transform each line')
  .parse(process.argv);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var filter;
var transformer;
var logLevel = /\[(\w+)\]/gi;

if (program.filter) {
  console.log(util.format('Filtering using: %s', program.filter).yellow);;
  filter = new RegExp(program.filter, 'gi');
}

if (program.transform) {
  console.log(util.format('Transforming using: %s', program.transform).yellow);;
  transformer = new RegExp(program.transform, 'gi');
}

rl.on('line', function(line) {
  if(!filter || filter.test(line)) {
    var matches = logLevel.exec(line);
    logLevel.lastIndex = 0;
    var level = (matches && matches[1]) || 'debug';
    if (transformer) {
      var groups = transformer.exec(line);
      if (groups && groups[1]) {
        line = groups[1];
      }
      transformer.lastIndex = 0;
    }
    console.log(line[level]);
  }
});
