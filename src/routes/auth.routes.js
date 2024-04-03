const registerUser = require("../controllers/auth.controllers")

const authRouter=require("express").Router()

authRouter.post("/register",registerUser)

module.exports=authRouter