import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    Company:{
        type:String,
        required:[true,"Company name is required"]
    },
    Position:{
        type:String,
        required:[true,'job position is required'],
        maxlength:100
    },
    Status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'
    },
    Worktype:{
        type:String,
        enum:['full-time','part-time','internship','contract'],
        default:'full-time'
    },
    Worklocation:{
        type:String,
        default:'Mumbai',
        required:[true,'workplce is required']
    },
    Createdby:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

export default mongoose.model('job',jobschema);