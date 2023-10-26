import {GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async ()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);

            console.log(result);
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers:{"Content-Type":'application/json'},
                body:JSON.stringify({name:result.user.displayName,
                gmail:result.user.email,photo:result.user.photoURL})
            });
            const data=await res.json();
            //console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');
        }
        catch(error)
        {
            console.log("could not sign in with google",error);
        }
    }
    return <button onClick={handleGoogleClick} type="button" className="bg-googleblue text-googlewhite p-3 rounded-lg hover:bg-redLight uppercase">Continue With Google?</button>
}

export default OAuth;