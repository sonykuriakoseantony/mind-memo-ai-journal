const mongoose = require("mongoose");

const dbString = process.env.MONGODB_URI

export const connectDB = async () => {
    try{
       const res = await mongoose.connect(dbString);
       console.log("Connection to MongoDB Atlas established successfully!");
    }catch(err){
        console.log('Connection Failed',err);
    }
}
