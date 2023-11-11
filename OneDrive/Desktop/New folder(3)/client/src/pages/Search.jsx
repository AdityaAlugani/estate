import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search=()=>{
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState({});
    console.log(listings);
    const [sidebardata,setSidebardata]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    });


    const navigate=useNavigate();
    const handleChange=(e)=>{
        if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale')
        {
            setSidebardata({...sidebardata,type:e.target.value?e.target.id:undefined});
        }
        if(e.target.id==='offer' || e.target.id==='furnished' || e.target.id==='parking')
        {
            const target=sidebardata[e.target.id];
            setSidebardata({...sidebardata,[e.target.id]:!target});
        }
        if(e.target.id==='searchTerm')
        {
            setSidebardata({...sidebardata,searchTerm:e.target.value});
        }
        if(e.target.id==='sort_order')
        {
            const sort=e.target.value.split('_')[0] || "createdAt";
            const order=e.target.value.split('_')[1] || 'desc';
            setSidebardata({...sidebardata,sort,order});
        }
    }
    //console.log(sidebardata);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const urlInfo=new URLSearchParams();
        urlInfo.set('searchTerm',sidebardata.searchTerm);
        urlInfo.set('type',sidebardata.type);
        urlInfo.set('furnished',sidebardata.furnished);
        urlInfo.set('offer',sidebardata.offer);
        urlInfo.set('sort',sidebardata.sort);
        urlInfo.set('order',sidebardata.order);
        urlInfo.set('parking',sidebardata.parking);
        navigate(`/search?${urlInfo.toString()}`);
    }
    const fetchListing=async ()=>{
        setLoading(true);
        const searchQuery=urlparameters.toString();
        const res=await fetch(`/api/listing/get?${searchQuery}`);
        const data=await res.json();
        setListings(data);
        setLoading(false);
    }
    useEffect(()=>{
        const urlparameters=new URLSearchParams(window.location.search);
        const urlSearchTerm=urlparameters.get("searchTerm");
        const urlType=urlparameters.get("type");
        const urlFurnished=urlparameters.get("furnished");
        const urlOffer=urlparameters.get("offer");
        const urlSort=urlparameters.get("sort");
        const urlOrder=urlparameters.get("order");
        const urlparking=urlparameters.get("parking");
        if(urlFurnished || urlSearchTerm || urlOffer || urlType || urlSort || urlOrder || urlparking)
        {
            setSidebardata({...sidebardata,searchTerm:urlSearchTerm,type:urlType,
                sort:urlSort,order:urlOrder});
        }
        const fetchListing=async ()=>{
            setLoading(true);
            const searchQuery=urlparameters.toString();
            const res=await fetch(`/api/listing/get?${searchQuery}`);
            const data=await res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListing();
    },[location.search]);
    return <div className="flex flex-col md:flex-row">
        <div className="md:min-h-screen  border-wbrown p-4 border-b-[0.5px] md:border-r-[0.5px]">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2 p-2 w-full mb-5" style={{
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <label className="whitespace-nowrap font-bold text-brown">Search Term:</label>
                    <input type="text" value={sidebardata.searchTerm} onChange={handleChange} id="searchTerm" placeholder="Search...." className="p-3   w-full rounded-lg outline-none" />
                </div>
                <div className="flex flex-col gap-8">
                        <div className="flex flex-row flex-wrap gap-3">
                            <label className="font-bold text-brown">Tags:</label>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="all" onChange={handleChange} 
                                checked={sidebardata.type==='all'}
                                />
                                <label>Rent & sale</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="rent" onChange={handleChange} 
                                checked={sidebardata.type==='rent'}/>
                                <label>Rent</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="sale" onChange={handleChange} 
                                checked={sidebardata.type==='sale'}/>
                                <label>Sale</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="offer" onChange={handleChange} 
                                checked={sidebardata.offer}/>
                                <label>Offer</label>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap gap-3">
                            <label className="font-bold text-brown">Amenities:</label>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="parking" onChange={handleChange} 
                                checked={sidebardata.parking}/>
                                <label>Parking lot</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="furnished" onChange={handleChange} 
                                checked={sidebardata.furnished}/>
                                <label>Furnished</label>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center gap-2"> 
                                <label className="text-brown font-bold">Sort:</label>
                                <select onChange={handleChange} defaultValue={'createdAt_desc'} className="p-2 rounded-lg" id="sort_order">
                                    <option value={'createdAt_desc'}>Date latest</option>
                                    <option value={'regularPrice_asc'}>Price low to high</option>
                                    <option value={'regularPrice_desc'}>Price high to low</option>
                                    <option value={'createdAt_asc'}>Date oldest</option>
                                </select>
                            </div>
                        </div>

                        <button className="p-3 bg-wbrown hover:opacity-95 rounded-lg text-wcreame">Search</button>
                </div>
            </form>
        </div>



        <div>
            <h1 className="text-3xl text-brown font-semibold flex p-2 border-b-[0.5px] border-wbrown">Listing results:</h1>
        </div>


    </div>
};

export default Search;