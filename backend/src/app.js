import express from "express";
import cors from 'cors';
import http from 'http'
import { Server  }  from 'socket.io'

const app = express();



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    // credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));

import userRouter from './routes/index.routes.js'

app.use("/api/v1/airquality",userRouter)

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Frontend connected');
    
    socket.on('disconnect', () => {
      console.log('Frontend disconnected');
    });
  });
export default server;
export {io};



/*
1st app run krega
2nd hardware on krenge
3rd hardware data send krega humare server ko
4th woh aaj k date mein save ho jaega
5th server mein ek function call hoga jo har 3 hr pr mail krega sender ko
mail address fetch krega us database se jisme stored hoga 

*/ 

