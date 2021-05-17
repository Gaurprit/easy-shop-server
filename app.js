const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())

const api = process.env.API_URL;

const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);


//const Product = require('./models/product');


//Database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Shopping-App'
})
.then(()=>{
    console.log('Shopping App database connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Development
//app.listen(3000);

//Production
var server=app.listen(process.env.PORT || 3000, function(){
    var port =server.address().port;
    console.log("Express is Working on port"+port)
})
{/*
app.listen(3000, ()=>{
    console.log(api);

    console.log('server is running http://localhost:3000');
})
*/}
