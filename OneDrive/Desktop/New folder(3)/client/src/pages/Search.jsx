export const Search=()=>{
    return <div className="flex flex-col md:flex-row">
        <div className="md:min-h-screen  border-wbrown p-4 border-b-[0.5px] md:border-r-[0.5px]">
            <form>
                <div className="flex gap-2 p-2 w-full mb-5" style={{
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <label className="whitespace-nowrap font-bold text-brown">Search Term:</label>
                    <input type="text" id="searchTerm" placeholder="Search...." className="p-3   w-full rounded-lg outline-none" />
                </div>
                <div className="flex flex-col gap-8">
                        <div className="flex flex-row flex-wrap gap-3">
                            <label className="font-bold text-brown">Tags:</label>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="all" />
                                <label>Rent & sale</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="rent" />
                                <label>Rent</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="sale" />
                                <label>Sale</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="offer" />
                                <label>Offer</label>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap gap-3">
                            <label className="font-bold text-brown">Amenities:</label>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="parking" />
                                <label>Parking lot</label>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <input className="w-4 h-4" type="checkbox" id="furnished" />
                                <label>Furnished</label>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center gap-2"> 
                                <label className="text-brown font-bold">Sort:</label>
                                <select className="p-2 rounded-lg" id="sort_order">
                                    <option>high to low</option>
                                    <option>low to high</option>
                                    <option>latest</option>
                                    <option>oldest</option>
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