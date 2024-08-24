import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Authentication invalid" });
  }

  const token = authHeader.split(' ')[1]; // Corrected method name

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Authentication invalid" });
  }
};

export default authMiddleware;
