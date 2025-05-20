const jwt = require("jsonwebtoken");
const jwt_secret = "Nita-is-best";

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const tokenverify = jwt.verify(token, jwt_secret);

    if (tokenverify) {
      req.AdminId = tokenverify.id;
      next();
    }
  } catch (e) {
    return res.status(400).json({
      msg: "Opps please login again !! ",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
