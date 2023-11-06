import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from 'swiper/modules';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEnvelope, faPenNib, faShare,faMapMarker,faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarker, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.jsx";


const Listing=()=>{
    SwiperCore.use([Navigation]);
    const params=useParams();
    const AuthenticatedUser=useSelector((state)=>state.user.user.currentUser);
    //console.log(AuthenticatedUser);
    const [listing,setListing]=useState(null);
    const [contact,setContact]=useState(false);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    useEffect(()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        const fetchListing=async ()=>{
            try{
                setLoading(true);
                setError(false);
                const res=await fetch(`/api/listing/get/${params.listingid}`);
                const data=await res.json()
                if(data.success===false)
                {
                    setError(true);
                    setLoading(false);
                    return;
                }
                console.log(data);
                setListing(data);
                setLoading(false);
            }
            catch(error)
            {
                console.log(error.message);
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
        //
        console.log(AuthenticatedUser ?  AuthenticatedUser :  null,listing ? listing.userRef : null);
    },[]);

    
    return <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
        {
            listing && !error && !loading && (
                <>
                    <Swiper navigation  >
                        {
                            listing.imageUrls.map((url)=>{
                                return <SwiperSlide key={url}>
                                    <div className="h-[450px] w-full">
                                        <img className="object-cover h-full w-full" src={url}></img>
                                    </div>
                                    
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                    <div className="felx flex-col">
                        <div>
                            <FontAwesomeIcon icon={faShare} className="fa fa-1xl cursor-pointer fixed rounded-full p-5 bg-wskin text-white z-10" style={{
                                top:"7rem",
                                right:"0.5rem"
                            }}/>
                        </div>
                        <div className="max-w-4xl p-4 mx-auto flex flex-col flex-wrap gap-5 m-2">
                        {listing && <h1 className="text-2xl my-5 p-1 googleviga">{listing.name}   (${listing.offer ? listing.discountPrice : listing.regularPrice} {listing.type === 'rent' ? "/month" : "to own"})</h1>}
                            <span><FontAwesomeIcon className="text-green" icon={faMapLocationDot} /><span className="p-2 mb-5">{listing.address}</span></span>
                            <div className="flex w-full flex-row gap-3">
                                <button className="p-2 px-6 bg-grayLight rounded-lg">For {listing.type}</button>
                                <button className="p-2 px-6 bg-green text-white rounded-lg">{listing.offer ? `Limited time: ${listing.discountPrice}` : <span>${`${listing.regularPrice}`}</span>}</button>
                            </div>
                            <p className="text-gray text-justify">
                                <span className="font-semibold text-black">Description-</span>
                                {listing.description}
                            </p>
                            <ul className="flex flex-row gap-2 sm:gap-6 text-green font-semibold flex-wrap">
                                <li className="flex flex-row gap-1 justify-center" style={{justifyContent:"center",alignItems:"center"}}>
                                    <FaBed className="text-lg" />
                                    <p className="text-sm font-semibold">{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</p>
                                </li>
                                <li className="flex flex-row gap-1 justify-center" style={{justifyContent:"center",alignItems:"center"}}>
                                    <FaBath className="text-lg" />
                                    <p className="text-sm">{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</p>
                                </li>
                                <li className="flex flex-row gap-1 justify-center" style={{justifyContent:"center",alignItems:"center"}}>
                                    <FaParking className="text-lg" />
                                    <p className="text-sm">{listing.parking? `Parking Spot` : `No Parking` }</p>
                                </li>
                                <li className="flex flex-row gap-1 justify-center" style={{justifyContent:"center",alignItems:"center"}}>
                                    <FaChair className="text-lg" />
                                    <p className="text-sm">{listing.furnished? `Furnished` : `Not Furnished` }</p>
                                </li>
                            </ul>
                            <button type="button" onClick={()=>setContact(true)} className="bg-wskin rounded-lg p-2 hover:rounded-none hover:opacity-95" hidden={! (AuthenticatedUser && listing && !contact && AuthenticatedUser._id !== listing.userRef)} >Contact Landlord</button>
                        {contact && <Contact listing={listing}/>}
                        </div>
                    </div>
                </>

            )

        }
    </main>
}

export default Listing;