var {Tourneament} = require('../models/tourneament');
const {ObjectID} = require('mongodb');
exports.add = async (req,res)=>{
    var tourneament =  new Tourneament({
        name:req.body.name,
        startDate : req.body.startDate,
        finishDate :req.body.finishDate,    
        sport:req.body.sport
    });
    
    try {
        var doc = await tourneament.save();
        res.status(200).send(doc);   
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.teamsInTourneament = async (req,res)=>{
   
    try {
        var tourneament = await Tourneament.findById(req.params.id);
        await tourneament.populate('teams').execPopulate();
        res.status(200).send(tourneament.teams);

    } catch (e) {
        res.status(400).send(e);   
    }
};

exports.deleteAll = async (req,res)=>{
    
    try {
        var docs = await Tourneament.deleteMany({});
        res.status(200).send(docs);   
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete_tourneament = async (req,res)=>{
    try {
        var doc = await Tourneament.findById(req.params.id);
        doc.remove();
        res.status(200).send('updated');   
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.update_tourneament = async (req,res)=>{
    var newData = new Tourneament({
        name:req.body.name,
        startDate : req.body.startDate,
        finishDate :req.body.finishDate,    
        sport:req.body.sport,  
        _id:  req.params.id
    });     
    try {
        var doc = await Tourneament.findByIdAndUpdate(req.params.id,{$set:newData},{new:true});
        res.status(200).send(doc);   
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.tourneaments = async (req,res) =>{
    try {
        var docs = await Tourneament.find({});
        res.status(200).send(docs);    
    } catch (e) {
        res.status(400).send(e);
    }    
};

exports.get_tourneament = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }
    try{
        var doc = await Tourneament.findById(req.params.id);
       
        if(!doc){
            res.status(404).send(doc);
        }
        
        res.status(200).send(doc);
    }catch(e){
        res.status(400).send(e);
    }
};