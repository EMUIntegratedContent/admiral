var User         = require('./models/user')
var IMail        = require('./models/imail')

module.exports = function(app){

  app.get('/users', function(req, res){
    //https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users/14103703

    var pageTitle = "System Users"
    var exampleMixin = {
        methods: {
            hello: function () {
                console.log('Hello');
            }
        }
    }

    User.find({}, function(err, users) {
      var scope = {
        data: {
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
      res.render('users', scope)
    })
  })

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
    res.render('user', {
        isAuthenticated: req.isAuthenticated,
        user: req.user  // get the user out of session and pass to template
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
