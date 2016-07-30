var jwt = require('jsonwebtoken');

var config = require('../config.js')

exports.getToken = function(user){
	return jwt.sign(user, config.secretKey, {
		expiresIn: 3600
	})
};

exports.verifyOrdinaryUser = function(req, res, next){
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token

	if(token) {
		jwt.verify(token, config.secretKey, function (err, decoded){
			if(err){
				var error = new Error('Not authenticated!');
				error.status = 401;
				return next(error);
			} else{
				//if everything is good, save to request for use in other routes.
				req.decoded = decoded;
				next();
			}
		});
	} else {
		var error = new Error('no token provided!');
		error.Status = 403;
		return next(error);
	}

};

exports.verifyAdmin = function(req, res, next) {
	if(!req.decoded || !req.decoded._doc || !req.decoded._doc.admin) {
		var error = new Error('Not authenticated!');
		error.status = 401;
		return next(error);
	}
	else {
		next();
	}
}