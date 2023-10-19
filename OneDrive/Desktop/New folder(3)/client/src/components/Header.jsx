import React from "react";
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";{/*No*/}

const Header=()=>{
    const navigate=useNavigate();
    return (<header className="bg-wskin shadow-md">
        <div className="flex justify-between items-center max-w-7xl  mx-auto p-3">
            <h1 onClick={()=>navigate("/")} className="font-bold text-sm sm:text-xl flex flex-wrap hover:cursor-pointer">
                <span className="text-wgreen">JatayuO</span><span className="text-wcreame">-</span>
                <span className="text-wcreame">OEstates</span>
            </h1>
            <form className="bg-slate-100 rounded-lg no-focus-onselect  flex items-center">
                <div className="relative">
                    <input className="bg-transparent p-3 rounded-lg w-25 sm:w-64" type="text" placeholder="Search..."/>
                    <FaSearch className="absolute bottom-1.5 right-0 text-wgreen m-2 " />
                </div>
                
            </form>
            <ul className="flex gap-4 ml-4 text-wcreame">
                    <li onClick={()=>navigate("/")}  className="hidden sm:inline hover:underline hover:cursor-pointer">Home</li>
                    <li onClick={()=>navigate("/about")} className="hidden sm:inline hover:underline hover:cursor-pointer">About</li>
                    <li onClick={()=>navigate("/signin")} className="hover:underline hover:cursor-pointer">Sign In</li>
                </ul>
        </div>
        
    </header>)  
}

export default Header;