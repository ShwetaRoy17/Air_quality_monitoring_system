import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { user } from '../models/user.model.js';
import { sendCustomEmail } from '../utils/email.js';

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
    sendCustomEmail(createdUser.email,"Successful registration to the Community.",message);
    return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))
})


export {registerUser};

 // Schedule email sending task every 3 hours
//  cron.schedule('0 */3 * * *', async () => {
//     try {
//         // Fetch data from MongoDB

//         const users = await user.find().exec();
//         // const userEmails = user.map((user) => {return { email:user.email, username:user.userName }});
//         const data = {temperature:29,humidity:40,gasValue:60};

//         users.forEach(user => {
           

//             // Send email to all users
//             transporter.sendMail(mailOptions, (err, info) => {
//                 if (err) {
//                     console.error('Error occurred while sending email', err);
//                 } else {
//                     console.log('Email sent:', info.response);
//                 }
//             });
//         })


//     } catch (err) {
//         console.error('Error occurred while fetching data from MongoDB', err);
//     }
// });

/*
 `Hello ${user.username}, \n\n`+
        `Here is your latest sensor data:\n` +
        `Temperature: ${data.temperature}°C\n` +
        `Humidity: ${data.humidity}%\n` +
        `Gas Value: ${data.gasValue}\n\n` +
        `${dangerMessage}\n\n` +
        `Regards,\nYour Sensor Team`
*/ 

/*
const nodemailer = require('nodemailer');

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send customized email
async function sendCustomEmail({ to, subject, message }) {
  try {
    // Prepare email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text: message
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.error('Error occurred while sending email', error);
    return false; // Email sending failed
  }
}

module.exports = { sendCustomEmail };
*/ 