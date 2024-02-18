import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    avatar:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDBr_WbXfUHSmQFYTei5LZLWZL6FeJahDd-Q&usqp=CAU"
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

