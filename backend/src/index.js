import server from "./app.js";
import "dotenv/config";
import connectDB from "./db/index.js";



connectDB()
.then(()=>{
    server.listen(process.env.PORT||8001,()=>{
        console.log(`Server is listening on port ${process.env.PORT}..`);
    })
   
})
.catch((err)=>{
    console.log("Mongo db connection failed , ERROR:",err.message);
})
