const { Router } = require("express")
const academicRoute = Router();

academicRoute.get("/PhysicalReg" , (req,res)=>{
    return res.json({
        msg : "This is the process for physical registeration"
    })
})

academicRoute.get("/latefine" , (req,res)=>{
    return res.json({
        msg : "This is the process for late fine"
    })
})



academicRoute.get("/cancelation" , (req,res)=>{
    return res.json({
        msg : "This is the process for Cancelation"
    })
})

module.exports = {
    academicRoute : academicRoute
}