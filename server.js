const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/currencyRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let data = []

const PORT = process.env.PORT || 5000;

app.use(router);

app.get("/", (req, res) => {
	// Health Check
	res.send("API running.");
});

app.get("*", (req, res) => {
	res.status(404).json({
		error: 404,
		message: "404 Page. Non existent resource."
	});
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})