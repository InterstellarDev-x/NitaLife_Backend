const { Router } = require("express")
const HostelRoute = Router();

HostelRoute.get("/Registeration" , (req,res)=>{
    return res.json({
        msg : "This is the process for physical registeration"
    })
})


module.exports = { 
    HostelRoute : HostelRoute
}

