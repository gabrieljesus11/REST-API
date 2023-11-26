var ContractService = require('../services/contracts.service');


// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getContracts = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Contracts = await ContractService.getContracts({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contracts, message: "Contacts Recieved Succesfully"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createContract = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Contract = {
        nombreEstudiante: req.body.nombreEstudiante,
        apellidoEstudiante: req.body.apellidoEstudiante,
        correo: req.body.correo,
        telefono: req.body.telefono,
        horarioReferencia: req.body.horarioReferencia,
        campoInteres: req.body.campoInteres,
        idCurso: req.body.idCurso,
        estaAceptado: req.body.estaAceptado,
        estaFinalizado: req.body.estaFinalizado,
        estaCancelado: req.body.estaCancelado
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdContract = await ContractService.createContract(Contract)
        return res.status(201).json({createdContract, message: "Created Contract Succesfully"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log("El error es: " + e)
        return res.status(400).json({status: 400, message: "Contract Creation was Unsuccesfull"})
    }
}

exports.getContractsForCourse = async function (req, res, next){
    if (!req.body.idCurso) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {idCurso: req.body.idCurso}
    
    try {
        var Contracts = await ContractService.getContracts(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contracts, message: "Contracts Recieved Succesfully"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateContract = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    
    var Contract = {
        _id: req.body.id,
        nombreEstudiante: req.body.nombreEstudiante ? req.body.nombreEstudiante : null,
        apellidoEstudiante: req.body.apellidoEstudiante ? req.body.apellidoEstudiante  : null,
        correo: req.body.correo ? req.body.correo : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        horarioReferencia: req.body.horarioReferencia ? req.body.horarioReferencia : null,
        campoInteres: req.body.campoInteres ? req.body.campoInteres : null,
        idCurso: req.body.idCurso ? req.body.idCurso : null,
        estaAceptado: req.body.estaAceptado ? req.body.estaAceptado : null,
        estaFinalizado: req.body.estaFinalizado ? req.body.estaFinalizado : null,
        estaCancelado: req.body.estaCancelado ? req.body.estaCancelado : null
    }

    try {
        var updatedContract = await ContractService.updateContract(Contract)
        return res.status(200).json({status: 200, data: updatedContract, message: "Succesfully Updated Contract"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeContract = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await ContractService.deleteContract(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


    
    
