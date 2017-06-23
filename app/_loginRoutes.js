module.exports = function(app, passport){
  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/login',
    passport.authenticate('google', {
      // Only show accounts that match emich.edu.
      hd: 'emich.edu',
      scope : ['profile', 'email']
  }));

  app.get('/logout', function(req, res) {
    console.log(req.logout())
    req.logout();
    res.redirect('/');
  });

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect : '/' }),
    function(req,res){
      res.redirect('/profile')
    }
  );

  app.get('/inactive', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('inactive')
  });
}
