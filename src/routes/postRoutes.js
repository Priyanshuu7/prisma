
import { Router } from "express";
import { createPost, showPosts, deletePost, updatePost } from "../controller/postController";

const router = Router();

router.get("/showPosts", showPosts);
router.put("/updatePost/:id", updatePost);
router.post("/createPost", createPost);
router.delete("/deletePost/:id", deletePost);
router.get("/searchPosts", showPosts);

export default router;