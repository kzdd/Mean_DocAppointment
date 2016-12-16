module.exports = function(app){

  var users = require ('./../controllers/users.js');
  var appointments = require ('./../controllers/appointments.js');

    app.get('/', function(req,res)
    {
      res.render ('index');
    })

    app.post('/checkUserExists/:any', function(req,res)
    {
      users.checkUserExists(req,res);
    })

    app.post ('/addUser', function(req,res)
    {
      users.addUser(req,res);
    })

    app.post('/addNewAppt', function(req,res)
    {
      appointments.addNewAppt(req,res);

    })

  app.get('/getAppointments', function(req,res)
    {
      appointments.getAppointments(req,res);

    })
  app.delete('/destroyAppointment/:id', function(req,res)
    {
      appointments.destroyAppointment(req,res);
    })
};
