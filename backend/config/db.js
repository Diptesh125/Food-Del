import mongoose from "mongoose";

export const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://diptesh125:9LV5kLYjzoAeo31D@cluster0.1z9fkax.mongodb.net/food-del').then(()=>{
        console.log("Mongodb Atlas Connected")
    }).catch((error)=>{
        console.log("Database Connection Failed")
    })
}