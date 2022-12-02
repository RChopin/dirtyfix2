import axios from "axios";
const url = require("url");

export default async function handler(req, res) {
	const { code, verifier } = req.body;
	console.log(code, verifier);
	console.log(process.env.CLIENT_ID);
	try {
		const params = new url.URLSearchParams({
			client_id: process.env.CLIENT_ID,
			code: code,
			code_verifier: verifier,
			grant_type: "authorization_code",
		});

		const data = await axios.post(
			"https://myanimelist.net/v1/oauth2/token",
			params.toString()
		);
		console.log(data);
		res.status(200).json(data.data);
	} catch (error) {
		console.error(error);
		return res.status(error.status || 500).end(error.message);
	}
}
