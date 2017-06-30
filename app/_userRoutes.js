var User         = require('./models/User')
var IMail        = require('./models/imail')
var usercontroller = require('./controllers/user')

module.exports = function(app){

  app.get('/users/:userName', function(req, res){

    User.findOne({ 'google.name' : req.params.userName }, function(err, user){
      if(err){
        return done(err)
      }

      if(!user){
        res.render('404', {
          data: {
              message: "Sorry, we don't have that user in our system."
          }
        })
      } else {
        res.render('user', {
            data: {
                title: 'Hello My Name is',
                user: user
            }
        });
      }
    })

  });

  app.get('/profile', isLoggedIn, function(req, res){
    res.render('user', {isAuthenticated: req.isAuthenticated()})
  })
}

// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
  // if a user is authenticated in the session and marked as active in the database, carry on
  if(req.isAuthenticated() && req.user.google.active)
    return next()

  // if a user is authenticated in the session but NOT marked as active in the database, go to the inactive page
  res.redirect('/inactive')
}
