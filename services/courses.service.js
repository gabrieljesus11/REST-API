// Gettign the Newly created Mongoose Model we just created 
var Course = require('../models/Course.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the course List
exports.getCourses = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Courses = await Course.paginate(query, options)
        // Return the course list that was retured by the mongoose promise
        return Courses;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Courses');
    }
}

exports.createCourse = async function (course) {
    let Fecha = course.fechaInicio.split('/');
    var newCourse = new Course({
        titulo: course.titulo,
        descripcion: course.descripcion,
        fechaInicio: (new Date(Fecha[0], Fecha[1]-1, Fecha[2])),
        duracion: course.duracion,
        horarios: course.horarios,
        precio: course.precio,
        moneda: course.moneda,
        idResponsable: ObjectId(course.idResponsable),
        imagePath: course.imagePath
    })

    try {
        // Saving the course 
        var savedCourse = await newCourse.save();
        return savedCourse
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating course")
    }
}

exports.updateCourse = async function (course) {
    
    var id = {_id :course._id}
    console.log(id)
    try {
        //Find the old course Object by the Id
        var oldCourse = await Course.findOne(id);
        console.log (oldCourse)
    } catch (e) {
        throw Error("Error occured while Finding the course")
    }
    // If no old course Object exists return false
    if (!oldCourse) {
        return false;
    }
    //Edit the course Object
    oldCourse.titulo = course.titulo != undefined ? course.titulo : oldCourse.titulo
    oldCourse.descripcion = course.descripcion != undefined ? course.descripcion : oldCourse.descripcion
    oldCourse.fechaInicio = course.fechaInicio != undefined ? course.fechaInicio : oldCourse.fechaInicio
    oldCourse.duracion = course.duracion != undefined ? course.duracion : oldCourse.duracion
    oldCourse.horarios = course.horarios != undefined ? course.horarios : oldCourse.horarios
    oldCourse.precio = course.precio != undefined ? course.precio : oldCourse.precio
    oldCourse.moneda = course.moneda != undefined ? course.moneda : oldCourse.moneda
    oldCourse.idResponsable = course.idResponsable != undefined ? course.idResponsable : oldCourse.idResponsable
    oldCourse.imagePath = course.imagePath != undefined ? course.imagePath : oldCourse.imagePath

    try {
        var savedCourse = await oldCourse.save()
        return savedCourse;
    } catch (e) {
        throw Error("And Error occured while updating the course");
    }
}

exports.deleteCourse = async function (id) {
    console.log(id)
    // Delete the course
    try {
        var deleted = await Course.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("course Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the course")
    }
}