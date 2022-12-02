/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		CLIENT_ID: process.env.CLIENT_ID,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api-cdn.myanimelist.net",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
