import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js'

export const signin = async (req, res ) =>{
    const {email, password} = req.body

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User dosen't exist."})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials."})
        const token = jwt.sign({email:existingUser, id:existingUser._id}, "test", {expiresIn:"1h"})
        res.status(200).json({result:existingUser, token})


    }catch(err){
        res.status(500).json({message: "Something went wrong."});
        console.log(err)
    }
    
}
export const signup = async (req, res ) =>{
    const {firstname, lastname, email, password, confirmPassword} = req.body
    try{
        const existingUser = User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});
        if(password !== confirmPassword) return res.status(400).json({message: "Password does'nt match"});
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password:hashedPassword, name:`${firstname} ${lastname}`});
        const token = jwt.sign({emai:result, id:result._id}, "test", {expiresIn:"1h"})  
        res.status(200).json({result, token})

    }catch(err){
        res.status(500).json({message:"Something went Wrong"})
    }
    
}
