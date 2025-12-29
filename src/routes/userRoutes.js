import { Router } from "express";
import { createUser, showUsers , deleteUser, updateUser } from "../controller/userController";

const router = Router();

router.get("/showUsers",showUsers);
router.put("/updateUser/:id",updateUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id",deleteUser);


export default router;