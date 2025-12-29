import { prisma } from '../../lib/prisma';


// create \posts
export const createPost = async (req, res) => {
    try {
        const { title, desc, user_id } = req.body;

        if (!title || !desc || user_id === undefined) {
            return res.status(400).json({
                message: "title, desc and user_id are required"
            });
        }

        const uid = parseInt(user_id, 10);
        if (!Number.isInteger(uid)) {
            return res.status(400).json({ message: "Invalid user_id" });
        }

        const user = await prisma.user.findUnique({ where: { id: uid } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = await prisma.post.create({
            data: {
                title: title,
                desc: desc,
                user_id: uid
            }
        });

        res.status(201).json({
            data: newPost,
            message: "Post created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create post"
        });
    }
};

// show \posts
export const showPosts = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    const skip = (page - 1) * limit;


    try {
        const posts = await prisma.post.findMany({
            skip: skip,
            take: limit,
            select: {
                int: true,
                title: true,
                desc: true,
                user_id: true,
                createdAt: true,
                comment_count: true
            },
            where:{
               title:{
                startsWith:"My"
               }
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / limit); 

        res.status(200).json({
            data: posts,
            message: "Posts fetched successfully",
            meta:{
                totalPosts:totalPosts, 
                totalPages:totalPages,
                currentPage:page,

                limit:limit
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch posts"
        });
    }
};

// delete post 
export const deletePost = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const post = await prisma.post.findUnique({
            where: { int: id }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const deletedPost = await prisma.post.delete({
            where: { int: id }
        });

        res.status(200).json({
            data: deletedPost,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete post" });
    }
};


// update post 

export const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const post = await prisma.post.findUnique({
            where: { int: postId }
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        let updateData = {
            title: req.body.title,
            desc: req.body.desc
        };
        if (req.body.user_id !== undefined) {
            const uid = parseInt(req.body.user_id, 10);
            if (!Number.isInteger(uid)) {
                return res.status(400).json({ message: "Invalid user_id" });
            }
            const user = await prisma.user.findUnique({ where: { id: uid } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            updateData.user_id = uid;
        }

        const updatedPost = await prisma.post.update({
            where: { int: postId },
            data: updateData
        });
        res.status(200).json({
            data: updatedPost,
            message: "Post updated successfully"
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update post" });
    }
}