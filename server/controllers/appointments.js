var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports = (function()
{
	return {
		addNewAppt: function(req, res)
		{
			Appointment.find({date: req.body.date}, function(err, results)
			{
				if (err)
				{

				}
				else
				{
					var timeslot = 'false';
					var userAppt = 'false';
					for(var j in results)
					{
						if (req.body.patient == results[j].patient)
						{
							userAppt = 'true';
						}
					}
					if (userAppt == 'true')
					{
						res.json({status: 'result', result: 'You have already scheduled an appointment for this day. Please pick new day.'})
					}
					else
					{
						if (results.length >= 3)
						{
							res.json({status: 'result', result: 'Sorry, but there are no more available appointments on this day. Please pick a new day.'})
						}
						else
						{
							for(var i in results)
							{
								if(req.body.time == results[i].time)
								{
									timeslot = 'true';
								}
							}
							if (timeslot == 'true')
							{
								res.json({status: 'result', result: 'Sorry, but someone has already picked that time. Please select another time.'})
							}
							else
							{
								var appointment = new Appointment(req.body);
								appointment.save(function(err, results)
								{
									if(err)
									{
										res.json({status:'result', result:err});
									}
									else
									{
										res.json({status:'result', result: 'Appointment Made'});
									}
								})
							}
						}
					}
				}
			})
		},
		getAppointments: function(req, res)
		{
			Appointment.find({}, function(err, results)
			{
				if(err)
				{
					res.json({status: 'failed', err:err});
				}
				else
				{
					res.json(results);
				}
			})
		},
		destroyAppointments: function(req, res)
		{
			Appointment.remove({_id: req.params.id}, function(err, results)
			{
				if(err)
				{
					res.json({status: 'failed', err: err});
				}
				else
				{
					res.json({status: 'success'});
				}
			})
		}
	}
})();
