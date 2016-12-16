var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	username: {
			type: String,
			trim: true},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});
mongoose.model('User', UserSchema);
UserSchema.path('username').required(true, "Username is required");
