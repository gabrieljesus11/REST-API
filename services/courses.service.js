// Gettign the Newly created Mongoose Model we just created 
var Course = require('../models/Course.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
    
    var newCourse = new Course({
        titulo: course.titulo,
        descripcion: course.descripcion,
        fechaInicio: new Date(course.fechaInicio),
        duracion: course.duracion,
        horarios: course.horarios,
        precio: course.precio,
        moneda: course.moneda,
        idResponsable: course.idResponsable,
        imagePath: course.imagePath
    })

    try {
        // Saving the course 
        var savedCourse = await newCourse.save();
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
    oldcourse.name = course.name
    oldcourse.email = course.email
    oldcourse.password = hashedPassword
    try {
        var savedcourse = await oldcourse.save()
        return savedcourse;
    } catch (e) {
        throw Error("And Error occured while updating the course");
    }
}

exports.deletecourse = async function (id) {
    console.log(id)
    // Delete the course
    try {
        var deleted = await course.remove({
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


exports.logincourse = async function (course) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the course 
        console.log("login:",course)
        var _details = await course.findOne({
            usuario: course.email, 
        });
        //var passwordIsValid = bcrypt.compareSync(course.password, _details.password);
        var passwordIsValid = (course.password == _details.password)
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, course:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login course")
    }

}