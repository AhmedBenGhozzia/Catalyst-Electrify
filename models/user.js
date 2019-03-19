const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
email : {
    type : String,
    require : true
},
password : {
    type : String,
    require : true
}
,Role : {
    type : String,
    enum : ['Admin', 'User'],
    require : true
}

});
module.exports = User = mongoose.model('User',UserSchema)