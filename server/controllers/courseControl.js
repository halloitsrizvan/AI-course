const Course = require('../models/courseModel')
const mongoose = require('mongoose')

//get all courses
const getAllCourse=async(req,res)=>{
    const courses= await Course.find({}).sort({createdAt:-1})

    res.status(200).json(courses)
}



//get a single course
const getSingleCourse=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const courses= await Course.findById(id)
    if(!courses){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(courses)
}


//create a course db
const createCourse=async(req,res)=>{
    try{
        const courses = await Course.create(req.body);
        res.status(200).json(courses);
        console.log(req.body);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete a Course
const deleteCourse =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const courses=await Course.findByIdAndDelete(id)

    if(!courses){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(courses)


}

//update
const updateCourse = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const courses=await Course.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!courses){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(courses)
}



module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    
}