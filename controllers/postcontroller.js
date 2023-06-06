const Post = require("../models/postmodel");

exports.getAllPosts = async (req, res, next) => {

    try{
        const posts = await Post.find();
        res.status(200).json({
            status: "succes",
            results: posts.length,
            data:{
                posts,
            }

        })
    } catch (e){
        res.status(400).json({
            status:"fails",
            error: e
        })
    }

}


exports.getOnePosts = async (req, res, next) => {

    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "succes",
            data:{
                post,
            }

        })
    } catch (e){
        res.status(400).json({
            status:"fails",
            error: e
        })
    }

}

exports.CreatePost = async (req, res, next) => {

    try{
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "succes",
            data:{
                post,
            }

        })
    } catch (e){
        res.status(400).json({
            status:"fails",
            error: e
        })
    }

}

exports.UdpatePost = async (req, res, next) => {

    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "succes",
            data:{
                post,
            }

        })
    } catch (e){
        res.status(400).json({
            status:"fails",
            error: e
        })
    }

}

