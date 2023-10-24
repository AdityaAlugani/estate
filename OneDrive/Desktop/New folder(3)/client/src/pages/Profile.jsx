import react, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'

const Profile=()=>{
    const currentUser=useSelector((state)=>state.user.user.currentUser);
    const fileRef=useRef(null);
    const [file,setFile]=useState(undefined);
    const [filePercentage,setFilePercentage]=useState(0);
    const [fileError,setFileError]=useState(false);
    const [formData,setFormData]=useState({});
    //console.log(filePercentage+"%");
    console.log(formData);

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
    },[file])
    return <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl p-3 m-3 font-semibold text-center">Profile</h1>
        <input onChange={(e)=>setFile(e.target.files[0])} hidden accept="image/*" type="file" ref={fileRef} />
        <form className="flex flex-col gap-4 ">
            <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="self-center mt-2 rounded-full w-24 h-24 object-cover cursor-pointer" />
            {!fileError ? <div hidden={filePercentage==0} className="text-center font-semibold uppercase">{filePercentage!=100 ? <h1>{"Upload in progress : "+filePercentage+"%"}</h1> : <h1 className="text-green">{"Upload Successful!!"}</h1>}</div> : <p className="text-center font-semibold  text-redLight">FILE UPLOAD ERROR!!<p>(Image must be less than 2MB)</p></p>}
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