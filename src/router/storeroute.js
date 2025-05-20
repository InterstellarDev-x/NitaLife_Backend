const { Router } = require("express")
const   storeroute  = Router();
const { StoreModel } = require("../../db");

storeroute.get("/cakes" , async (req,res)=>{
   
    const allCakesStore = await StoreModel.find({
        
         Descrption : "cake"
    })

    console.log(allCakesStore)

    res.json({
       allCakesStore
    })
} )

storeroute.get("/grocery" , async (req,res)=>{

    try {
        const allgroceryStore = await StoreModel.find({
            Descrption : "grocery"
        })

        res.status(200).json({
            allgroceryStore
        })

        
    }catch(e){
        const allgroceryStore = {}
        res.status(500).json({
            allgroceryStore
        })
    }

   
} )

storeroute.get("/medical" , async (req,res)=>{

    try {
        const allMedicalStore = await StoreModel.find({
            Descrption : "medical"
        })
        
    
        res.json({
           allMedicalStore
        })

    }catch(e){
        const allMedicalStore = {}
        res.status(500).json({
            allMedicalStore
        })
    }

    
} )

storeroute.get("/restaurant" , async (req,res)=>{

    const allrestaurantStore = await StoreModel.find({
        Descrption : "restaurant"
    })



    res.json({
       allrestaurantStore
    })
} )

storeroute.get("/juiceparlor" , async (req,res)=>{
    
    const allJuiceStore = await StoreModel.find({
        Descrption : "juiceparlor"
    })

    res.json({
        allJuiceStore
    })
} )

storeroute.get("/stationary" , async (req,res)=>{

    const allstationaryStore = await StoreModel.find({
        Descrption : "stationary"
    })

    res.json({
        allstationaryStore
    })
} )

module.exports = {
    storeroute : storeroute
}
