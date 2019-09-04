var express     = require('express');
var router      = express.Router();
var chatbot  		= require('../controllers/chatbotController');

/**
* API end point for chatbot Route
*/
router.get('/api/session',   chatbot.getSession);
router.post('/api/message',  chatbot.recieveMessage);
module.exports = router;
