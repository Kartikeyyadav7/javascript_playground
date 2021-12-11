const http = require("http");
const server = http.createServer();
const fs = require("fs");

server.on("listening", () => console.log("listening"));

server.on("request", (req, res) => {
	if (req.url === "/") {
		res.end(fs.readFileSync("index.html"));
		return;
	}
	if (req.url === "/upload") {
		const fileName = req.headers["file-name"];
		req.on("data", (chunk) => {
			fs.appendFileSync(fileName, chunk);
			console.log("chunk received", chunk.length);
		});
		res.end("Uploaded");
	}
});

server.listen("8080");
