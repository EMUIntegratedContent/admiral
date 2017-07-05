const admin = require('./admin')
const users = require('./users')

const api_admin = require('../api/admin')
const api_user = require('../api/user')
const acl   = require('../../authorization').getAcl()

module.exports = function(app, router, passport, mongoose){

  router.get('/', (req, res) => {
      res.render("index")
  })

  router.get('/login',
    passport.authenticate('google', {
      // Only show accounts that match emich.edu.
      hd: 'emich.edu',
      scope : ['profile', 'email']
  }));

  router.get('/logout', function(req, res) {
    console.log(req.logout())
    req.logout();
    res.redirect('/');
  });

  // the callback after google has authenticated the user
  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect : '/' }),
    function(req,res){
      res.redirect('/profile')
    }
  );

  router.get('/inactive', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('inactive')
  });

  router.get('/profile', isActiveUser, function(req, res){
    res.render('user', {isAuthenticated: req.isAuthenticated()})
  })

  /*
  router.get('/api/mail/fetchimail', (req, res) => {
    IMail.find({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });

  router.get('/api/mail/fetchimailcount', (req, res) => {
    IMail.count({'recipients': { $in: [mongoose.Types.ObjectId(req.session.passport.user)] }}, (err, imails) => {
      if (err) {
         return res.status(400).end();
      }
      res.json(imails);
    });
  });

  router.get('/imail/:imailId', (req, res) =>{
    IMail.findById(req.params.imailId, (err, imail) => {
      if (err) {
         return res.status(400).end();
      }
      res.render('system_modules/imail/imail_single', {
        imail: imail
      });
    });
  })
  */
  router.use('/admin', admin) // Administrative routes
  router.use('/users', users) // User routes

  router.use('/api/admin', api_admin) // EXTERNAL API Admin routes
  router.use('/api/user', api_user) // EXTERNAL API User routes

  return router
}

// Route middleware to make sure a user is logged in
function isActiveUser(req, res, next){
  acl.hasRole(req.user.id, 'user', (err, hasRole) => {
    // if a user has at least the 'user' role, log him in
    if(hasRole){
      return next()
    }
    // if not, go to the inactive page
    res.redirect('/inactive')
  })
}
