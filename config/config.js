const mongoose = require('mongoose');
require('colors');
const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDb Connected ${conn.connection.host}`.inverse.yellow)
     }catch (error) {
        console.error(`Error : ${error.message}`.red)
        process.exit(1);
      }
};

module.exports = connectDb;