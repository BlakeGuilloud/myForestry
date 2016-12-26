const mongoose = require('mongoose');
const User = require('../model/userMin');
const enc = require('./encrypt');
const fs = require('fs');
const configData = fs.readFileSync(__dirname + '/../../config.json');
const conf = JSON.parse(configData);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myForestry');

mongoose.connection.once('connected', function() {
	console.log("Auth db connection successful");
  User.find({admin: true}, (err,data) => {
    console.log('admin creds for DEV: ');
    if (data.length === 0) {
      const adm = new User({
        userName: conf.api.auth.default.admin.userName,
        password: enc.encrypt(conf.api.auth.default.admin.password),
        admin: true
      });
      adm.save();
      console.log(adm);
    } else {
      console.log(data);
    }
  });
});


module.exports.find = (user) => {
	let result ;
	return new Promise(function(resolve,reject) {
	  User.findOne({userName: user.userName, password: user.password}, (err,item) => {
	    if (err) console.log(err);
			if (item.length != 0) {
				result = true;
			} else {
				result = false;
			}
			if (result != undefined) {
				resolve(true);
			} else {
				reject(false);
			}
	  });
	});
};
