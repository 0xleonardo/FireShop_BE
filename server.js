const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const corsOptions ={
     origin:'http://localhost:3000',
     credentials:true,            //access-control-allow-credentials:true
     optionSuccessStatus:200
}

const config = require('./config');

const pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public/app'));

app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
     next();
     });

app.use(morgan('dev'));
app.use(cors(corsOptions));

const authRouter = require('./app/routes/authenticate')(express,pool, jwt, config.secret);
app.use('/api/user', authRouter);

const categoryRouter = require('./app/routes/categories')(express,pool, jwt, config.secret);
app.use('/api', categoryRouter);

const itemRouter = require('./app/routes/items')(express,pool, jwt, config.secret);
app.use('/api', itemRouter);

const orderRouter = require('./app/routes/orders')(express,pool, jwt, config.secret);
app.use('/api', orderRouter);

const userRouter = require('./app/routes/user')(express,pool, jwt, config.secret);
app.use('/api/user', userRouter);

const adminRouter = require('./app/routes/admin')(express,pool, jwt, config.secret);
app.use('/api/admin', adminRouter);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});


app.listen(config.port);

console.log('Running on port ' + config.port);
