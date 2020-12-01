const mailService = require("../utils/mailingService");
let methods = {
  check: async (req, res) => {
    console.log("check called");
    const data = {
      firstName: "Aun",
      lastName: "Jaffery",
      email: "aunjaffery123@gmail.com",
      phone: "123123",
    };
    mailService.testMail(data);
    res
      .status(200)
      .json({ success: true, msg: "All good in admin controller" });
  },
};
module.exports = methods;
