import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


const Listing=()=>{
    SwiperCore.use([Navigation]);

    const params=useParams();
    const [listing,setListing]=useState(null);
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
    },[]);
    return <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
        {
            listing && !error && !loading && (
                <>
                    <Swiper navigation >
                        {
                            listing.imageUrls.map((url)=>{
                                return <SwiperSlide key={url}>
                                    <div className="h-[450px] mx-auto object-contain" style={{backgroundSize:"full",
                                        background:`url(${url}) center no-repeat`
                                    }}></div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </>

            )

        }
    </main>
}

export default Listing;