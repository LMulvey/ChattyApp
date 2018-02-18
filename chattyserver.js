const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid/v4");

const PORT = 3001;

const server = express()
	.use(express.static("public"))
	.listen(PORT, "0.0.0.0", "localhost", () =>
		console.log(`Listening on ${PORT}!`)
	);

const wss = new SocketServer({ server });

wss.on("connection", ws => {
	console.log("Client connected!");
	ws.on("message", msg => {
		let message = JSON.parse(msg);
		message.id = uuid();
		wss.clients.forEach(client => {
			if (client.readyState) {
				client.send(JSON.stringify(message));
				console.log("Sending message to " + client);
			}
		});
	});
	ws.on("error", err => console.log("Error!", err));
	ws.on("close", () => console.log("Client disconnected!"));
});
