import { FaMap, FaMapMarkedAlt, FaMapMarker } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

export const ListingItem=({listing})=>{
    const navigate=useNavigate();
    return <div>
        {listing.imageUrls &&
        <div className="rounded-lg bg-white flex flex-col gap-2 w-full sm:w-[340px] shadow-md hover:shadow-lg transition-shadow overflow-hidden" onClick={()=>navigate(`/listing/${listing._id}`)}>
            <img className="h-[320px] sm:h-[220px] w-full sm:w-[340px] object-cover hover:scale-105 transition-scale duration-300" src={listing.imageUrls[0]} alt="" />
            <div className="pl-2 mt-5 flex flex-col">
                <p className="text-lg text-brown truncate font-semibold ">{listing.name}</p>
                <div className="flex flex-row mt-2 ml-2 items-center"><MdLocationOn className="text-green w-[20px]" /><p className="text-sm truncate">{listing.address}</p></div>
            </div>
            <p className="overflow-ellipsis line-clamp-2 m-2 text-sm font-light" style={{textAlign:"justify"}}>{listing.description}</p>
            <p className="font-bold px-3 text-brown">{listing.type==='rent'?`$${parseInt(listing.discountPrice).toLocaleString()} / Month`:`$${parseInt(listing.discountPrice).toLocaleString()} Sale`}</p>
            <div className="flex justify-start  text-wbrown text-[12px] font-extrabold ml-3 pb-5  gap-3">
            <p>{`${listing.bedrooms} Beds`}</p>
            <p>{`${listing.bathrooms} Baths`}</p>
            </div>

        </div>
        }
        </div>
};

export default ListingItem;