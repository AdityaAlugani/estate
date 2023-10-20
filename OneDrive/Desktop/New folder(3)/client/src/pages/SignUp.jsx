import react from "react";
import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const navigate=useNavigate();
    return <div className="max-w-lg p-3 mx-auto">
        <div className="text-center font-semibold text-4xl p-4">Sign Up</div>
        <form className="flex flex-col gap-4 p-3 justify-center align-center">
            <input className="border p-3 rounded-lg" type="text" placeholder="Gmail" id="gmail" />
            <input className="border p-3 rounded-lg" type="text" placeholder="Username" id="username" />
            <input className="border p-3 rounded-lg" type="password" placeholder="Password" id="password" />
            <button className="rounded-lg border p-3 bg-wcreame hover:bg-wdcreame disabled:bg-wcreame">Sign Up</button>
        </form>
        <div className="flex flex-col p-4  hover:text-wblue font-semibold font-mono hover:cursor-pointer" 
        onClick={()=>navigate("/signin")}>
            <h1>Existing user?</h1>
            <h1>Login</h1>
        </div>
    </div>
}

export default SignUp;