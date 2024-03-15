import { user } from '../models/user.model.js'
// import { SensorData } from '../models/air_quality.model.js'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { asyncHandler } from './asyncHandler.js'
import { ApiResponse } from './ApiResponse.js'
import { ApiError } from './ApiError.js'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
})


// danger message
const dangermessage = (gas) => {
    if (gasValue > 100) {
        return 'Danger: High gas levels detected! Please evacuate immediately.';
      } else if (gasValue > 50) {
        return 'Warning: Moderate gas levels detected. Take necessary precautions.';
      } else {
        return 'No danger detected. Continue normal operations.';
      }
}
 

const sendCustomEmail = asyncHandler(async(to,subject,message)=>{
try{
 // Prepare email content

 console.log( process.env.USER_PASSWORD);

 const mailOptions = {
    from: 'shwetaroy1712@gmail.com',
    to:to,
    subject:subject,
    text:message
};
console.log("mail Options\n",mailOptions);
const info = await transporter.sendMail(mailOptions);
console.log('Email sent Successfully..',info.response);
return new res.status(200).json(ApiResponse(200,"Email send successfully."));
}catch(err){
console.log("Error occurred while sending the email\n",err);
throw new ApiError(409,"email not send");
}
})
 
export {sendCustomEmail};
