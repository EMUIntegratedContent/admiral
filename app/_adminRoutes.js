var User         = require('./models/user')

module.exports = function(app, acl){

  // =====================================
  // ADMIN ROUTES =======================
  // =====================================



  app.get('/admin/roles', acl.middleware(), function(req,res){

      User.find({}, function(err, users) {
        if(err)
          return err;

        var pageTitle = "User Permissions"

        var scope = {
          data: {
              users: users,
              pageTitle: pageTitle
          },
          vue: {
              head: {
                  title: pageTitle,
              },
              components: ['users']
          }
        }
        res.render('admin/permissions', scope)
      })
  });

/*
  // Route middleware to make sure a user is logged in
  function isAdmin(req, res, next){
    // if a user is authenticated in the session and marked as active in the database, carry on
    if(req.isAuthenticated()){
      acl.hasRole(req.user.id, 'admin', function(err, hasRole){
        return next()
      })
    }

    // if a user is authenticated in the session but NOT marked as active in the database, go to the inactive page
    res.redirect('/')
  }
*/
}
