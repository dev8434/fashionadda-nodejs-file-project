import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Nodemailer transporter setup (ideally in a separate config file)
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findByEmailWithPassword(email); // Changed to findByEmailWithPassword

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user.id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findByEmail(email);
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create(name, email, hashedPassword)

        const token = createToken(newUser.id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for getting all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findByEmail(email);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpire = new Date(Date.now() + 3600000); // 1 hour from now

        await userModel.updateResetToken(email, resetToken, resetTokenExpire);

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                <p><a href="${resetUrl}">${resetUrl}</a></p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Password reset email sent' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await userModel.findByResetToken(token);

        if (!user) {
            return res.json({ success: false, message: 'Invalid or expired token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.updatePassword(user.id, hashedPassword);

        res.json({ success: true, message: 'Password has been reset' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { loginUser, registerUser, adminLogin, getUsers, forgotPassword, resetPassword }