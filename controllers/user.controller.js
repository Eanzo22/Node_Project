require('dotenv').config();

const { createUserService,findUserService,updateUserService  } = require("../services/user.service");
const {  validateNewUser,validateLoginUser } = require("../validation/user.validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





/////////////////////////////////////////////////////////////////////////

const createNewUser = async(req,res) =>{                  //registeration
   try{
    const {error, value} = validateNewUser(req.body);          //value is a user
    if(error)
    {
        res.status(400).send("Invalid form field..",error);  
    }
    else{
    const {userName, userEmail , userPassword,status} = req.body;

    //1-if email or password missing
    if(!userEmail  || !userPassword){
                                   
        return res.status(422).send({message:"wrong email or password!"});   
    }

    //2- if existing email
    const user = await findUserService(userEmail);
    if(user){
        return res.send({message:"This email already exists, please choose another email..."});
    }
                                                
    const passwordHash = await bcrypt.hash(userPassword,10);     

    const newUser = await createUserService({userName,userEmail, passwordHash,status});    
    res.send(newUser);
   }
}
   catch(createNewUserError){
    res.status(500).send(`createNewUserError: ${createNewUserError.message}`);
   }
}




////////////////////////////////////////////////////////////////////////////////////////

const login = async(req,res)=>{

    try{
        const {error, value} = validateLoginUser(req.body);          //value is a user
    if(error)
    {
        res.status(400).send("Invalid form field..",error);  
    }
    else{
        const {userEmail, userPassword} = req.body;
        if(!userEmail || !userPassword){
            return res.status(422).send({message:"wrong email or password!"});
        }
        
        const user = await findUserService(userEmail);
        if(!user){
            return res.status(401).send({message:"Incorrect email or password..."});
        }

        const isValidPassword = await bcrypt.compare(userPassword, user.passwordHash) ;
        
        if(!isValidPassword){
            return res.status(401).send({message:"Incorret email or password..."});
        }
                       
        const token = jwt.sign({userEmail}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

                                
        res.header({jwt:token}).send({token:token,userEmail:userEmail, message:"access granted"});
     }
    }
    catch(LoginError){
        res.status(500).send(`LoginError: ${LoginError.message}`);
    }
}


///////////////////////////////////////////////////////////////////////////////////////
const getCurrentUser = async (req,res)=>{
    try{
    const userEmail = req.headers["userEmail"];           
    const user= await findUserService(userEmail);
   if(!user){
    res.status(404).send("the user with given email was not found");
   }
   else{
    res.send(user);
   }
  }
  catch(getCurrentUserError){
   res.status(404).send(`getCurrentUserError: ${getCurrentUserError.message}`);            
  }
}




////////////////////////////////////////////////////////////////////////////////////////

const updateUserProfile=async(req,res)=>{
    try{
    const {error, value} = validateNewUser(req.body); 
    if(error)
    {
        res.status(400).send("Invalid form field..",error);  
    }
    else{
        const {userEmail} = req.body;
        const user= await findUserService(userEmail);
        if(!user){
            res.status(404).send("the user with given email was not exist");
            
        }
        else{
            await updateUserService (userEmail,req.body);       
            const updatedUser = await findUserService(userEmail);
            res.send(updatedUser);
        } 
    }
  }
  catch(updateUserProfileError){
    res.status(404).send(`updateUserProfileError: ${updateUserProfileError.message}`);
  }
    
}




module.exports = {
    createNewUser,
    login,
    getCurrentUser,
    updateUserProfile
}