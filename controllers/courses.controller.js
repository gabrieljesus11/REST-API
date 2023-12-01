var CourseService = require('../services/courses.service');
var UserService = require('../services/user.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getCourses = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? +req.query.page : 1
    var limit = req.query.limit ? +req.query.limit : 10;
    try {
        var Courses = await CourseService.getCourses({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Courses, message: "Courses Recieved Succesfully"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCourse = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Course = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        duracion: req.body.duracion,
        horarios: req.body.horarios,
        precio: req.body.precio,
        moneda: req.body.moneda,
        idResponsable: req.body.idResponsable,
        imagePath: req.body.imagePath
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 1;
        let filtro= {_id: req.body.idResponsable}
        
        var responsible = await UserService.getUsers(filtro, page, limit)
        var createdCourse = await CourseService.createCourse(Course)
        responsible = responsible.docs[0]
        responsible.courses.push(createdCourse._id)
        console.log("Mi responsable es: "+ responsible)
        var updatedResponsible = await UserService.updateUser(responsible)
        return res.status(201).json({createdCourse, message: "Created Course Succesfully"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log("El error es: " + e)
        return res.status(400).json({status: 400, message: "Course Creation was Unsuccesfull"})
    }
}

exports.getCoursesForResponsible = async function (req, res, next){
    if (!req.body.idResponsable) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {idResponsable: req.body.idResponsable}
    
    try {
        var Courses = await CourseService.getCourses(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Courses, message: "Courses Recieved Succesfully"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateCourse = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id is necessary to perform this action"})
    }

    
    var Course = {
        _id: req.body.id,
        titulo: req.body.titulo ? req.body.titulo : null,
        descripcion: req.body.descripcion ? req.body.descripcion  : null,
        fechaInicio: req.body.fechaInicio ? req.body.fechaInicio : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        horarios: req.body.fechaInicio ? req.body.fechaInicio : null,
        precio: req.body.precio ? req.body.precio : null,
        moneda: req.body.moneda ? req.body.moneda : null,
        idResponsable: req.body.idResponsable ? req.body.idResponsable : null,
        imagePath: req.body.imagePath ? req.body.imagePath : null
    }

    try {
        var updatedCourse = await CourseService.updateCourse(Course)
        return res.status(200).json({status: 200, data: updatedCourse, message: "Succesfully Updated Course"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCourse = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await CourseService.deleteCourse(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


    
    
