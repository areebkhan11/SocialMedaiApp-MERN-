import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async  (req, res)=>{
    const {page} = req.query;
    
    try{
        const LIMIT = 8;
        const startIndex =(Number(page) - 1 ) * LIMIT; 
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    }catch(err){
        res.status(404).json({message: error.message});
    }
}

export const getPost = async  (req, res)=>{
    const {id} = req.params;
    
    try{
        const LIMIT = 8;
        const startIndex =(Number(page) - 1 ) * LIMIT; 
        const total = await PostMessage.countDocuments({});
        const post = await PostMessage.findById(id)
        
        res.status(200).json( post);

    }catch(err){
        res.status(404).json({message: error.message});
    }
}



export const getPostsBySearch = async (req, res) =>{

    const {searchQuery, tags} = req.query
    
    try{
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({$or: [{title}, {tags: {$in:tags.split(",")}}]});
        
        res.json({data: posts})
    }catch{
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req, res) =>{

    const post = req.body
    const date = new Date
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: date.toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost) 
    }catch (error){
        res.status(409).json({message: error.message});
    }   
}       

export const updatePost = async (req, res) =>{
    const { id: _id } = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post With That id");

   const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});

    res.json(updatePost)
}

export const deletePost = async (req, res) =>{
    const {id} = req.params
  

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That id");

        await PostMessage.findByIdAndRemove(id);

        res.json({message:"Post deleted Successfuly"});

}

export const likePost = async (req, res) =>{
    const {id} = req.params
    
    if(!req.userId) return res.json({message:"Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That id");

    const post = await PostMessage.findById(id) 

     const index = post.likes.findIndex((id)=> id === String(req.userId));

     if(index === -1){
        //like the post
        post.likes.push(req.userId);
     }else{
        // ignore the like 
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
     }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new:true})


    res.json(updatePost)
}