const userService = require("../service/userService");

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
