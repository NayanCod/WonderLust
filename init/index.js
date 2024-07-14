const mongoose = require("mongoose");
const initializeData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderLust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initializeData.data = initializeData.data.map((obj) => ({...obj, owner: "668b7ffc495edc51cf3d4166"}));
    await Listing.insertMany(initializeData.data);
    console.log("data was initialized");
}

initDB();