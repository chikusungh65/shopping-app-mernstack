const express = require('express');
const {errorHandler} = require('./middlewares/errorMiddleware');
require('colors');
const products = require('./data/products');
const dotenv = require('dotenv');
const connectDb = require ('./config/config');
const productRoutes = require('./routes/productsRoute');
const userRoutes = require('./routes/UsersRoute');
const orderRoutes = require ('./routes/orderRoute');
const  path = require('path');

//dotenv config
dotenv.config();

//connecting to mongodb database
connectDb();
const app = express();
//middleware for body parser
app.use(express.json());




app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

//-------deployment----


if(process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname,'/frontend/build')))

app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
})
}else{
    app.get('/', (req,res) =>{
        res.send('<h1>welcome to node server</h1>');
    });
}

app.use(errorHandler);

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`.inverse);
});