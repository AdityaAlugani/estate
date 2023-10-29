import react, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserSuccess, updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { signOut } from "firebase/auth";

const Profile=()=>{
    const currentUser=useSelector((state)=>state.user.user.currentUser);
    const Loading=useSelector((state)=>state.user.user.loading);
    const Error=useSelector((state)=>state.user.user.error);
    const fileRef=useRef(null);
    const dispatch=useDispatch();
    const [file,setFile]=useState(undefined);
    const [filePercentage,setFilePercentage]=useState(0);
    const [fileError,setFileError]=useState(false);
    const [formData,setFormData]=useState({});
    const navigate=useNavigate();
    //console.log(filePercentage+"%");
    console.log(formData);
    //console.log(currentUser.gmail);

    const handleFileSubmit=(file)=>{
        const storage=getStorage(app);
        const fileName=new Date().getTime()+file.name;
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef,file);
        uploadTask.on('state_changed',(snapshot)=>{
            setFileError(false);
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setFilePercentage(Math.round(progress));
        },
        (error)=>{
            setFileError(true);
            formData.avatar=undefined;
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setFormData({...formData,avatar:downloadURL});
            })
        },
        );

    };
    useEffect(()=>{
        if(file)
        {
            handleFileSubmit(file);
        }
    },[file]);
    const handleFormChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    };
    const handleSubmit=async (e)=>{
        //setFormData({...currentUser,...formData});
        console.log("Form data before sending",formData);
        e.preventDefault();
        try{
            dispatch(updateUserStart());
            const updatedUser=await fetch(`api/user/update/${currentUser._id}`,{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                },
                body:JSON.stringify(formData),
            });
            const data=await updatedUser.json();
            if(data.success==false)
            {
                dispatch(updateUserFailure(data.message));
                return;
            }
            console.log("Updated User",data);
            dispatch(updateUserSuccess(data));
        }
        catch(error)
        {
            //console.log("error message",error.message);
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDelete=async ()=>{
        try{
            dispatch(deleteUserStart());
            const deletedUser=await fetch(`api/user/delete/${currentUser._id}`,{
                method:'DELETE',
            });
            const data=await deletedUser.json();
            if(data.success==false)
            {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess());
            navigate('/signin');   
        }
        catch(error)
        {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut=async ()=>{
        try{
            const signOutUser=await fetch('api/auth/signout',{
                method:'POST',
            });
            const data=await signOutUser.json();
            if(data.success==false)
            {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess());
            navigate('/signin');
        }
        catch(error)
        {
            dispatch(signOutUserFailure(error.message));
        }
        
    }
    return <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl p-3 m-3 font-semibold text-center">Profile</h1>
        <input onChange={(e)=>setFile(e.target.files[0])} hidden accept="image/*" type="file" ref={fileRef} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="self-center mt-2 rounded-full w-24 h-24 object-cover cursor-pointer" />
            {!fileError ? <div hidden={filePercentage==0} className="text-center font-semibold uppercase">{filePercentage!=100 ? <h1>{"Upload in progress : "+filePercentage+"%"}</h1> : <h1 className="text-green">{"Upload Successful!!"}</h1>}</div> : <p className="text-center font-semibold  text-redLight">FILE UPLOAD ERROR!!<p>(Image must be less than 2MB)</p></p>}
            <input onChange={handleFormChange} placeholder="gmail" defaultValue={currentUser.gmail} className="rounded-xl p-3" id="gmail" />
            <input onChange={handleFormChange} placeholder="username" defaultValue={currentUser.username} className="rounded-xl p-3" id="username" />
            <input onChange={handleFormChange} placeholder="password" defaultValue={currentUser.password} className="rounded-xl p-3" id="password" />
            <button disabled={Loading} className="bg-wbrown text-googlewhite p-3 rounded-xl">{!Loading ? "Update" : "Loading..."}</button>
            <button onClick={navigate('/create-listing')} className="bg-wblue text-googlewhite p-3 rounded-xl">Create Listings</button>
        </form>
        <div className="flex justify-between pt-2 mt-2">
            <p onClick={handleDelete} className="text-brownLight hover:text-red cursor-pointer">Delete account?</p>
            <p onClick={handleSignOut}className="text-brownLight hover:text-red cursor-pointer">Sign out</p>
        </div>
        <p className="text-center">{Error ? <span className="text-brown">{Error}</span> : <span className="text-green">Updated Successfully!</span>}</p>
    </div>
}

export default Profile;