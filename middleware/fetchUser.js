var jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisismyJWTseCret64bitloginsecret@keyforjwt#verif%y";

const fetchUser = (req, res, next) => {
  //Get the user from the JWT token and add the id to request object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Access Denied" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
     res.status(401).send({ error: "Access Denied" });
  }
};

module.exports = fetchUser;
