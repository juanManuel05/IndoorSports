//Models
var {Team} = require('../models/team');
var {Player} = require('../models/player');
var {Sport} = require('../models/sport');

//node libraries
const {ObjectID} = require('mongodb');

exports.add_team = async (req,res)=>{
    var team = new Team ({
        name : req.body.name,
        sport:req.body.sport,
        players:req.body.players,
        _tourneament:req.body.tourneament
    });

    try{
        var doc = await team.save();

        //Update players collection  wtih the players just created
        team.players.forEach( async player => {

            var sport = await Sport.findOne({'name':team.sport});
            console.log(player);

            var newPlayer = new Player({
                firstName:player.firstName,
                lastName:player.lastName,
                password:player.password,
                phone:player.phone,
                email:player.email,
                _sport:sport._id,   
                _team:doc._id//
            });
            console.log('NEW PLAYER',newPlayer);
            await newPlayer.save();
        });

        res.status(200).send(doc);
    }catch(e){
        res.status(400).send(e);
    }
};

exports.get_team = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }
    try{
        var doc = await Team.findById(req.params.id);
       
        if(!doc){
            res.status(404).send(doc);
        }

        if(doc._tourneament){
            await doc.populate('_tourneament').execPopulate();
        }
        
        res.status(200).send(doc);
    }catch(e){
        res.status(400).send(e);
    }
};

exports.teams = async (req,res) =>{

    try {
        var teams = await Team.find({});
        res.status(200).send(teams);    
    } catch (e) {
        res.status(400).send(e);
    }
    
};

exports.delete_team = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }
    try {
        var doc = await Team.findByIdAndRemove(req.params.id);
        
        if(!doc){
            return res.status(404).send('not sport found');
        }    
        res.status(200).send(doc);
    }catch (e) {
        res.status(400).send(e);   
    }
        
}

exports.update_team = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }

    var teamData = new Sport({
        name:req.body.name,
        sport:req.body.sport,
        players:req.body.players,
        _id:req.params.id
    });
    try {
        var doc = await Team.findByIdAndUpdate(req.params.id,{$set:teamData},{new:true});        
        if(!doc){
            return res.status(404).send('not team found');
        }    
        res.status(200).send(doc);
    }catch (e) {
        res.status(400).send(e);   
    }
        
}
