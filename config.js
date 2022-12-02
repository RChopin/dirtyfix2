let config = {};

if (process.env.NODE_ENV === "development") {
	config = { domain: "localhost" };
} else {
	config = {
		domain: "dirtyfix2.vercel.app",
	};
}

module.exports = config;
