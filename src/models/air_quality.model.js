import mongoose,{Schema} from 'mongoose';

const sensorSchema = new Schema({
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
})

export const SensorData = mongoose.model("SensorData",sensorSchema);