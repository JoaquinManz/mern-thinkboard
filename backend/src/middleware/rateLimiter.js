
import ratelimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
    //to limit it per user you use userid, in this case i'll use a random string
    try {
        const {success} = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            })
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;