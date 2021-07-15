const userService = require("../service/userService");
const mailService = require("../service/mailService");
const storageService = require("../service/storageService");
const jwt = require("jsonwebtoken");

exports.getToken = async (req, res) => {
  try {
    const tokenResult = await userService.generateToken(req.user.id);

    if (tokenResult === null) return res.sendStatus(500);

    return res.status(200).json({
      statusText: "Ok",
      message: "Login Success",
      token: tokenResult,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    
  }
};

exports.signup = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (!findUser) {
      const newUser = await userService.createUser(req.body);

      const sendEmail = await mailService.sendConfirmationEmail(
        newUser.first_name,
        newUser.email
      );

      res.status(201).send({
        statusCode: 201,
        statusText: "Created",
        message: "Register Success",
      });
    } else {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
        message: "Register Failed",
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Register Failed",
    });
  }
};

exports.confirmUser = async (req, res) => {
  try {
    const data = await jwt.verify(
      req.params.confirmationCode,
      process.env.SECRET_ACCESS_KEY_DEV
    );
    const findUser = await userService.findUserByEmail(data.email);

    if (findUser) {
      findUser.is_verified = true;
      await findUser.save();
      res.status(200).send({ message: "Succesfully activate User." });
    } else {
      res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (!findUser) {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
      });
    }
    const {data: updateUser, error} = await userService.updateUser(req.body, findUser.password);
    if(error !== null) {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
        message: "New password must be different from old password.",
      });
    }
    
    res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Update Success",
    });    
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Update Failed",
    });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (findUser) {
      const updateUser = await userService.updatePhoto(req.body.email, req.file);
    }
    res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Update Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Update Failed",
    });
  }
}

exports.getUser = async (req, res) => {
  try {
    const userDetails = await userService.findUserByEmail(req.body.email);

    res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Get Data User Success",
      data: {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        image_url: userDetails.image_url,
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Update Failed",
    });

  }
}
