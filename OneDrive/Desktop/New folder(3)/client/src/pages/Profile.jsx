import react from "react";
import { useSelector } from "react-redux";

const Profile=()=>{
    const currentUser=useSelector((state)=>state.user.user.currentUser);
    return <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl p-3 m-3 font-semibold text-center">Profile</h1>
        <form className="flex flex-col gap-4 ">
            <img src={currentUser.avatar} className="self-center mt-2 rounded-full w-24 h-24 object-cover cursor-pointer" />
            <input placeholder="gmail" className="rounded-xl p-3" id="gmail" />
            <input placeholder="username" className="rounded-xl p-3" id="username" />
            <input placeholder="password" className="rounded-xl p-3" id="password" />
            <button type="button" className="bg-wbrown text-googlewhite p-3 rounded-xl">Update</button>
            <button type="button" className="bg-wblue text-googlewhite p-3 rounded-xl">Create Listings</button>
        </form>
        <div className="flex justify-between pt-2 mt-2">
            <p className="text-brownLight hover:text-red cursor-pointer"  >Delete account?</p>
            <p className="text-brownLight hover:text-red cursor-pointer"  >Sign out</p>
        </div>
    </div>
}

export default Profile;