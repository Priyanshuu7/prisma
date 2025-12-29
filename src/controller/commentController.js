import { prisma } from '../../lib/prisma';


export const createComment = async (req, res) => {
    try {
        const { content, post_id, user_id } = req.body;

        const postId = parseInt(post_id, 10);
        const uid = parseInt(user_id, 10);

        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: "Invalid post_id" });
        }
        if (!Number.isInteger(uid)) {
            return res.status(400).json({ message: "Invalid user_id" });
        }

        const post = await prisma.post.findUnique({ where: { int: postId } });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await prisma.user.findUnique({ where: { id: uid } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        await prisma.post.update({
            where: { int: postId },
            data: {
                comment_count: {
                    increment: 1
                }
            }
        })


        const newComment = await prisma.comment.create({
            data: {
                content: content,
                postId: postId,
                user_id: uid
            }
        });

        res.status(201).json({
            data: newComment,
            message: "Comment created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create comment"
        });
    }
};