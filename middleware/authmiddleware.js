const errormiddleware = (error,req,res,next) =>{
    res.status(400).send({
        success:false,
        message:'Something went wrong',
        error
    })
};

export default errormiddleware;