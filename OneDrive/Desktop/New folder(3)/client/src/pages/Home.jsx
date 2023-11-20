import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
// import { Navigation } from  "Swiper/core";

const Home=()=>{
    const [offerListings,setOfferListings]=useState([]);
    const [saleListings,setSaleListings]=useState([]);
    const [rentListings,setRentListings]=useState([]);
    const navigate=useNavigate();
    console.log(offerListings);
    SwiperCore.use([Navigation]);
    useEffect(()=>{
        const fetchSaleListings=async()=>{
            try{
                const res=await fetch('/api/listing/get?type=sale&limit=4');
                const data=await res.json();
                setSaleListings(data);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        const fetchRentListings=async()=>{
            try{
                const res=await fetch('/api/listing/get?type=rent&limit=4');
                const data=await res.json();
                setRentListings(data);
                await fetchSaleListings();
            }
            catch(error)
            {
                console.log(error);
            }
        }
        const fetchOfferListings=async()=>{
            try{
                const res=await fetch('/api/listing/get?offer=true&limit=4');
                const data=await res.json();
                setOfferListings(data);
                await fetchRentListings();
            }
            catch(error)
            {
                console.log(error);
            }
        }
        fetchOfferListings();
    },[])
    
    return <div>
        {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
            <h1 className="text-wbrown font-bold text-3xl lg:text-6xl">
                Find your next <span className="text-wdcreame">Perfect</span><br/> place with ease
            </h1>
            <div className="text-wbrown text-xs sm:text-sm">
                the best place to find your next perfect place to live.
                <br/>
                We have a wide range of properties for you to choose from. 
            </div>
            <a className="text-xs xm:text-sm text-steelBlue hover:underline cursor-pointer" onClick={()=>Navigate('/search')}>Lets get started</a>
        </div>

        {/* swiper */}
        <Swiper navigation>
            {
                offerListings && offerListings.length > 0 && (
                    offerListings.map((listing)=>{
                        return <SwiperSlide key={listing._id}>
                            <img key={listing._id} src={listing.imageUrls[0]}  className="md:h-[800px] w-[98%] mx-auto object-fit" style={{
                                background:"center no-repeat",backgroundSize:"cover"
                            }} />
                        </SwiperSlide>
                    })
                )
            }
        </Swiper>  

        {/* listing result for offer, sale and rent*/}
        <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
            {offerListings && offerListings.length>0 && (
                <div className="">
                    <div className="">
                        <h1 className="font-bold text-2xl text-wbrown">
                            Recent offers
                        </h1>
                        <a className="font-semibold my-4 text-wgreen cursor-pointer hover:text-wbrown" onClick={()=>navigate('/search?offer=true')}>
                            Show more offers
                        </a>
                    </div>
                    <div className="flex gap-3 mt-3 flex-wrap justify-center md:justify-normal">
                        {
                            offerListings.map((listing)=>{
                                return <ListingItem className="w-[180px]" listing={listing} key={listing._id} />
                            })
                        }
                    </div>
                </div>
            )}
           
             {rentListings && rentListings.length>0 && (
                <div className="">
                    <div className="">
                        <h1 className="font-bold text-2xl text-wbrown">
                            Recent places for rent
                        </h1>
                        <a className="font-semibold my-4 text-wgreen cursor-pointer hover:text-wbrown" onClick={()=>navigate('/search?type=rent')}>
                            Show more rent listings! 
                        </a>
                    </div>
                    <div className="flex gap-3 mt-3 flex-wrap justify-center md:justify-normal">
                        {
                            rentListings.map((listing)=>{
                                return <ListingItem className="w-[180px]" listing={listing} key={listing._id} />
                            })
                        }
                    </div>
                </div>
            )}
              {saleListings && saleListings.length>0 && (
                <div className="">
                    <div className="">
                        <h1 className="font-bold text-2xl text-wbrown">
                            Recent sale offers
                        </h1>
                        <a className="font-semibold my-4 text-wgreen cursor-pointer hover:text-wbrown" onClick={()=>navigate('/search?type=sale')}>
                            Show more places for sale!
                        </a>
                    </div>
                    <div className="flex gap-3 mt-3 flex-wrap justify-center md:justify-normal">
                        {
                            saleListings.map((listing)=>{
                                return <ListingItem className="w-[180px]" listing={listing} key={listing._id} />
                            })
                        }
                    </div>
                </div>
            )}
        </div>
        
    </div>
}

export default Home;