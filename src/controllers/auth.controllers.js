const { registerUserValidator } = require("../validators/auth.validators");
const userContext=require("../db/context/postgres/users.context")

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
     //const hashedPassword = await bcrypt.hash(generatedPassword, PASSWORD_HASH_SALT);
     const newUserObj = {
       name: params.name,
       employeeId: params.employeeId,
       email: params.email,
       password: params.password,
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

 

module.exports=registerUser
