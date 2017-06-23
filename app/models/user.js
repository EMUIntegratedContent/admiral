// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserMail = require('../UserMail')

// define the schema for our user model
var userSchema = mongoose.Schema({
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        active       : Boolean
    }
});

/*
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/

userSchema.methods.registerNotificationOvserver = function(){
  /*this.google.name = "ERIC CARTMAN"

  this.save(function(err){
    if(err)
      return err
  })*/

  var obsv = new UserMail(this)
  obsv.sendMessage()
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
