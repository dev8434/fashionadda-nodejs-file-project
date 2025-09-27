import express from 'express';
import { loginUser,registerUser,adminLogin, getUsers, forgotPassword, resetPassword } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/users',adminAuth,getUsers)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;