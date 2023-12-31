import { data } from "autoprefixer";
import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const [loading,setLoading]=useState(false);
    const [errormessage,setErrorMessage]=useState(null);
    const navigate=useNavigate();
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
        setLoading(true);
        e.preventDefault();
        const saveduser=await fetch('/api/auth/signup',{
            method:'POST',  
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        try
        {
            const data=await saveduser.json();
            if(data.success===false)
            {
                setErrorMessage(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setErrorMessage("");
            console.log(data);
            navigate('/signin');
        }
        catch(error)
        {
            setErrorMessage(data.message);
            setLoading(false);
        }
        
    };
    //console.log(formData);
    return <div className="max-w-lg p-3 mx-auto">
        <div className="text-center font-semibold text-4xl p-4">Sign Up</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3 justify-center align-center">
            <input className=" p-3 rounded-lg" onChange={handleChange} type="text" placeholder="Gmail" id="gmail" />
            <input className=" p-3 rounded-lg" onChange={handleChange} type="text" placeholder="Username" id="username" />
            <input className=" p-3 rounded-lg" onChange={handleChange} type="password" placeholder="Password" id="password" />
            <button disabled={loading} className="rounded-lg p-3 bg-wcreame hover:bg-wdcreame disabled:bg-wcreame">{loading==true ? "Loading...." : "Sign Up"}</button>
        </form>
        <div className="flex flex-col p-4  hover:text-wblue font-semibold font-mono hover:cursor-pointer" 
        onClick={()=>navigate("/signin")}>
            <h1>Existing user?</h1>
            <h1>Login</h1>
            <div className="text-red">{errormessage}</div>
        </div>
    </div>
}

export default SignUp;