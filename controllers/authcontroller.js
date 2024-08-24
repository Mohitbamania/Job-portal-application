import usermodel from "../models/usermodel.js";

export const registercontroller = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!name) {
      next("Name is required");
    }
    if (!email) {
      return res.status(400).send({
        message: "Please provide email",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).send({
        message: "Please provide password",
        success: false,
      });
    }
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        message: "Email already register",
        success: false,
      });
    }
    const user = await usermodel.create({ name, email, password });
    const token = user.createjwt();
    res.status(201).send({
      message: "Register successull completed",
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in register",
      success: false,
      error,
    });
  }
};

export const logincontroller =  async(req,res,next) =>{

  const {email,password} = req.body;

  if(!email || !password){
    next("Provide all field");
  }

  const user = await usermodel.findOne({email});
  if(!user){
    next("Invalid username or password");
  }

  const ismatch = await user.comparepassword(password)
  if(!ismatch){
    next("Invalid username or password");
  }
  const token = user.createjwt()
  res.status(200).json({
    success:true,
    message:'Login Successfully',
    user,
    token,
  })
}
