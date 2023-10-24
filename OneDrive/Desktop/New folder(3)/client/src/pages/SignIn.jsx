import { data } from "autoprefixer";
import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn=()=>{
    const {loading,error}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({});
    const handleChange=(e)=>{
        setFormData(
            {
                ...formData,
                [e.target.id]:e.target.value
            }
        );
    };
    const handleSubmit=async (e)=>{
        console.log(formData);
        e.preventDefault();
        try
        {
            dispatch(signInStart());
            const saveduser=await fetch('/api/auth/signin',{
                method:'POST',  
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData),
            });
            
            const data=await saveduser.json();
            if(data.success===false)
            {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            //console.log(data);
            navigate('/');
        }
        catch(error)
        {
            dispatch(signInFailure(data.message));
        }
        
    };
    //console.log(formData);
    return <div className="max-w-lg p-3 mx-auto">
        <div className="text-center font-semibold text-4xl p-4">Sign In</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3 justify-center align-center">
            <input className=" p-3 rounded-lg" onChange={handleChange} type="text" placeholder="Gmail" id="gmail" />
            <input className=" p-3 rounded-lg" onChange={handleChange} type="password" placeholder="Password" id="password" />
            <button disabled={loading} className="rounded-lg p-3 bg-wcreame hover:bg-wdcreame disabled:bg-wcreame">{loading==true ? "Loading...." : "Sign In"}</button>
            <OAuth />
        </form>
        <div className="flex flex-col p-4  hover:text-wblue font-semibold font-mono hover:cursor-pointer" 
        onClick={()=>navigate("/signup")}>
            <h1>Not an existing user?</h1>
            <h1>Sign Up</h1>
            <div className="text-red">{error}</div>
        </div>
    </div>
}

export default SignIn;