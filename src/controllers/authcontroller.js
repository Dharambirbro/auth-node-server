// import {prisma} from "../../app.js"

import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import {prisma} from "../middlewares/prismaMiddleware.js"
import { validateEmail } from "../utils/utils.js";


export const register =asyncHandler( async (req, res,next) => {

  const {name,email,password}=req.body
  

  if(!name || !email || !password){
    throw new AppError('Resource not found', 400);
  }

  //validating email
  if (!validateEmail(email)){
    throw new AppError('Invalid Email!', 400);
  }
  
  //Checking if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email}, // Use your unique field here, such as email
  });

  if (existingUser) {
    throw new AppError('User already Exists', 400);
  }

    //Creating new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password, // Make sure to hash the password before saving it
      },
    });
    


  
  res.status(200).json({
    message:"success"
  })
});




export const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, projectId } = req.body;

    if (!email || !password) {
      throw new ValidationError(errorMessages.MISSING_FIELDS);
    }

    const { token, user } = await authService.loginUser(
      email,
      password,
      projectId
    );
    logger.info(`User logged in: ${user._id}`);

    res.json({
      status: "success",
      message: "Login successful",
      data: { token, userId: user._id, role: user.role },
    });
  } catch (error) {
    next(error);
  }
});

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, projectId } = req.body;

    if (!email) {
      throw new ValidationError(errorMessages.EMAIL_REQUIRED);
    }

    await authService.forgotPassword(email, projectId);
    logger.info(`Password reset requested for: ${email}`);

    res.json({
      status: "success",
      message: "Password reset email sent",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword, projectId } = req.body;

    if (!token || !newPassword) {
      throw new ValidationError(errorMessages.MISSING_FIELDS);
    }

    await authService.resetPassword(token, newPassword, projectId);
    logger.info("Password reset successful");

    res.json({
      status: "success",
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const { userId, projectId } = req.user;
    const user = await authService.getUserProfile(userId, projectId);

    res.json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId, projectId } = req.user;
    const updates = req.body;

    const updatedUser = await authService.updateUserProfile(
      userId,
      projectId,
      updates
    );

    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId, projectId } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new ValidationError(errorMessages.MISSING_FIELDS);
    }

    await authService.changePassword(
      userId,
      projectId,
      currentPassword,
      newPassword
    );
    logger.info(`Password changed for user: ${userId}`);

    res.json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
