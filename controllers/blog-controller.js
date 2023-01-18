import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs = async (req, res, next) => {


    let blogs;

    try {
        blogs = await Blog.find();
    }
    catch (err) {
        return console.log(err)
    }

    if (!blogs) {
        return res.status(404).json({ message: "No Blogs found" });
    }

    return res.status(200).json({ blogs });

}


export const addBlog = async (req, res, next) => {

    const { title, description, image, user } = req.body;

    let existingUser;
    try  {
     existingUser=await User.findById(user);
    }
    catch (err) {
      return console.log(err);
    }
    if(!existingUser) {
        res.status(400).json({message:"Unable to find user ny this id"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })

    try {
       const session =await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session});
       await session.commitTransaction();  /// session management

    }
    catch (err) {
      console.log(err)
        return res.status(500).json({message:err});
    }


    return res.status(200).json({ blog });

}


export const updateBlog = async (req, res, next) => {


    const { title, description } = req.body;
    const blogId = req.params.id;

    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }
    catch (err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update The blog" });
    }

    return res.status(200).json({ blog });

}


export const getById =async (req,res,next) =>{
    const id =req.params.id;

    let blog;

    try {
        blog=await Blog.findById(id);

    }

    catch(err){
        console.log(err)
    }

    if(!blog)
    return res.status(404).json({message:"Not blog found"})
    return res.status(200).json({
        blog
    })
}


export const deleteById =async (req,res,next) =>{

    const id=req.params.id;

    let blog

    try {
        blog=await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog); // remove blog from user as well
        await blog.user.save(); //  populate save;
    }

    catch(err) {
        console.log(err)
    }

    if(!blog){
        res.status(400).json({message:"Unable to find blog"})
    }

    return res.status(200).json({message:"Successully deleted"});
}

