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
 *  schemas:
 *    user:
 *      type: Object
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

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *      responses:
 *         200:
 *           description: user created successully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/user'
 *         500:
 *           description: internal server error
 */

router.post("/register", limiter, registercontroller);

/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      summary: 
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *      responses:
 *         200:
 *           description: login successully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/user'
 *         500:
 *           description: internal server error
 */

router.post("/login", limiter, logincontroller);

export default router;
