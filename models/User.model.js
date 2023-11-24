var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    usuario: {type: String},
    password: {type: String},
    nombre: {type: String},
    apellido: {type: String},
    telefono: {type: String},
    titulo: {type: String},
    experiencia: {type: String},
    imageSource: {type: String},
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;