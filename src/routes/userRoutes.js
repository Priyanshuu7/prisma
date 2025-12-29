import { Router } from "express";
import { createUser, showUsers , deleteUser, updateUser,userbyId } from "../controller/userController";

const router = Router();

router.get("/showUsers",showUsers);
router.put("/updateUser/:id",updateUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id",deleteUser);
router.get("/userbyId/:id",userbyId);


export default router;