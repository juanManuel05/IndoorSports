const mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');
var {Sport} = require('./sport');

const playerSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        max:30,
        trim:true
    },
    lastName : {
        type:String,
        required:true,
        max:30,
        trim:true
    },
    password:{
        type:String,
        required:false,
        min:6,
        max:15,
        trim:true
    },
    phone: {
        type:String,
        required:false,
        max:20,
        unique:true
    },
    email: {
        type:String,
        required:false,
        max:30,
        trim:true,
        unique:false
    },
    sport:{
        type:String,
        required:false,
        max:30,
    },
    team:{
        type:String,
        required:false,
        max:30,
    },
    _sport:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Sport'
    },
    _team:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Team'
    }
},  {
    timestamps:true
    }
);


playerSchema.methods.toJSON = function(){
    var player = this;
    var playerObject = player.toObject();

    delete playerObject.password;
    delete playerObject.createdAt;
    delete playerObject.updatedAt;
    delete playerObject._sport;
    delete playerObject._team;
    return playerObject;
}

playerSchema.statics.setSports = function(players){

    players.forEach( async function(player){        
        var sport = await Sport.findById(player._sport);
           
        players.sport = sport.name;  
        console.log('FOR EACH');          
            
    });
    console.log('SET SPORTS');
    return players;
}

//vitual for full name
playerSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
});

//virtual for returning name of sport
playerSchema.virtual('sportName').get(function(){
    var sport = this.populate('_sport').execPopulate();
    return `${sport.name}`
});

//virtual for formatted date
playerSchema.virtual('formatted_date_of_birth').get(function(){
    return  moment(this.dateOfBirth).format('YYYY-MM-DD');
});

var Player = mongoose.model('Player',playerSchema);
module.exports = {Player}
 