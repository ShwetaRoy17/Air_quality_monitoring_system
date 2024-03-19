import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { SensorData } from '../models/air_quality.model.js'

const postdata = asyncHandler( async(req,res)=>{
    const {temperature,humidity,gasValue,slot} = req.body;
    if(
        [temperature,humidity,gasValue,slot].some((field)=>field?.trim()===null)
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existingData = await SensorData.findOne({timeSlot})
        if(existingData){
            existingData.temperature= temperature;
            existingData.humidity= humidity;
            existingData.gas = gas;
            await existingData.save();
            console.log('data saved ,\n new data:',humidity,` temperature:${temperature} gas:${gas}`);
            res.status(201).json(new ApiResponse(200,existingData,"Data updated for given slot"));
        }else{

    const newSensorData = await SensorData.create({
        slot:slot,
        temperature,
        humidity,
        gasValue
    });
    console.log("data entered",newSensorData);
    if(!newSensorData){
        throw new ApiError(505,"Something went wrong while entering the data");
    }
    return res.
    status(201)
    .json(new ApiResponse(200,newSensorData,"data entered successfully."))
}
}
)



export {
    postdata,
}