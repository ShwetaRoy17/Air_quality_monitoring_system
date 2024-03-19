import nodemailer from 'nodemailer'
import { ApiResponse } from './ApiResponse.js'
import { ApiError } from './ApiError.js'
import {google} from 'googleapis'
import 'dotenv/config';


// OAuth2 Credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)


oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});





// generating access token
const accessToken = await oauth2Client.getAccessToken();


// transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
    auth: {
        type:'OAuth2',
        user:process.env.MY_EMAIL,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN,
        accessToken:accessToken
    }
})

 

// email sending function
const sendEmail = async(emailOptions)=>{
try{
console.log("mail Options\n",emailOptions);
// sending email 
const info = await transporter.sendMail(emailOptions);
console.log('Email sent Successfully..',info.response);
return info;
}catch(err){
console.log("Error occurred while sending the email\n",err);
throw new ApiError(409,"email not send");
}
}
 
export default sendEmail;
