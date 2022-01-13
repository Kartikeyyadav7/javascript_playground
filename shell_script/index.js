const http = require("http");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		fs.readFile(path.join(__dirname, `index.html`), (err, data) => {
			if (err) console.log(err);
			else {
				res.write(data);
				res.end();
			}
		});
	} else if (req.url === "/createfile" && req.method === "POST") {
		let data;
		req.on("data", (chunk) => {
			console.log(`Data chunk available: ${chunk.toString()}`);
			data += chunk;
		});
		req.on("end", () => {
			console.log("In the end");
			const fileName = data.split("=");
			console.log(fileName[1]);
			exec(`touch ${fileName[1]}`, (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
			res.end();
		});
	} else if (req.url === "/createfolder" && req.method === "POST") {
		let data;
		req.on("data", (chunk) => {
			console.log(`Data chunk available: ${chunk.toString()}`);
			data += chunk;
		});
		req.on("end", () => {
			console.log("In the end");
			const folderName = data.split("=");
			console.log(folderName[1]);
			exec(`mkdir ${folderName[1]}`, (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
			res.end();
		});
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log("server listenting at ", PORT);
});

// exec("mkdir ", (error, stdout, stderr) => {
// 	if (error) {
// 		console.log(`error: ${error.message}`);
// 		return;
// 	}
// 	if (stderr) {
// 		console.log(`stderr: ${stderr}`);
// 		return;
// 	}
// 	console.log(`stdout: ${stdout}`);
// });
