const { SchemaTypes } = require('mongoose')
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CommentSchema = new mongoose.Schema({
    nombreEstudiante: {type: String},
    mail: {type: String},
    comentario: {type: String},
    idCurso: {type: String},
    puntaje: {type: Number},
    estaAceptado: {type: Boolean},
    estaBloqueado: {type: Boolean}
})

CommentSchema.plugin(mongoosePaginate)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;