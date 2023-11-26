const { SchemaTypes } = require('mongoose')
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ContractSchema = new mongoose.Schema({
    nombreEstudiante: {type: String},
    apellidoEstudiante: {type: String},
    correo: {type: String},
    telefono: {type: String},
    horarioReferencia: {type: String},
    campoInteres: {type: String},
    idCurso: {type: mongoose.Schema.Types.ObjectId},
    estaAceptado: {type: Boolean},
    estaFinalizado: {type: Boolean},
    estaCancelado: {type: Boolean}
})

ContractSchema.plugin(mongoosePaginate)
const Contract = mongoose.model('Contract', ContractSchema)

module.exports = Contract;