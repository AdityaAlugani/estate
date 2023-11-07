import React, { useEffect, useState } from "react";
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";{/*No*/}
import {useSelector} from "react-redux";

const Header=()=>{
    const [searchTerm,setSearchTerm]=useState("");
    const navigate=useNavigate();
    const currentUser=useSelector((state)=>state.user.user.currentUser);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(window.location.search );
        urlParams.set('searchTerm',searchTerm);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    
    useEffect(()=>{
        const urlparams=new URLSearchParams(location.search);
        const searchterm=urlparams.get('searchTerm');
        if(searchterm)
        {
            setSearchTerm(searchterm);
        }
    },[location.search]);
    return (<header className="bg-wskin shadow-md">
        <div className="flex justify-between items-center max-w-7xl  mx-auto p-3">
            <h1 onClick={()=>navigate("/")} className="font-bold text-sm sm:text-xl flex flex-wrap hover:cursor-pointer">
                <span className="text-wgreen googleviga">JatayuO</span><span className="text-wcreame">-</span>
                <span className="text-wcreame googleviga">OEstates</span>
            </h1>
            <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg no-focus-onselect  flex items-center">
                <div className="relative">
                    <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="bg-transparent p-3 rounded-lg w-25 sm:w-64" type="text" placeholder="Search..."/>
                    <button>
                        <FaSearch className="absolute bottom-1.5 right-0 text-wgreen m-2 " />
                    </button>
                    
                </div>
                
            </form>
            <ul className="flex gap-4 ml-4 text-wcreame justify-center align-center">
                    <li onClick={()=>navigate("/")}  className="hidden sm:inline hover:underline hover:cursor-pointer">Home</li>
                    <li onClick={()=>navigate("/about")} className="hidden sm:inline hover:underline hover:cursor-pointer">About</li>
                    {currentUser ? <img  onClick={()=>navigate("/profile")} className="cursor-pointer rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" /> : 
                    <li onClick={()=>navigate("/signin")} className="hover:underline hover:cursor-pointer">Sign In</li> }
                    
                </ul>
        </div>
        
    </header>)  
}

export default Header;