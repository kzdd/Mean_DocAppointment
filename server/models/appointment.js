//Model
var mongoose = require('mongoose');

//AppointmentSchema
var AppointmentSchema = new mongoose.Schema({
	patient: {
			type: String,
			trim: true},
	time: { type: String },
	date: { type: String },
	complain: { type: String, trim: true},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});
mongoose.model('Appointment', AppointmentSchema);
AppointmentSchema.path('complain').required(true, "Complain field is required!");
AppointmentSchema.path('patient').required(true, "Patient field is required!");
AppointmentSchema.path('time').required(true, "Time field is required!");
AppointmentSchema.path('date').required(true, "Date field is required!");
