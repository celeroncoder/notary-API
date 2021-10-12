import { RateLimiterOptions } from "nestjs-rate-limiter";

export const rateLimiterOptions: RateLimiterOptions = {
	for: 'Express',
	type: 'Memory',
	keyPrefix: 'global',
	logger: true,
	errorMessage: 'Rate limit exceeded',
	maxQueueSize: 50
}
