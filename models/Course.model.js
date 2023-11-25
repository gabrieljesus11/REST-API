const { SchemaTypes } = require('mongoose')
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CourseSchema = new mongoose.Schema({
    titulo: {type: String},
    descripcion: {type: String},
    fechaInicio: {type: Date},
    duración: {type: Number},
    horarios: {type: String},
    precio: {type: Number},
    moneda: {type: String},
    idResponsable: {type: mongoose.Schema.Types.ObjectId},
    imagePath: {type: String}
})

CourseSchema.plugin(mongoosePaginate)
const Course = mongoose.model('Course', CourseSchema)

module.exports = Course;