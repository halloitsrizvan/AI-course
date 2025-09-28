const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const { generateKey } = require('../utils/jwtUtils')
//get all Users
const getAllUsers=async(req,res)=>{
    const Users= await User.find({}).sort({createdAt:-1})

    res.status(200).json(Users)
}



//get a single Users
const getSingleUsers=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const Users= await User.findById(id)
    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)
}


//create a Users db
const createUsers=async(req,res)=>{
    
    const {name,email,password,role}= req.body

    try{
    const emailLower = (email || '').toLowerCase().trim();
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

        const hashedPassword =await bcrypt.hash(password,10)
   
        const users = await User.create({name,email: emailLower,password:hashedPassword,role:role ||"customer"});
        const token = generateKey(users)
        res.status(201).json({
            token,
            user: { id: users._id, name: users.name, email: users.email, role: users.role }
          });
        console.log(users);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

const authService=async(email,password)=>{
        try{
            const exitinguser= await User.findOne({email})

            if(!exitinguser){
                throw new  Error ('User not found')
            }
            const isPasswordVaild = await bcrypt.compare(password,exitinguser.password)

            if(!isPasswordVaild){
                throw new  Error ('Incorrect Password')
            }
            const token =generateKey(exitinguser)
            return token

        }catch(err){
            throw new  Error (err)
        }
    }

// add handler that uses loginUser and sends a response
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = (email || '').toLowerCase().trim();

    if (!emailLower || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    
    const user = await User.findOne({ email: { $regex: `^${emailLower}$`, $options: 'i' } });
    if (!user) {
      console.log('[LOGIN] user not found');
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) return res.status(401).json({ error: "Incorrect password" });

    const token = generateKey(user);
   
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
    
  } catch (err) {
    
    res.status(401).json({ error: err.message || 'Login failed' });
  }
};

//delete a Users
const deleteUsers =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const Users=await User.findByIdAndDelete(id)

    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)


}

//update
const updateUsers = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const Users=await User.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)
}



module.exports = {
    createUsers,
    getAllUsers,
    getSingleUsers,
    deleteUsers,
    updateUsers, 
    
    login,
    me: (req, res) => {
        // requires authToken middleware to set req.user
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
        return res.status(200).json({ user: req.user })
    }
}