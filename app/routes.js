var User = require('../app/models/user');

module.exports = function(app, passport, acl){
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

    var socketio = req.app.get('socketio');
    socketio.sockets.emit('send', {message: 'urdum'});

    //https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users/14103703
    User.find({}, function(err, users) {
      /*
      acl.addUserRoles( req.user.id , 'admin', function(err){
        console.log("Role ADMIN added to user " + req.user.id + "!")
        return err
      })
      */
      var scope = {
        data: {
            title: pageTitle,
            message: 'Hello!',
            users: users,
            loggedStatus: req.user
        },
        vue: {
            head: {
                title: pageTitle,
                meta: [
                    { property:'og:title', content: pageTitle},
                    { name:'twitter:title', content: pageTitle}
                ],
                structuredData: {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": "http://www.your-company-site.com",
                    "contactPoint": [{
                        "@type": "ContactPoint",
                        "telephone": "+1-401-555-1212",
                        "contactType": "customer service"
                    }]
                }
            },
            components: ['users', 'messageComp'],
            mixins: [exampleMixin]
        }
      }
      res.render('index', scope)
    })
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
