import mongoose from 'mongoose'
// import {User, UserSchema} from './models/User';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async() =>{
    try {
        const MongoURI = process.env.Mongo_URI;
        if (!MongoURI) {
            throw new Error("Mongo_URI is not defined in the environment variables");
        }
        await mongoose.connect(MongoURI);
        console.log("connected to DB")
    }catch(error){
        console.error("Error connecting to DB", error);
    }
}

export { connectDB };