const express = require("express");
const app = express();


const { storeroute } = require("./src/router/storeroute");
const  { academicRoute }  = require("./src/router/academicRoute");
const  { HostelRoute }  = require("./src/router/HostelRoute");
const { adminroute } = require("./src/router/adminRoute");
const cors = require("cors");


const  mongoose   = require("mongoose");
const  { userRoute }  = require("./src/router/userRoute");


app.use(express.json())
app.use(cors());
app.use("/user" , userRoute)
app.use("/admin" , adminroute)
app.use("/stores", storeroute )
app.use("/academic", academicRoute )
app.use("/hostel", HostelRoute )
app.use("/hospital", storeroute )

async function start(){
   await  mongoose.connect("mongodb+srv://admin:vldybNRPp9KSJ9he@cluster0.odmxu.mongodb.net/nitaStore")
    console.log("Listensing on port 3000")
    app.listen(3000)
}

start();

