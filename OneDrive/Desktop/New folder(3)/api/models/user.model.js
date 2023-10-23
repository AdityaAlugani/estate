import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    gmail:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile&psig=AOvVaw1y82pt388yW12xbEfkFLTT&ust=1698181775549000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPi4q5-KjYIDFQAAAAAdAAAAABAE",
    },
        
},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;