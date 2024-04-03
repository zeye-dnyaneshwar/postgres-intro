const {registerUser, loginUser, updateUser} = require("../controllers/auth.controllers")

const authRouter=require("express").Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.patch("/update/:id",updateUser)

module.exports=authRouter