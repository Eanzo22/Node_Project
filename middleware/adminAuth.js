require('dotenv').config();
// const User = require("../models/user.schema");
const {findUserService} = require("../services/user.service");

const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////

const adminAuth = async (req, res, next) =>{
    try{
        // console.log(req.headers)
        // console.log(req.headers["jwt"])
        const token = req.headers["jwt"];
        // console.log(token)
        if(!token) {
            return res.status(401).send({message:"admin auth ,unauthorized user due to invalid jwt token please re-login."});
        }
        const payload = jwt.verify(token,process.env.JWT_ADMIN_SECRET);       
        const {userEmail} = payload;
        const user = await findUserService(userEmail);
        if(!user){
            return res.status(401).send({message:"unauthorized user"});
        }
        next();                 //*means can route and see the data
    }
    catch(authError){
        return res.status(401).send({message:"Error in user authentication function: "+authError.message});
    }
}

////////////////////////////////////////////////////////////

module.exports = {adminAuth};