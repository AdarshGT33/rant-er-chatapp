import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        typeof: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        typeof: String,
        required: [true, "Password is required"]
    },
    firstName: {
        typeof: String,
        required: false
    },
    lastName: {
        typeof: String,
        required: false
    },
    color: {
        typeof: Number,
        required: false
    },
    profile: {
        typeof: String,
        default: false
    }
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})