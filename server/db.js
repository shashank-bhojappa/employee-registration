const mongoose = require('mongoose');

// const dbURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aqiyahr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const dbURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ac-o3xbpk6-shard-00-00.aqiyahr.mongodb.net:27017,ac-o3xbpk6-shard-00-01.aqiyahr.mongodb.net:27017,ac-o3xbpk6-shard-00-02.aqiyahr.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-6zw7zq-shard-0&authSource=admin&retryWrites=true&w=majority`
//const dbURL = `mongodb+srv://${process.env.MONGO_USER}shashankbhojappa1989:1928@cluster0.aqiyahr.mongodb.net/employees?retryWrites=true&w=majority`;
module.exports = async ()=> {
    return await mongoose.connect(dbURL)
}