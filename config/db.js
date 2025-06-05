const mongoose=require("mongoose");

const connectToDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }

    catch(err){
        console.erroe("Error connecting to MOngoDB", err);
        process.exit(1); // Exit the process with failure
    }
}


module.exports= connectToDB;