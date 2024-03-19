import mongoose,{Schema} from 'mongoose';

const sensorSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    timeSlot:{
        type:String,
        required:true,
    },
    temperature:{
        type:Number,
        required:[true,"Must provide with temperature"]
    },
    humidity:{
        type:Number
    },
    gas:{
        type:Number
    }
},{timestamps:true})




export const SensorData = mongoose.model("Sensor_Data",sensorSchema);