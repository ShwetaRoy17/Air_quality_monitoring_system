import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.CONNECTION_URI}`,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true,
            }
            )
            console.log('\n Mongodb Connected !!! DB HOST:',connectionInstance.connection.host);
    }catch(err){
        console.log("MONGODB connection Error:",err);
        process.exit(1);
    }
}
export default connectDB;