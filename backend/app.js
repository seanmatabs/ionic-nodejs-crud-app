let express = require('express'),
	path = require('path'),
	mysql = require('mysql'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
    createError = require('http-errors'),
	dataBaseConfig = require('./db/db');

// connection configurations
const mc = mysql.createConnection({
	                                  host: 'localhost',
	                                  user: 'root',
	                                  password: 'saforlife',
	                                  database: 'mydb'
                                  });

// connect to database
mc.connect({},() => {
	        console.log('Database connected successfully ')
        },
        error => {
	        console.log('Could not connected to database : ' + error)
        }
);

const userRoute = require('./routes/user.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	                              extended: false
                              }));
app.use(cors());

// RESTful API root
app.use('/api', userRoute);

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('PORT Connected on: ' + port)
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
