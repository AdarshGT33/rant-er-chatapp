import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send("Email or Password is required");
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log("Trouble signing up", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send("Email and Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(404).send("Password is incorrect");
    }

    res.cookie("token", createToken(email, user.id), {
      maxAge,
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        color: user.color,
        profileSetup: user.profileSetup,
        image: user.image,
      },
    });
  } catch (error) {
    console.log("Trouble loging-in", error);
    return res.status(500), send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).send("User ID not found");
    }

    res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).send("Name are required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error at updateProfile");
  }
};

export const addProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(401).send("File not found");
    }

    const date = Date.now();
    let fileName = "uploads/profile/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);
    
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error at addProfileImage");
  }
};

export const removeProfileImage = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)

    if(!user){
      return res.status(404).send("User not found.")
    }

    if(user.image){
      unlinkSync(user.image)
    }

    user.image = null

    await user.save()

    return res.status(200).send("Profile image removed successfully")
  } catch (error) {
    return res.status(500).send("Internal Server Error at updateProfile");
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {maxAge: 1, secure: true, sameSite: "None"})

    return res.status(200).send("Logout Successful.")
  } catch (error) {
    console.log({error})
    return res.status(500).send("Internal Server Error at logout");
  }
};