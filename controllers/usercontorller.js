import usermodel from "../models/usermodel.js";

export const updateuser = async (req,res,next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    next("provide all field");
  }

  const user = await usermodel.findOne({_id: req.user.userId });
  user.name = name;
  user.email = email;

  await user.save();

  const token = user.createjwt();
  res.status(200).json({
    user,
    token,
  });
};
