const app = require("express")();

app.get("/", (req, res) => {
	res.send("hello I guess");
});

app.listen(5500, () => {
	console.log("connected ");
});
