const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "ThisismyJWTseCret64bitloginsecret@keyforjwt#verif%y";

//ROUTE1: Create User using :POST "api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    //Express validator validation
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req); //returns bad request and the error log
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      //Check whether user with the same email exists
      if (user) {
        success=false;
        return res
          .status(400)
          .json({ error: "Sorry this user already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authtoken }); //sending user data as json
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//ROUTE2: Login of a user
router.post(
  "/login",
  [
    //Express validator validation
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //returns bad request and the error log
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //checking whether the given user exists or not
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Sorry! wrong credentials" });
      }
      //checking for the password is correct where all the hashes are matched automatically by bcrypt
      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({success, error: "Sorry! wrong credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success=true;
      res.json({ success, authtoken }); //sending user data as json
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE3: Get user details of the one who is logged in
router.post("/getuser",fetchUser, async (req, res) => {
    //returns bad request and the error log
    try {
     userId = req.user.id;
     const user= await User.findById(userId).select("-password");
     res.send(user);
     
}catch (error) {
     console.log(error.message);
     res.status(500).send("Internal server error!");
   }
    })

module.exports = router;
