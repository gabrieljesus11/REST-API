// Gettign the Newly created Mongoose Model we just created 
var Contract = require('../models/Contract.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the contract List
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
        // Return the contract list that was retured by the mongoose promise
        return Contracts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating contracts');
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
        // Saving the contract 
        var savedContract = await newContract.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating contract")
    }
}

exports.updateContract = async function (contract) {
    
    var id = {_id :contract._id}
    console.log(id)
    try {
        //Find the old contract Object by the Id
        var oldContract = await Contract.findOne(id);
        console.log (oldContract)
    } catch (e) {
        throw Error("Error occured while Finding the contract")
    }
    // If no old contract Object exists return false
    if (!oldContract) {
        return false;
    }
    //Edit the contract Object
    oldContract.nombreEstudiante = contract.nombreEstudiante != undefined ? contract.nombreEstudiante : oldContract.nombreEstudiante
    oldContract.apellidoEstudiante = contract.apellidoEstudiante != undefined ? contract.apellidoEstudiante : oldContract.apellidoEstudiante
    oldContract.correo = contract.correo != undefined ? contract.correo : oldContract.correo
    oldContract.telefono = contract.telefono != undefined ? contract.telefono : oldContract.telefono
    oldContract.horarioReferencia = contract.horarioReferencia != undefined ? contract.horarioReferencia : oldContract.horarioReferencia
    oldContract.campoInteres = contract.campoInteres != undefined ? contract.campoInteres : oldContract.campoInteres
    oldContract.idCurso = contract.idCurso != undefined ? contract.idCurso : oldContract.idCurso
    oldContract.estaFinalizado = contract.estaFinalizado != undefined ? contract.estaFinalizado : oldContract.estaFinalizado
    oldContract.estaCancelado = contract.estaCancelado != undefined ? contract.estaCancelado : oldContract.estaCancelado
    oldContract.estaAceptado = contract.estaAceptado != undefined ? contract.estaAceptado : oldContract.estaAceptado

    try {
        var savedContract = await oldContract.save()
        return savedContract;
    } catch (e) {
        throw Error("And Error occured while updating the contract");
    }
}

exports.deleteContract = async function (id) {
    console.log(id)
    // Delete the contract
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