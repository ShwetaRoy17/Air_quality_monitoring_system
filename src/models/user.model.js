import mongoose ,{Schema} from 'mongoose';


const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,"Must provide with valid name"],
        min:6
    },
    lastName:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:[true,"Must provide with a valid email"],
        match:[/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,"Enter a valid email address"],
        unique:true
    },
    address:{
        type:String,
        required:[true,"User must be a resident of this colony"]
    },

})

export const user = mongoose.model('User',userSchema);