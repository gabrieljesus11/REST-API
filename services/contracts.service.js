// Gettign the Newly created Mongoose Model we just created 
var Contract = require('../models/Contract.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the course List
exports.getContracts = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Contracts = await Contract.paginate(query, options)
        // Return the course list that was retured by the mongoose promise
        return Contracts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Courses');
    }
}

exports.createContract = async function (contract) {
    var newContract = new Contract({
        nombreEstudiante: contract.nombreEstudiante,
        apellidoEstudiante: contract.apellidoEstudiante,
        correo: contract.correo,
        telefono: contract.telefono,
        horarioReferencia: contract.horarioReferencia,
        campoInteres: contract.campoInteres,
        estaAceptado: contract.estaAceptado,
        idCurso: ObjectId(contract.idCurso),
        estaFinalizado: contract.estaFinalizado,
        estaCancelado: contract.estaCancelado
    })

    try {
        // Saving the course 
        var savedContract = await newContract.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating course")
    }
}

exports.updateContract = async function (contract) {
    
    var id = {_id :contract._id}
    console.log(id)
    try {
        //Find the old course Object by the Id
        var oldContract = await Contract.findOne(id);
        console.log (oldContract)
    } catch (e) {
        throw Error("Error occured while Finding the contract")
    }
    // If no old course Object exists return false
    if (!oldContract) {
        return false;
    }
    //Edit the course Object
    oldContract.nombreEstudiante = course.nombreEstudiante != undefined ? course.nombreEstudiante : oldContract.nombreEstudiante
    oldContract.apellidoEstudiante = course.apellidoEstudiante != undefined ? course.apellidoEstudiante : oldContract.apellidoEstudiante
    oldContract.correo = course.correo != undefined ? course.correo : oldContract.correo
    oldContract.telefono = course.telefono != undefined ? course.telefono : oldContract.telefono
    oldContract.horarioReferencia = course.horarioReferencia != undefined ? course.horarioReferencia : oldContract.horarioReferencia
    oldContract.campoInteres = course.campoInteres != undefined ? course.campoInteres : oldContract.campoInteres
    oldContract.idCurso = course.idCurso != undefined ? course.idCurso : oldContract.idCurso
    oldContract.estaFinalizado = course.estaFinalizado != undefined ? course.estaFinalizado : oldContract.estaFinalizado
    oldContract.estaCancelado = course.estaCancelado != undefined ? course.estaCancelado : oldContract.estaCancelado
    oldContract.estaAceptado = course.estaAceptado != undefined ? course.estaAceptado : oldContract.estaAceptado

    try {
        var savedContract = await oldContract.save()
        return savedContract;
    } catch (e) {
        throw Error("And Error occured while updating the contract");
    }
}

exports.deleteContract = async function (id) {
    console.log(id)
    // Delete the course
    try {
        var deleted = await Contract.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Contract Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the contract")
    }
}