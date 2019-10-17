//config
require('./config/config');
var {mongoose} = require('./db/mongoose');

//node libraries
const express = require('express');
const bodyParser = require('body-parser');

//Routes
//  var playerRoutes = require('./routes/player_router');
//  var sportRoutes = require('./routes/sport_router');
//  var teamRoutes = require('./routes/team_router');
//  var tourneamentRoutes = require('./routes/tourneament_router');
 var indoorSportsRoutes = require('./routes/indoorSports_router');


//server

var port = process.env.PORT;
var app = express();
app.use(bodyParser.json());

// app.use('/player',playerRoutes);
// app.use('/sport',sportRoutes);
// app.use('/team',teamRoutes);
// app.use('/tourneament',tourneamentRoutes);
app.use('/indoorSports',indoorSportsRoutes);

app.listen(port,()=>{
    console.log(`Starting at port ${port}`);
});



module.exports = {app};