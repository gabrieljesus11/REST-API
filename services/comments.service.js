// Gettign the Newly created Mongoose Model we just created 
var Comment = require('../models/Comment.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the comment List
exports.getComments = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Comments = await Comment.paginate(query, options)
        // Return the comment list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating comments');
    }
}

exports.createComment = async function (comment) {
    var newComment = new Comment({
        nombreEstudiante: comment.nombreEstudiante,
        apellidoEstudiante: comment.apellidoEstudiante,
        mail: comment.mail,
        comentario: comment.comentario,
        idCurso: comment.idCurso,
        puntaje: comment.puntaje,
        estaAceptado: comment.estaAceptado,
        idCurso: ObjectId(comment.idCurso),
        estaAceptado: comment.estaAceptado,
        estaBloqueado: comment.estaBloqueado
    })

    try {
        // Saving the comment 
        var savedComment = await newComment.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating comment")
    }
}

exports.updateComment = async function (comment) {
    
    var id = {_id :comment._id}
    console.log(id)
    try {
        //Find the old comment Object by the Id
        var oldComment = await Comment.findOne(id);
        console.log (oldComment)
    } catch (e) {
        throw Error("Error occured while Finding the comment")
    }
    // If no old comment Object exists return false
    if (!oldComment) {
        return false;
    }
    //Edit the comment Object
    oldComment.nombreEstudiante = comment.nombreEstudiante != undefined ? comment.nombreEstudiante : oldComment.nombreEstudiante
    oldComment.mail = comment.mail != undefined ? comment.mail : oldComment.mail
    oldComment.comentario = comment.comentario != undefined ? comment.comentario : oldComment.comentario
    oldComment.idCurso = comment.idCurso != undefined ? comment.idCurso : oldComment.idCurso
    oldComment.puntaje = comment.puntaje != undefined ? comment.puntaje : oldComment.puntaje
    oldComment.estaAceptado = comment.estaAceptado != undefined ? comment.estaAceptado : oldComment.estaAceptado
    oldComment.estaBloqueado = comment.estaBloqueado != undefined ? comment.estaBloqueado : oldComment.estaBloqueado

    try {
        var savedComment = await oldComment.save()
        return savedComment;
    } catch (e) {
        throw Error("And Error occured while updating the comment");
    }
}

exports.deleteComment = async function (id) {
    console.log(id)
    // Delete the comment
    try {
        var deleted = await Comment.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comment Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the comment")
    }
}