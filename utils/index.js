const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const secret = "dhobiSecret_404";

const methods = {
  readFilePromise: (location) => {
    return new Promise((resolve, reject) => {
      fs.readFile(location, "utf8", function (err, data) {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
  writeFilePromise: (location, file) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(location, JSON.stringify(file), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve("File written successfully");
      });
    });
  },
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, passwordHash) => {
        if (err) {
          reject(err);
        } else {
          resolve(passwordHash);
        }
      });
    });
  },

  comparePassword: (pw, hash) => {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(pw, hash, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  issueToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn: "300 days" }, function (
        err,
        token
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },

  verifyToken: (token, cb) => jwt.verify(token, secret, {}, cb),

  generateRandomToken: (length) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, function (err, buffer) {
        if (err) {
          reject(err);
        } else {
          console.log(buffer);
          resolve(buffer.toString("hex"));
        }
      });
    });
  },
  //Upload Image File
  uploadImage: (file, path) => {
    return new Promise((resolve) => {
      try {
        let sampleFile = file;
        let x = new Date();
        let filename =
          file.name +
          "" +
          x.getDate() +
          "" +
          x.getMonth() +
          "" +
          x.getFullYear() +
          "" +
          x.getHours() +
          "" +
          x.getMinutes() +
          "" +
          x.getSeconds() +
          ".jpg";
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(path + filename, (err) => {
          if (err) {
            throw err;
          }
          resolve(filename);
        });
      } catch (err) {
        throw err;
      }
    });
  },
};

module.exports = methods;
