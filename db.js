const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId




const Stores = new Schema({
    name : String,
    address : String,
    phoneno : Number,
    Descrption : String,
    imageUrl : String
})





const Admins = new Schema({
    email : {
        type : String,
        unique : true,
    },
    password : String,
    firstName : String,
    lastName : String
})

const User  = new Schema({
    email : {
        type : String,
        unique : true,
    },
    password : String,
    firstName : String,
    lastName : String
})


const StoreModel = mongoose.model("stores" ,  Stores)
const AdminModel = mongoose.model("admins"  , Admins)
const UserModel = mongoose.model("user" , User)






module.exports = {
    StoreModel : StoreModel,
    AdminModel : AdminModel,
    UserModel : UserModel
}