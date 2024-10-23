import { Router } from "express";
import Todo from "../models/todo.js";
import mongoose from "mongoose";
const router=Router()
router.post('/todos',async(req,res)=>{
    try{
        const {title}=req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }
        const todo=new Todo({title:title})
        if(!todo)return res.status(400).json({success:false,message:`eroor`})
            await todo.save();
        res.status(200).json({sucess:true,data:todo})
        
    }catch(err){
        console.log(err)
    }
})
router.get('/todos',async(req,res)=>{
    try{
        const todo=await Todo.find()
        if(!todo)return res.status(400).json({success:false,message:`eroor`})
        res.status(200).json({sucess:true,data:todo})
    }catch(err){
        console.log(err)
    }
})
router.put('/todos/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id)return res.status(400).json({success:false,message:`please provide id`})
        if(!mongoose.isValidObjectId(id))return res.status(400).json({success:false,message:`please provide correct id`})
        const todo =await Todo.findByIdAndUpdate(id,{$set:{title:req.body.title}},{new:true})
        if(!todo)res.status(400).json({ success: false, message: "not updated" });
        res.status(200).json({sucess:true,data:todo})

    }catch(err){
        console.log(err)
    }
})
router.delete('/todos/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id)return res.status(400).json({success:false,message:`please provide id`})
        if(!mongoose.isValidObjectId(id))return res.status(400).json({success:false,message:`please provide correct id`})
        const todo =await Todo.findByIdAndDelete(id)
        if(!todo)res.status(400).json({ success: false, message: "not deleted" });
        res.status(200).json({sucess:true,message:`deleted successfully`})

    }catch(err){
        console.log(err)
    }
})
export default router;