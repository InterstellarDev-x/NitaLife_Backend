const { Router, response } = require("express");
const mongoose = require("mongoose");
const { StoreModel, AdminModel } = require("../../db");
const jwt = require("jsonwebtoken");
const jwt_secret = "Nita-is-best"
const { z } = require("zod");
const adminroute = Router();
const bcrypt = require("bcryptjs");
const  { adminMiddleware }  = require("../middleware/adminMiddleware");


adminroute.post("/signup", async (req, res) => {
  
  //  zod check
  const signupbody = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });

  const signupbodysucces = signupbody.safeParse(req.body);
  console.log(signupbodysucces);

  if (!signupbodysucces.success) {
    return res.status(404).json({
      msg: "Invalid input format ",
      error: signupbodysucces.error,
    });
  }

  const { email, password, firstName, lastName } = req?.body;

  try {
    const hashpassword = await bcrypt.hash(password, 6);

    const newAdmin = await AdminModel.create({
      email: email,
      password: hashpassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    console.log("error happpend during signing up the admin");

    return res.status(500).json({
      msg: "Error during signupp !! ",
    });
  }

  res.json({
    msg: "You are signed Up",
  });
});

adminroute.post("/signin", async (req, res) => {
  console.log("request recived")
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

  const Admin = await AdminModel.findOne({
    email: email,
  });

  if (!Admin) {
    return res.status(404).json({
      msg: "Admin not found",
    });
  }

  const passwordsucces = await
   bcrypt.compare(password, Admin.password);

  if (!passwordsucces) {
    return res.json({
      msg: "Invalid credentials",
    });
  } else {
    console.log(Admin)
    const token = jwt.sign({
      id : Admin._id
    },jwt_secret)
   
    return res.json({
      msg: "You are signed in ",
      token : token
    });
  }
});

adminroute.use(adminMiddleware)

adminroute.post("/create/store", async (req, res) => {
  

  const AdminId = req.AdminId // Not in use

  const { name, address, phoneno, Descrption, imageUrl } = req?.body;
  console.log(req?.body)

  const store = await StoreModel.create({
    name: name,
    address: address,
    phoneno: phoneno,
    Descrption: Descrption,
    imageUrl: imageUrl,
  });

  res.json({
    msg: "Store has been succecsfully created ",
  });
});

module.exports = {
  adminroute: adminroute,
};


adminroute.delete("/store/:id" , async(req,res)=>{

  const _id = req.params.id


  try {
  const reponse = await StoreModel.deleteOne({
    _id : _id
  })



  res.status(200).json({
    msg : "Card Deleted Succesfully"
  })


  }catch(e){
    console.log(e )
    res.status(500).json({
      msg : "Internal Server Error"
    })
  }

  

})


adminroute.put("/store/:id" , async(req,res)=>{

const  id = req.params.id 


  
  const { name, address, phoneno, Descrption, imageUrl } = req?.body; 

  try {
   const reponse =  await StoreModel.findOneAndUpdate({
      _id : id
    },
     {

     $set:  { 
      name : name,
      address : address ,
      phoneno : phoneno,
      Descrption : Descrption,
      imageUrl : imageUrl}
    })

    console.log(reponse)

  
     if(response){
      res.status(200).json({
        msg : "Store Updated Succesfully"
      })
     }else {
      res.status(403).json({
        msg : "Can't Updated Now"
      })
     }

  }catch(e){

    console.log(e)
    res.status(500).json({
      msg : "Internal Server Error"
    })
  }
})
