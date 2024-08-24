import express from "express";
import {
  logincontroller,
  registercontroller,
} from "../controllers/authcontroller.js";
import { rateLimit } from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const router = express.Router();

/**
 * @swagger
 * components:
 *  Schemas:
 *    user:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: the auto generate id for user collection
 *        name:
 *          type: string
 *          description: user name
 *        email:
 *          type: string
 *          description: user email
 *        password:
 *          type: string
 *          description: user password should be greater than 6 charater
 *      example:
 *        id: jjsejddnj
 *        name: Mohit
 *        email: bamania8@gmail.com
 *        password: bamania@2003
 */

router.post("/register", limiter, registercontroller);

router.post("/login", limiter, logincontroller);

export default router;
