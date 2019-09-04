var AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk

var assistant = new AssistantV2({
  version: '2019-09-03'
});

module.exports.getSession = function(req, res, next){
	assistant.createSession({
	    assistant_id: process.env.ASSISTANT_ID || '{assistant_id}',
	  }, function (error, response) {
	    if (error) {
	      return res.send(error);
	    } else {
	      return res.send(response);
	    }
	});
};


module.exports.recieveMessage = function(req, res, next){
	 var assistantId = process.env.ASSISTANT_ID || '<assistant-id>';
	  if (!assistantId || assistantId === '<assistant-id>') {
	    return res.json({
	      'output': {
	        'text': 'The app has not been configured with a <b>ASSISTANT_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
	      }
	    });
	  }

	  var textIn = '';

	  if(req.body.input) {
	    textIn = req.body.input.text;
	  }

	  var payload = {
	    assistant_id: assistantId,
	    session_id: req.body.session_id,
	    input: {
	      message_type : 'text',
	      text : textIn
	    }
	  };

	  // Send the input to the assistant service
	  assistant.message(payload, function (err, data) {
	    if (err) {
	      const status = (err.code  !== undefined && err.code > 0)? err.code : 500;
	      return res.status(status).json(err);
	    }

	    return res.json(data);
	  });
}	
