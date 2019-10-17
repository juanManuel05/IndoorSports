const mongoose = require('mongoose');
const validator = require('validator');
var {Team} = require('./team'); 


const tourneamentSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },    
    startDate:{
        type:Date,
        required:true,
    },
    finishDate:{
        type:Date,
        required:true
    },
    sport:{
        type: String,
        required:true,
    }
});

//Teams which took part in the tourneament
tourneamentSchema.virtual('teams',{
    ref:'Team',
    localField:'_id',
    foreignField:'_tourneament'
});

//if a tourneament is deleted, the team who is taking part of the tourneament has to be updated.
tourneamentSchema.pre('remove', async function (next){
    const tourneament = this;

    var res= await Team.updateMany({_tourneament:tourneament._id},{_tourneament:null}, {new:true});
    // var teams = await Team.find({_tourneament:this._id});
    // console.log('TEAMS',teams);
    // teams.forEach((team)=>{
    //     team._tourneament = null;
    // });
    console.log(res);
    next();
});

var Tourneament = mongoose.model('Tourneament',tourneamentSchema); 
module.exports = {Tourneament};