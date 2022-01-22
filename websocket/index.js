const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocketServer = require("websocket").server;

const httpServer = http.createServer((req, res) => {
	console.log("server has started");
});

const ws = new WebSocketServer({
	httpServer: httpServer,
});

httpServer.listen(8800, () => {
	console.log("server listening on 8800");
});

console.log(path.join(__dirname, "index.html"));

let connection = null;

ws.on("request", (request) => {
	connection = request.accept(null, request.origin);

	connection.on("open", () => {
		console.log("Open");
	});

	connection.on("close", () => {
		console.log("closed");
	});

	connection.on("message", (message) => {
		console.log(`Received message ${message.utf8Data}`);
		connection.send(`got your message: ${message.utf8Data}`);
		connection.send(
			JSON.stringify({
				type: "update-file",
				data: {
					fileName: path.join(__dirname, "index.html"),
					content: fs.readFileSync(path.join(__dirname, "index.html")),
				},
			})
		);
	});
});
