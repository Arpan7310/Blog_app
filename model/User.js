import mongoose, { mongo } from "mongoose";


const userSchema =mongoose.Schema({
    name :{
     type:String,
     required:true,
    },
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
    type:String,
    required:true,
    minlength:6
    }
})

export default mongoose.model('User',userSchema);



