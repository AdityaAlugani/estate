import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Contact=({listing})=>{
    const _id=listing.userRef;
    const [userDetails,setUserDetails]=useState({});
    const [textMessage,setTextMessage]=useState("");
    useEffect(()=>{
        const getUserDetails=async ()=>{
            const userInfo=await fetch(`/api/user/${_id}`);
            const data=await userInfo.json();
            if(data.success===false)
            {
                console.log("Something went wrong!",data.message);
                return;
            }
            setUserDetails(data);
        }
        getUserDetails();
        //console.log(userDetails);
    },[]);
    //console.log(userDetails);
    const handleTextInput=(e)=>{
        setTextMessage(e.target.value);
    };
    console.log(textMessage);
    return <div className="flex flex-col">
        <div className="flex flex-col gap-2">
            <p>Write to the owner <span className="font-semibold">{userDetails.username}</span></p>
            <textarea rows="2" className="p-2 rounded-lg" value={textMessage} onChange={handleTextInput}></textarea>
        </div>
        <Link to={`mailto:${userDetails.gmail}?subject=Regarding ${listing.name}&body=${textMessage}`}>
            <button type="button" className="p-2 my-3 w-full sm:w-[500px] text-wcreame self-center justify-center rounded-md bg-wskin hover:rounded-xl hover:opacity-95">Send Message</button>
        </Link>
    </div>
};
export default Contact;