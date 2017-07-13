exports.getUserId = function(req, res) {
	if (typeof req.user !== 'undefined') {
    console.log(req.user.id)
		return req.user.id;
	}

	return false;
};
