import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { user } from '../models/user.model.js';
import sendEmail from '../utils/email.js';


const registerUser = asyncHandler(async(req,res)=>{
    /*
    add email ,username ,phone number,address,lastname,
    validation - not empty
    check if already exists username,email

    */ 

    const {userName,lastName,phoneNumber,email,address} = req.body;
    console.log(req.body);
    if(
        [userName,lastName,phoneNumber,email,address].some((field)=>field?.trim()===null||field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser = await user.findOne({
        $or:[{username:`${userName}`},{email:`${email}`}]
    })
    if (existedUser){
        console.log(existedUser);
        throw new ApiError(409,"user with email or username already exists")
    }

    const newuser = await user.create({
        userName:userName.toLowerCase(),
        lastName:lastName.toLowerCase(),
        phoneNumber,
        email,
        address:address.toLowerCase(),
    })
    console.log("User created",newuser);
    const createdUser = await user.findById(newuser.id);
    if(!createdUser){
        throw new ApiError(505,"Something went wrong while registering user")
    }
    const message = `Hello ${userName} + ${lastName}, \n\n`+
    `You have been registered successfully on air quality server data:\n` +
    `Welcome To the community for a safer and secure future of your family.`+
    `Your details are \n\n` +
    `phoneNumber: + 91-${phoneNumber}`+
    `address: ${address}`+
    `Regards,\nYour Sensor Team`

    const mailOptions={
      from:"Welfare Society <welfare.society.com>",
      to:email,
      subject:"Welcome to the community.",
      text:message

    }
    const info = await sendEmail(mailOptions);
    if(info){
    return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))
  }
})



export {registerUser};
