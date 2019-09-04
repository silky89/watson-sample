var http 		     = require('http');
var express 	   = require('express');
var app 		     = express();
var bodyParser 	 = require('body-parser');
const cors     	 = require('cors');

require('dotenv').config();
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/',require('./app/routes/chatbotRoutes.js')); //Call all chatbot API routes
var server = app.listen(3000, function() {
    console.log("app running on 3000");
});
