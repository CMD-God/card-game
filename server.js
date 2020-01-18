
var http = require("http");
var fs = require("fs");

var HTMLTagNo = "<!-- Server_No_Replace -->";
var server;
var defaultPage = "home.html";

function StartServer() {
	//console.log(server !== undefined);
	//console.log(server);
	
	if (server === undefined) {
		server = http.createServer((function(request, response)
			{
				var fileName = request.url.slice(1, request.url.length);
				if (fileName === "") {fileName = defaultPage;}
				if (fileName.indexOf(".") === -1) {fileName += ".html"};
				var fileExtension = fileName.slice(fileName.lastIndexOf(".")+1, fileName.length);
				//console.log(fileName, fileExtension);
				if (fs.existsSync(fileName)) {
					response.writeHead(200, {"Content-Type": ReturnContentTypeBasedOnFileExtension(fileExtension)});
					fs.readFile(fileName, 'utf8', function(err, _contents) {
						var contents;
						if (fileExtension === "html") {
							contents = ProcessHTML(_contents);
						} else {
							contents = _contents;
						}
						response.write(contents);
						response.end();
					});	
				} else {
					response.writeHead(404, {"Content-Type": "text/plain"});
					response.write("File " + fileName + " not found!");
					response.end();
				}
			}
		));
		server.listen(7000);
		console.log("The server is now listening on port 7000!");
	};
}
var baseHTMLFileName = "BaseHTML.html";
var baseHTML = "";
var baseHTMLToReplace = '<wholepage></wholepage>';

function LoadBaseHTML() {
	fs.readFile(baseHTMLFileName, 'utf8', function(err, contents) {
		baseHTML = contents;
		StartServer();
	});
};

fs.watch("BaseHTML.html", {}, (eventType, filename) => {
  if (filename) {
    //console.log(filename);
    LoadBaseHTML();
  }
});

LoadBaseHTML();

var ContentTypes = {
	"html":	"text/html",
	"css":	"text/css",
	"js":	"text/js",
	"ttf":	"font/ttf",
	"gif":	"image/gif",
	"ico":	"image/vnd.microsoft.icon",
	"jpeg":	"image/jpeg",
	"jpg":	"image/jpeg",
	"png":	"image/png",
	"mp3":	"audio/mpeg",
	"ogg":	"audio/ogg",
	"oga":	"audio/ogg",
	"wav":	"audio/wav"
}

function ReturnContentTypeBasedOnFileExtension(ext) {
	return ContentTypes[ext] || "text/plain";
}

function ProcessHTML(txt) {
	if (txt.indexOf(HTMLTagNo) === -1) {
		return baseHTML.replace(baseHTMLToReplace, txt);
	}
	return txt;
}