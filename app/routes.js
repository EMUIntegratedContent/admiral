const User = require('../app/models/User');
const IMail = require('../app/models/imail');
const usercontroller = require('./controllers/user')
const acl = require('../authorization').getAcl()

module.exports = function(app, passport, mongoose){
  require('./_loginRoutes')(app, passport)
  require('./_userRoutes')(app)
  //require('./_adminRoutes')(app, acl)
  //require('./_apiRoutes')(app)

  var pageTitle = 'Express Vue';

  var exampleMixin = {
      methods: {
          hello: function () {
              console.log('Hello');
          }
      }
  }

  app.get('/', (req, res) => {
      res.render("index");
  })

  app.get('/api/mail/fetchimail', (req, res) => {
    IMail.find({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });

  app.get('/api/mail/fetchimailcount', (req, res) => {
    IMail.count({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });

  app.get('/imail/:imailId', (req, res) =>{
    IMail.findById(req.params.imailId, (err, imail) => {
      if (err) {
         return res.status(400).end();
      }
      res.render('system_modules/imail/imail_single', {
        imail: imail
      });
    });
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
