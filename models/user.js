const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    }
    , Role: {
        type: String,
        enum: ['ROLE_ADMIN', 'ROLE_USER'],
        require: true
    },

    SmartHubs : [{
        type : Schema.Types.ObjectId,
        ref : 'smartHub',
        required:true,
        default : null
    }]

});

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err)
            return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = User = mongoose.model('User', UserSchema)