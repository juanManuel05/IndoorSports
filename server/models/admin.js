const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            minlength:1,
            required:true,
            trim:true,
            uppercase:true,
            unique:true,
            validate:{
                validator:validator.isEmail,
                message:'{VALUE} is not a valid mail'
            }       
        },
        password:{
            type:String,
            require:true,
            minlength:6,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            }
        },
        name:{
            type:String,
            require:true,
            minlength:6
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a postive number')
                }
            }
        },
        tokens:[{
            token:{
                type:String,
                require:true
            }
        }]
    },
    {
        timestamps:true
    }
);

adminSchema.methods.generateToken = async function (){
    const admin = this;
    var token = jwt.sign({_id:admin._id.toString()},process.env.JWT_SECRET);
    admin.tokens = admin.tokens.concat({token});

    await admin.save();
    return token;
};

adminSchema.statics.findByCredentials = async function (email,password){

    const admin = await Admin.findOne({'email':email});
    
    if(!admin){
        throw new Error('not admin found');
    }

    const match = await bcrypt.compare(password,admin.password);
    if(!match){
        throw new Error('Credentials do not match');    
    }

    return admin;
};

//hash the plain text password before saving
adminSchema.pre('save',async function(next){
    const admin = this;

    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password,8);
    }

    next();

});

adminSchema.methods.toJSON = function(){
    var admin = this;
    var adminObject = admin.toObject();

    delete adminObject.password;
    delete adminObject.createdAt;
    delete adminObject.updatedAt;
    delete adminObject.tokens;
    

    return adminObject;
}

var Admin = mongoose.model('Admin',adminSchema);
module.exports = {Admin}