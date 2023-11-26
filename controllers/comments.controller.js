var CommentService = require('../services/comments.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.createComment = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Comment = {
        nombreEstudiante: req.body.nombreEstudiante,
        mail: req.body.mail,
        comentario: req.body.comentario,
        idCurso: req.body.idCurso,
        puntaje: req.body.puntaje,
        estaAceptado: req.body.estaAceptado,
        estaBloqueado: req.body.estaBloqueado
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComment = await CommentService.createComment(Comment)
        return res.status(201).json({createdComment, message: "Created Comment Succesfully"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log("El error es: " + e)
        return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }
}

exports.getCommentsForCourse = async function (req, res, next){
    if (!req.body.idCurso) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {idCurso: req.body.idCurso}
    
    try {
        var Comments = await CommentService.getComments(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comments, message: "Comments Recieved Succesfully"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateComment = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    
    var Comment = {
        _id: req.body.id,
        nombreEstudiante: req.body.nombreEstudiante ? req.body.nombreEstudiante : null,
        mail: req.body.mail ? req.body.mail  : null,
        comentario: req.body.comentario ? req.body.comentario : null,
        idCurso: req.body.telefono ? req.body.telefono : null,
        puntaje: req.body.puntaje ? req.body.puntaje : null,
        estaAceptado: req.body.estaAceptado ? req.body.estaAceptado : null,
        estaBloqueado: req.body.estaBloqueado ? req.body.estaFinalizado : null
    }

    try {
        var updatedComment = await CommentService.updateComment(Comment)
        return res.status(200).json({status: 200, data: updatedComment, message: "Succesfully Updated Comment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeComment = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await CommentService.deleteComment(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


    
    
