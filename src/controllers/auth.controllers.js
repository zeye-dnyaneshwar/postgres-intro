const { registerUserValidator, loginUserValidator } = require("../validators/auth.validators");
const userContext=require("../db/context/postgres/users.context")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { JWT_SECRET, JWT_EXPIRY, PASSWORD_HASH_SALT, NODE_ENV } = require("../config/constants");

const registerUser = async (req, res) => {
   try {
     const { isValid, params, errorMessage } = registerUserValidator(req.body);
 
     // Validate the request
     if (!isValid) {
       return res.status(400).json({ error: "Validation Error", errorDescription: errorMessage });
     }
 
     // Check if the given email is already present in DB
     const isUserAvailable = await userContext.getUserByEmail(params.email);
     if (isUserAvailable) {
       return res.status(422).json({ error: "Already registered", errorDescription: "Given email is already registered" });
     }
 
     // Create the engineer
     //const generatedPassword = keyGenerator(12, { specialCharacters: true });
     const hashedPassword = await bcrypt.hash(params.password, PASSWORD_HASH_SALT);
     const newUserObj = {
       name: params.name,
       employeeId: params.employeeId,
       email: params.email,
       password: hashedPassword,
       designation: params.designation,
       department: params.department,
     };
     const newUser=await userContext.createNewUser(newUserObj);
 
     return res.status(201).json({ message: "Registration successful", newUser });
   } catch (error) {
     console.error("Registration Error", error);
     return res.status(500).json({ error: "Internal server error", errorDescription: error.message });
   }
 };

 const loginUser = async (req, res) => {
   try {
     const { params, isValid, errorMessage } = loginUserValidator(req.body);
 
     if (!isValid) {
       return res.status(400).json({ error: "Validation Error", errorDescription: errorMessage });
     }
 
     const user = await userContext.getUserByEmail(params.email);
     if (!user) {
       return res.status(422).json({ error: "Invalid email/password", errorDescription: "Given email/password is invalid or not registered" });
     }
     const isPasswordValid = await bcrypt.compare(params.password, user.password);
     if (!isPasswordValid) {
       return res.status(422).json({ error: "Invalid email/password", errorDescription: "Given email/password is invalid or not registered" });
     }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.roleCode, rights: user.rightCodes }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
 
     // Setting up firbase token for user
   //   if (params.deviceToken) {
   //     createTokenForUser(user.id, params.deviceToken).catch((e) => logger.error("Device Token error", e));
   //   }
 
     return res.status(200).json({ message: "Login Successful" ,token});
   } catch (error) {
     console.error("Login Error", error.message);
     return res.status(500).json({ error: "Internal server error" });
   }
 };
 
 const updateUser=async(req,res)=>{
   const userId=req.params.id
   const payload=req.body
   try {
      const user=await userContext.getUserById(userId)
      if(!user){
         return res.status(400).json({msg:"User Not Found"})
      }
      const updatedUser=await userContext.updateUserById(userId,payload)
      res.status(200).json({msg:"User Updated",updatedUser})
   } catch (error) {
      
   }
 }

module.exports={registerUser,loginUser,updateUser}
