import RateLimit from "express-rate-limit";
import { env } from "~/configs";
import response from "~/helpers/response";

const limiter = () =>
  RateLimit({
    windowMs: env.THROTTLE_TIME * 60 * 1e3,
    max: env.THROTTLE_COUNT,
    message: response.error("Too many request, please try again later.", 429),
  });

export default limiter;
