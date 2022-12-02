import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import config from "../config";

export default function Home() {
	const [verifier, setVerifier] = useState();

	const { query } = useRouter();
	async function getToken() {
		console.time("getToken");

		await axios
			.post("/api/hello", {
				code: query.code,
				verifier: verifier,
			})
			.then((res) => {
				console.timeEnd("getToken");
				let data = res.data;
				Cookie.set("token", res.data.access_token, {
					expires: new Date(new Date().getTime() + res.data.expires_in * 1000),
					path: "/",
					domain: config.domain,
				});

				Cookie.set("refresh_token", res.data.refresh_token, {
					expires: new Date(new Date().getTime() + 2682000 * 1000),
					path: "/",
					domain: config.domain,
				});

				Cookie.set("token_type", res.data.token_type, {
					expires: new Date(new Date().getTime() + res.data.expires_in * 1000),
					path: "/",
					domain: config.domain,
				});

				Cookie.set(
					"expires_in",
					new Date().getTime() + res.data.expires_in * 1000,
					{
						expires: new Date(
							new Date().getTime() + res.data.expires_in * 1000
						),
						path: "/",
						domain: config.domain,
					}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div>
			<Head>
				<title>Cookie factory</title>
				<meta name="description" content="cooky" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>Hello!</h1>
				<p>Paste your clipboard below and click send.</p>
				<input
					value={verifier}
					onChange={(e) => setVerifier(e.target.value)}
				></input>
				<br />
				<button
					onClick={(e) => {
						e.preventDefault();
						getToken();
					}}
				>
					Send
				</button>
			</main>
		</div>
	);
}
