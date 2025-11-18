import Redis, { RedisOptions } from "ioredis";
import { env } from "~/configs";

const options: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  retryStrategy: (times) => Math.min(times * 50, 2000),
};

const redis = new Redis(options);

export default redis;
