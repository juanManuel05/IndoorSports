const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        uppercase:true,
        unique:true
    },
    sport:{
        type:String,
        trim:true,
        required:true,
        enum:['football','basket','netball','crossfit']        
    },
    players:{
        type:[
            {
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
                phone : {
                    type:String,
                    required:false,
                    max:20,
                    unique:true
                }

            }
        ],
        required:false,
    },    
    _tourneament:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Tourneament'
    }
    // _sport:{
    //     type: Schema.Types.ObjectId,
    //     required:false,
    //     ref:'Sport'
    // }
});

//Players associated with current team
teamSchema.virtual('teamPlayers',{
    ref:'Player',
    localField:'_id',
    foreignField:'_team'
})

teamSchema.virtual('captain').get(()=>{
    return this._player.fullName;
})

teamSchema.virtual('captain',{
    ref:'Player',
    localField:'_id',
    foreignField:'_team'
});

var Team = mongoose.model('Team',teamSchema);
module.exports = {Team};