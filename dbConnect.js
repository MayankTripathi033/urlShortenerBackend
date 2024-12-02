const mongoose = require("mongoose");

async function connectDb(url){
    try {
        await mongoose.connect(url)
    } catch (error) {
        console.error("Db is not connect", error);
    }
}

module.exports = {
    connectDb
}