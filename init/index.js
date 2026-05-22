const mongoose = require("mongoose");
const initData =  require("./data.js");
const Listing = require("../models/listing.js");
// const { init } = require("../models/reviews.js");


main().then((res) =>{
    console.log("connection successful !")
}).catch((err) =>{
    console.log(err)
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'69abd776f13aafa10d670308'}))
    await Listing.insertMany(initData.data)
    console.log("Data was initialized !")
}
initDB();