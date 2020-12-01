const nodemailer = require("nodemailer");
const variables = require("../config/variables");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const moment = require("moment");

let transporter = nodemailer.createTransport({
  service: variables.mailService,
  auth: {
    user: variables.senderMail, // generated ethereal user
    pass: variables.senderPass, // generated ethereal password
  },
});
const options = {
  viewEngine: {
    layoutsDir: path.join(__dirname, "../views/layouts"),
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: "views",
};
transporter.use("compile", hbs(options));

const methods = {
  testMail: (result) => {
    let view = {
      logo: `${variables.imageUrl}/images/placeholders/logo.png`,
      name: `${result.firstName} ${result.lastName}`,
      email: result.email,
      phone: result.phone,
    };
    const mailInfo = {
      from: '"Boiler App" <boiler@gmail.com>',
      to: result.email,
      subject: "Test Mail ✔",
      template: "test",
      context: view,
    };
    transporter.sendMail(mailInfo);
    console.log("Placeorder mail sent :)");
  },
};
module.exports = methods;
