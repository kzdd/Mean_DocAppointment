var express = require("express"),
    path = require("path"),
    app = express (),
    bodydParser = require("body-parser");
//app setup for sever, static file server etc.
app.use(bodydParser.json());
app.use(express.static(path.join(__dirname, './client')));
var server = app.listen(8000, function(){console.log("server is on@8000!!")})

//requesting routes
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
