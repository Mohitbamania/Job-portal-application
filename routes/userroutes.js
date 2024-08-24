import express from 'express';
import { updateuser } from '../controllers/usercontorller.js';
import authMiddleware from '../middleware/errormiddleware.js';

const router = express.Router();

router.put('/update-user',authMiddleware,updateuser);

export default router;