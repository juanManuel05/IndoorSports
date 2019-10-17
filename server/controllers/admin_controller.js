var  _ = require('lodash');
var {Admin} = require('../models/admin');

exports.signUp = async (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var admin = new Admin(body);
    try {
        await admin.save();
        const token = await admin.generateToken();
        console.log(admin);
        res.status(201).send({ admin, token });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.login = async (req,res)=>{
    try {
        var admin = await Admin.findByCredentials(req.body.email,req.body.password);
        var token = await admin.generateToken();
        res.status(201).send({ admin, token });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.me = async (req,res)=>{
    try {
        res.send(req.admin);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.logout = async (req,res)=>{
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.send('logged out');
    } catch (e) {
        res.status(400).send(e);
    }
};


exports.update = async (req,res)=>{
    
        //get what im trying to update from request
        const updates = Object.keys(req.body);

        //whats allowed to update
        const allowedUpdates = ['email', 'password'];

        //check if its an valid opeation
        var isValidUpdate = updates.every((update)=> allowedUpdates.includes(update));
        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    try {    
        console.log(req.admin);
        updates.forEach((upd)=>{
            req.admin[upd] = req.body[upd];
        });

        await req.admin.save()
        res.send(req.admin)
    } catch (e) {        
        res.status(400).send(e);
    }
}