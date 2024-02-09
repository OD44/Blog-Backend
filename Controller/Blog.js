const Blog = require("../Model/Blog");

const CreatePost = async(req, res)=>{
    const {title, content, author} = req.body;

    try {
        const newPost = new Blog.findOne({title, content, author});
        const savedPost = newPost.save();

        return res.status(201).json({message: "New post created", newPost})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "server error"})
    }
}

const getPost = async (req, res)=>{
    try {
        const findPost = await Blog.find();
        res.json(findPost)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error"})
    }
}

const singlePost = async(req, res)=>{
    try {
        const postId = req.params.postId

        const post = await Blog.findById(postId)
        if(!post){
            return res.status(404).json({msg: "Post not found"})
        }
            res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error"})
    }
}

const updatePost = async (req, res)=>{
    try {
        const postId = req.params["id"]
        const {title, content, author} = req.body;
        const updatedPost = await Blog.findByIdAndUpdate({_Id:postId}, req.body,{
            runValidators: true, new: true
        })

        if(!updatedPost){
            return res.json({error: "Post not updated"})
        }
        res.json(updatedPost)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error"})
    }
}


const deletePost = async (req, res)=>{
    const _Id = req.params["id"];

    const samePost = await Blog.findById({_Id});

    if(samePost){
        await Blog.findByIdAndDelete({_Id});
        return res.json({msg: 'Word deleted successfully'})
    }
    res.json({error: "No word found"})
}

module.exports = {
    CreatePost,
    getPost,
    singlePost,
    updatePost,
    deletePost
}