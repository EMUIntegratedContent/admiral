var User         = require('./models/User')
var usercontroller = require('./controllers/user')

module.exports = function(app, acl){

  // =====================================
  // ADMIN ROUTES =======================
  // =====================================



  //app.get('/admin/permissions', acl.middleware(), function(req,res){
  app.get('/admin/users', async (req,res) =>{

    try {
      //const users = await usercontroller.getAllUsers() // Remember: getAllUsers is in the controller.

      var pageTitle = "System Users"
      var scope = {
          data: {
              title: pageTitle,
              users: {},
              value: null
          },
          vue: {
              head: {
                  title: pageTitle,
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
              components: []
          }
      }
      res.render('admin/users', scope)
    } catch (error) {
      return res.status(500).json(error);
    }
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
