const model = require("../models");
const utils = require("../utils");
const mailService = require("../utils/mailingService");

let methods = {
  createAdmin: async (req, res) => {
    try {
      console.log("create admin");
      const data = {
        fullName: "Super Admin",
        username: "superadmin",
        password: "qwe123",
      };
      data.password = await utils.hashPassword(data.password);
      console.log(data);
      await model.Admin.create(data);
      return res.status(200).json({ success: true, msg: "admin created" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, msg: "cannot create admin", err });
    }
  },
  login: async (req, res) => {
    console.log("Admin login Called");
    let username = req.body.username;
    let password = req.body.password;
    try {
      if (!username || !password) throw "Error! Invalid request";
      let admin = await model.Admin.findOne({ where: { username } });
      if (!admin) throw "Error! Invalid credentials";
      console.log(admin);
      let match = await utils.comparePassword(
        password,
        admin.dataValues.password
      );
      if (!match) throw "Error! Invalid credentials";
      let access_token = await utils.issueToken({ id: admin.dataValues.id });
      let result = {
        user: {
          id: admin.dataValues.id,
          role: admin.dataValues.role,
          fullName: admin.dataValues.fullName,
          username: admin.dataValues.username,
          photoURL: admin.dataValues.image,
        },
        access_token,
      };
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ success: false, msg: "Error! Invalid request", error });
    }
  },
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
