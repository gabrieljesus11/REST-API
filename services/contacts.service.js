const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail')



 exports.createContact = async (text) => {
    
  //
  try{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'gabrieljesus11@gmail.com', // Change to your recipient
    from: 'gabrgutierrez@uade.edu.ar', // Change to your verified sender
    subject: 'Has recibido un comentario en EducationHub',
    text: text
  }
  sgMail
  .send(msg)
  .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}catch(e){
    throw Error("Error enviando el correo")
}
}