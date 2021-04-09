const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;

exports.allAccess = async (req, res) => {
  const userData = await User.findAll()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  res.status(200).send(userData);
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.uploadFile = async (req, res) => {
  const userData = await User.findAll()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });

  const findUser = userData.find((e) => e.email == req.body.email);
  let obj = {};
  if (req.body.password) {
    obj = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      imgProfile: req.file ? req.file.originalname : "",
      mimetype: req.file ? req.file.mimetype : "",
      data: req.file ? req.file.buffer : "",
    };
  } else {
    obj = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      imgProfile: req.file ? req.file.originalname : "",
      mimetype: req.file ? req.file.mimetype : "",
      data: req.file ? req.file.buffer : "",
    };
  }
  User.update(
    obj,
    {
      where: {
        email: findUser.email,
      },
    }
  )
    .then(() => {
      res.json({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imgProfile: req.file.originalname,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
};
