import mongoose from "mongoose";

export async function connectMongo(uri) {
    try{
        mongoose.set("strictQuery", true)
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log("MongoDB connected");
    }catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1)
    }

    mongoose.connection.on("disconnected ", () => {
        console.warn("MongoDB disconnected");
        
    })
}