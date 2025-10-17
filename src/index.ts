import app from '@/app'

export default {
	// biome-ignore lint/correctness/useParseIntRadix: It will be parsed later
	port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
	fetch: app.fetch
}
