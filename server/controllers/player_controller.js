//Node libraries
const _ = require('lodash');
const {ObjectID} = require('mongodb');

//Models
var {Player} = require('../models/player');
var {Sport} = require('../models/sport');
var {Team} = require('../models/team');

//Third parties Modules
//Sharp
var sharp = require('sharp');

//sendGrid
const {sendWelcomeEmail,sendCancelationEmail} = require('../email/account');


//METHODS

exports.add_player = async (req,res)=>{
    var playerData = _.pick(req.body,['firstName','lastName','password','phone','email','sport','team']);
    try{
       
        //seek sport
        var sport = await Sport.findOne({'name':playerData.sport});
        if(!sport){
            return res.status(404).send('Sport does not exist, pick up a valid sport');
        }
        playerData._sport = sport._id;

        //seek team
        var team = await Team.findOne({'name':playerData.team});
        if(!team){
            return res.status(404).send('Team does not exist, create team first');
        }
        playerData._team = team._id;      
        
        var player = new Player({
            firstName:playerData.firstName,
            lastName:playerData.lastName,
            password:playerData.password,
            phone:playerData.phone,
            email:playerData.email,
            sport:playerData.sport,
            team:playerData.team,
            _sport:playerData._sport ,   
            _team:playerData._team 
        });  
        var doc = await player.save(); 
        res.status(200).send(doc);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }

};

exports.get_player = async (req,res) =>{

    try {
        var player = await Player.findById(req.params.id);
        if(!player){
            res.status(404).send('not player found');
        }
        await player.populate('_sport').execPopulate();
        await player.populate('_team').execPopulate();
        res.status(200).send(player);    
    } catch (e) {
        res.status(400).send(e);
    }
    
}

exports.update_personal_info = async (req,res)=>{
    //var playerData = _.pick(req.body,['firstName','lastName','phone','email','sport']);
    //_id and _sport setearle el mismo
    try {

        //valid ID
        if(!ObjectID.isValid(req.params.id)){
            return res.status(404).send('ID not valid');
        }
        var player = await Player.findById(req.params.id);
        
        if(!player){
            return res.status(404).send('no player found');
        }else{
            var playerData = new Player ({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                phone:req.body.phone,
                email:req.body.email,
                _id:req.params.id,
                _sport:player._sport._id,
                _team:player._team._id
            });

            // player.firstName=req.body.firstName;
            // player.lastName=req.body.lastName;
            // player.phone=req.body.phone;
            // player.email=req.body.email;
            // player._id=req.params.id;
            // player._sport=player._sport._id;
            // player._team=player._team._id

            // player.save();
            
        
            var doc =await Player.findOneAndUpdate({_id:req.params.id},{$set:playerData}, {new:true}); 
        }
        res.status(200).send(doc);        
    }catch (e) {
        res.status(400).send(e);
    }
    
};

exports.players = async (req,res)=>{
    try {
        var docs = await Player.find({});
        //var players = await Player.setSports(docs);
        //console.log('CONTROLLER'),
        docs.forEach(async doc =>{
            //console.log(doc);
            var sport = await doc.populate('_sport').execPopulate();
            docs.sport = sport;
            console.log('FOR EACH',docs.sport);
        });

        //await docs.populate('_sport').execPopulate();
        console.log('FINAL', docs);
        res.status(200).send(docs);
    } catch (e) {
        res.status(400).send(e); 
    }
}

exports.delete_player = async (req,res)=>{
    try {
        
        //checkk ID is valid
        if(!ObjectID.isValid(req.params.id)){
            return res.status(404).send('ID not valid');
        }
        
        var doc = await Player.findByIdAndRemove(req.params.id);

        //wrong id
        if(!doc){
            return res.status(404).send('not player found');
        } 
        
        //succeed      
        res.status(200).send(doc);
    } catch (e) {
        res.status(400).send(e);
    }
}