import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { SensorData } from '../models/air_quality.model.js'

const getdata = asyncHandler( async(req,res)=>{
    const {temperature,humidity,gasValue} = req.body;
    if(
        [temperature,humidity,gasValue].some((field)=>field?.trim()===null)
    ){
        throw new ApiError(400,"All fields are required")
    }

    const newSensorData = await SensorData.create({
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
)



export {
    getdata,
}