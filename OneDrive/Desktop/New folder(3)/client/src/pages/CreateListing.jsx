const CreateListing=()=>{
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold lg:mr-10 text-center my-7">Create a listing</h1>
            <form className="flex flex-col gap-6">
                <div className="flex max-w-3xl flex-col gap-4 flex-1 mb-3">
                    <input type="text" placeholder="Name" className="flex-1 p-3 rounded-lg" id="name" maxLength="62" minLength="10" required/>
                    <textarea type="text" placeholder="Description" className="flex-2 p-3 rounded-lg" id="description" required/>
                    <input type="text" placeholder="Address" className="flex-1 p-3 rounded-lg" id="address" required/>
                </div>
                <div className="flex flex-row gap-5 flex-1 flex-wrap">
                    <div className="flex flex-row gap-2 self-center">
                        <input type="checkbox" id="sale" className="w-5"/>
                        <span>Sell</span>
                    </div>
                    <div className="flex flex-row gap-2 self-center">
                        <input type="checkbox" id="parking" className="w-5"/>
                        <span>Parking spot</span>
                    </div>
                    <div className="flex flex-row gap-2 self-center ">
                        <input type="checkbox" id="furnished" className="w-5"/>
                        <span>Furnished</span>
                    </div>
                    <div className="flex flex-row gap-2 self-center">
                        <input type="checkbox" id="offer" className="w-5"/>
                        <span>Offer</span>
                    </div>
                    <div className="flex gap-5 my-2 w-full">
                    <div className="flex items-center gap-2">
                            <input placeholder="" type="number" id='bedrooms' min="1" max="10" required className="p-1 border-gray-300 rounded-lg"/>
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id='baths' min="1" max="10" required className="p-1 border-gray-300 rounded-lg"/>
                            <p>Baths</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4">
                                <input type="number" id='regularprice' required className="p-1 border-gray-300 rounded-lg w-20"/>
                                <div className="flex flex-col align-middle justify-center"><p>Regular price</p> <span className="self-center">($/month)</span></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" id='discountprice' required className="p-1 border-gray-300 rounded-lg w-20"/>
                                <div className="flex flex-col align-middle justify-center"><p>Discount price</p> <span className="self-center">($/month)</span></div>
                            </div>
                    </div>
                        
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold">Images:<span className="font-normal text-gray ml-2">The first image will be the cover (max 6)</span></p>
                </div>
                <div className="flex gap-4 mb-6 flex-wrap">
                    <input className="p-3 border border-gray max-w-3xl rounded" type="file" id="images" accept="images/*" multiple/>
                    <button className="p-3 text-black border  rounded uppercase hover:shadow-lg hover:bg-wskin hover:text-wcreame disabled:opacity-80">Upload</button>
                    <button className="p-3 max-w-2xl text-black border  rounded uppercase hover:shadow-lg hover:bg-wskin hover:text-wcreame disabled:opacity-80">Create Listing</button>

                </div>
            </form>
        </main>
    );
};

export default CreateListing;
