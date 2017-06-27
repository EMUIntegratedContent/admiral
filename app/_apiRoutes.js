var User         = require('./models/User')
var IMail        = require('./models/imail')
var usercontroller = require('./controllers/user')

module.exports = function(app){

  app.get('/api/users', async (req, res) =>{
    try {
      const usersPromise = await usercontroller.getAllUsers()
      return res.status(200).json(usersPromise);
    } catch (error) {
      return res.status(500).json(error);
    }
  })

}
