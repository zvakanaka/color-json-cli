const through = require('through2');
const cj = require('color-json');

function processStdin() {
  let totalString = '';
  const tr = through(function (buf, _, next) {
      totalString += buf.toString();
      next();
  }, function (done) {
    console.log(cj(JSON.parse(totalString)));
  });
  process.stdin.pipe(tr);
}

if (process.argv.length >= 3) {
  const fs = require('fs');
  fs.readFile(process.argv[2], 'utf8', function (err,data) {
    if (err) return console.log(err);
    console.log(cj(JSON.parse(data)));
  });
} else {
  processStdin();
}
