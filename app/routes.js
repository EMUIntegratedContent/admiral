var User = require('../app/models/user');
var IMail = require('../app/models/imail');

module.exports = function(app, passport, acl, mongoose){
  require('./_loginRoutes')(app, passport)
  require('./_userRoutes')(app)
  require('./_adminRoutes')(app, acl)

  var pageTitle = 'Express Vue';

  var exampleMixin = {
      methods: {
          hello: function () {
              console.log('Hello');
          }
      }
  }

  app.get('/', function(req, res){

    //https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users/14103703
    User.find({}, function(err, users) {
      /*
      acl.addUserRoles( req.user.id , 'admin', function(err){
        console.log("Role ADMIN added to user " + req.user.id + "!")
        return err
      })
      */
      res.render("index");
    })
  })

  app.get('/mail/fetchimail', (req, res) => {
    IMail.find({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });

  app.get('/mail/fetchimailcount', (req, res) => {
    IMail.count({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });
}

// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
  // if a user is authenticated in the session and marked as active in the database, carry on
  if(req.isAuthenticated() && req.user.google.active)
    return next()

  // if a user is authenticated in the session but NOT marked as active in the database, go to the inactive page
  res.redirect('/inactive')
}
