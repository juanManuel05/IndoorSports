const mongoose = require('mongoose');
var {Player} = require('./player');

const sportSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:20,
        min:6,
        trim:true,
        enum:['football','basket','netball','crossfit'] 
    },
    summary:{
        type:String,
        required:true
    },    
    info:{
        type: mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'Info'
    }
},
    {
        timestamps:true
    }
); 

sportSchema.methods.toJSON = function(){
    var sport = this;
    var sportObject = sport.toObject();

    // delete sportObject.summary;
    // delete sportObject.info;
    delete sportObject.createdAt;
    delete sportObject.updatedAt;

    return sportObject;
}

sportSchema.virtual('players',{
    ref:'Player',
    localField:'_id',
    foreignField:'_sport'
})

//Middleware invkoed when a sport is deleted so their associated players get deleted as well
sportSchema.pre('remove', async function(next){
    const sport = this;
    console.log('REMOVE', sport);
    await Player.deleteMany({_sport:sport._id});
    next();
});


var Sport =  mongoose.model('Sport',sportSchema);
module.exports = {Sport};