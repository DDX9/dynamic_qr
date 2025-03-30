import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import { createClient, type RedisClientType } from 'redis'
import 'dotenv/config'

// Create a `node-redis` client
export const redisInstance = await createClient({
	// ... (see https://github.com/redis/node-redis/blob/master/docs/client-configuration.md)
	 url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`
}).connect()

// Create and use the rate limiter
export const limiter= rateLimit({
	// Rate limiter configuration
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers

	// Redis store configuration
	store: new RedisStore({
		sendCommand: (...args: string[]) => redisInstance.sendCommand(args),
	}),
})