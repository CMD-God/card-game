const readline = require('readline-sync');
const fs = require('fs');
var parseString = require('xml2js').parseString;

var fileName = readline.question("Name of file: ");

var pretty = readline.question("Should I make it look good? (y/n) ");

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(fileName)
});

if (pretty === "y") {
	lineReader.on('line', function (line) {
		if (line.length > 0) {
			console.log("'" + line.trim() + "' +");
		}
	});
} else {
	var txt = "";
	lineReader.on('line', function (line) {
		txt += line.trim();
	}).on('close', function () {
		console.log("'" + txt + "'");
	});
}
//console.log(contents);
//console.log(JSON.stringify(lines));