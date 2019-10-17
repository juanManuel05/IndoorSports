//Models
var {Sport} = require('../models/sport');

//node libraries
const {ObjectID} = require('mongodb');

exports.add_sport = async (req,res)=>{
    var sport = new Sport ({
        name : req.body.name,
        summary : req.body.summary
    });

    try{
        var doc = await sport.save();
        res.status(200).send(doc);
    }catch(e){
        res.status(400).send(e);
    }
};

exports.sports = async (req,res) =>{

    try {
        var sports = await Sport.find({});
        res.status(200).send(sports);    
    } catch (e) {
        res.status(400).send(e);
    }
    
}

exports.get_sport = async(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }

    try {
        var doc = await Sport.findById(req.params.id);

        if(!doc){
            res.status(404).send('No sport found');
        }
        await doc.populate('players').execPopulate();
        res.status(200).send(doc);    
        
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete_sport = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }
    try {
        var doc = await Sport.findByIdAndRemove(req.params.id);
        
        if(!doc){
            return res.status(404).send('not sport found');
        }    
        res.status(200).send(doc);
    }catch (e) {
        res.status(400).send(e);   
    }
        
}

exports.update_sport = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('ID not valid');
    }

    var sportData = new Sport({
        name:req.body.name,
        summary:req.body.summary,
        info:req.body.info,
        _id:req.params.id
    });
    try {
        var doc = await Sport.findByIdAndUpdate(req.params.id,{$set:sportData},{new:true});        
        if(!doc){
            return res.status(404).send('not sport found');
        }    
        res.status(200).send(doc);
    }catch (e) {
        res.status(400).send(e);   
    }
        
}