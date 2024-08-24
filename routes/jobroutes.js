import express from 'express';
import authMiddleware from '../middleware/errormiddleware.js';
import { createjob, deletejob, getalljobs, jobstats, updatejob } from '../controllers/jobcontoller.js';

const router = express.Router();

router.post('/create-job',authMiddleware,createjob);

router.get('/get-jobs',authMiddleware,getalljobs);

router.patch('/update-job/:id',authMiddleware,updatejob);

router.delete('/delete-job/:id',authMiddleware,deletejob);

router.get('/job-stats',authMiddleware,jobstats);


export default router;