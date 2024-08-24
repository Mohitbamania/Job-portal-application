import jobmodel from "../models/jobmodel.js";
import mongoose from "mongoose";

export const createjob = async (req, res, next) => {
  const { Company, Position } = req.body;

  if (!Company || !Position) {
    next("please provide all fields");
  }
  req.body.Createdby = req.user.userId;

  const job = await jobmodel.create(req.body);
  res.status(210).json({ job });
};

export const getalljobs = async (req, res, next) => {
  const { status } = req.query;
  const queryobject = {
    Createdby: req.user.userId,
  };

  if (search) {
    queryobject.position = { $regex: search, $options: "i" };
  }

  if (status && status !== "all") {
    queryobject.status = status;
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryresult = queryresult.skip(skip).limit(limit);
  const totaljobs = await jobmodel.countDocuments(queryresult);

  const numOfPage = Maths.ceil(totaljobs / limit);

  const queryresult = jobmodel.find(queryobject);
  const jobs = await queryresult;
  // const jobs = await jobmodel.findOne({ Createdby: req.user.userId });
  res.status(200).json({
    totaljobs: jobs.length,
    jobs,
    numOfPage,
  });
};

export const updatejob = async (req, res, next) => {
  const { id } = req.params;

  const { Company, Position } = req.body;

  if (!Company || !Position) {
    next("Provide all fields");
  }

  const job = await jobmodel.findOne({ _id: id });

  if (!job) {
    next("no jobs found");
  }

  if (!req.user.userId === job.Createdby.toString()) {
    next("You not authorizer to update this job");
    return;
  }

  const updatejob = await jobmodel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updatejob });
};

export const deletejob = async (req, res, next) => {
  const { id } = req.params;

  const job = await jobmodel.findOne({ _id: id });

  if (!job) {
    next("No jobs found");
  }

  if (!req.user.userId === job.Createdby.toString()) {
    next("you are no authorized to delete job");
    return;
  }

  await job.deleteOne();
  res.status(200).json({
    message: "success,job deletes!",
  });
};

export const jobstats = async (req, res) => {
  const stats = await jobmodel.aggregate([
    {
      $match: {
        Createdby: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({ totaljobs: stats.length, stats });
};
