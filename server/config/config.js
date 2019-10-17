var env = process.env.NODE_ENV || 'development'

if(env === 'development' || env === 'test'){
    var config = require('./config.json');
    var envirConfig = config[env];
}

Object.keys(envirConfig).forEach((key) =>{
    process.env[key]=envirConfig[key];
});