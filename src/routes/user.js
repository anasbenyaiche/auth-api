import express from "express";
import userController from "../controllers/userController";
const router = express.Router();

// create user and sign up
router.post("/signup", userController.signUp);
// signin
router.post("/signin", userController.signIn);
// find user
router.get("/", userController.getAllUsers);

// find a user by Id

export default router;
