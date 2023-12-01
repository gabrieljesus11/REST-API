var ContactService = require('../services/contacts.service');

exports.createContact = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Contact = "Nombre Estudiante:" + req.body.nombreEstudiante + 
    " Apellido Estudiante: " + req.body.apellidoEstudiante +
    " Correo Estudiante: " + req.body.correo +
    " Telefono Estudiante: " + req.body.telefono + 
    " Comentarios: " + req.body.comentarios
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdContact = await ContactService.createContact(Contact)
        return res.status(201).json({createdContact, message: "Created Contact Succesfully"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log("El error es: " + e)
        return res.status(400).json({status: 400, message: "Contact Creation was Unsuccesfull"})
    }
}