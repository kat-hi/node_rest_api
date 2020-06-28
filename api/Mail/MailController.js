const userController = require('../User/UserController');
const nodemailer = require("nodemailer");
const config = require('config');
const email = config.get('mail.email');
const password = config.get('mail.password');

console.log('EMAIL PASSWORD: ' + email, password)

const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password
      }
});

transporter.verify((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
});

exports.sendEmail = async (request, response) => {
    const username = request.body.username;
    try {
        const user = await userController.readUserByName(username)
    } catch (error) {
        console.log(error)
    };
    const message = {
        from: email,
        to: user.email,
        subject: 'Newsletter',
        text: request.body.text
     }
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
}






