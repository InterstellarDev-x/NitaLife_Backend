const { Router } = require("express");
const { z } = require("zod");
const userRoute = Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../../db");
const jwt = require("jsonwebtoken");
const jwt_secret = "Nita-is-best";

userRoute.post("/signup", async (req, res) => {
  const signupbody = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });

  const singupbodySucces = signupbody.safeParse(req?.body);

  if (!singupbodySucces.success) {
    return res.status(404).json({
      msg: "Input format is wrong",
      error: singupbodySucces.error,
    });
  }

  const { email, password, firstName, lastName } = req?.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 6);

    const user = await UserModel.create({
      email: email,
      password: hashedpassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    console.log("error while signup the user");

    return res.status(500).json({
      msg: "Error happend please contact the admin",
    });
  }

  return res.status(200).json({
    msg: "you have succesfully signed up",
  });
});

userRoute.post("/signin", async (req, res) => {
  console.log("request recived");
  const { email, password } = req?.body;

  const signinbody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const signinbodysucces = signinbody.safeParse(req.body);

  if (!signinbodysucces.success) {
    return res.status(404).json({
      msg: "Invalid signin format",
      error: signinbodysucces.error,
    });
  }

  try {
    const User = await UserModel.findOne({
      email: email,
    });

    if (!User) {
      return res.json({
        msg: "User not found",
      });
    }

    const passwordsucces = bcrypt.compare(password, User.password);

    if (!passwordsucces) {
      return res.json({
        msg: "Invalid credentials",
      });
    } else {
     
      const token = jwt.sign(
        {
          id: User._id,
        },
        jwt_secret
      );

      return res.json({
        msg: "You are signed " + User.firstName + " " + User.lastName,
        token: token,
      });
    }
  } catch (e) {
    console.log("Backend error in user signin route");
    return res.status(500).json({
      msg: "Backend error happend ",
    });
  }
});

module.exports = {
  userRoute: userRoute,
};
