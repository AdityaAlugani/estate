import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing=()=>{
    const [files,setFiles]=useState([]);
    const [uploading,setUploading]=useState(false);
    const [formData,setFormData]=useState({
        imageUrls:[],
    });
    const [imageUploadError,setImageUploadError]=useState(null);
    console.log(formData);
    const storeImage=async (file)=>{
        return new Promise((resolve,reject)=>{
            const storage=getStorage(app);
            const fileName=new Date().getTime()+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(progress);
                },
                (error)=>reject(error),
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>resolve(downloadUrl));
                }
            );
        })  
    }
    const handleImageSubmit=async (e)=>{
        setUploading(true);
        if(files.length>0 && files.length+formData.imageUrls.length<7)
        {
            const promises=[];
            for(let i=0;i<files.length;i++)
            {
                promises.push(storeImage(files[i]));
            }
            await Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
                setImageUploadError(false);

            }).catch((err)=>setImageUploadError("(Add image upto 2mb only)"));
            setUploading(false);
        }
        else
        {
            setImageUploadError("You can only upload 6 images per listing");
            setUploading(false);
        }
    }
    console.log(files);

    const handleImageDelete=(i)=>{
        setFormData({
            imageUrls:formData.imageUrls.filter((_,u_)=>u_!==i),
        });
    }
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
                <div className="flex gap-4 flex-wrap">
                    <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray max-w-3xl rounded" type="file" id="images" accept="images/*" multiple/>
                    {imageUploadError && <p className="text-redLight w-full text-sm font-semibold">{imageUploadError}</p>}
                    <div className="flex gap-2 flex-wrap w-full">
                        {
                            formData.imageUrls.length>0 && formData.imageUrls.map((url,i)=>{
                                return <div key={url+"tiemebiteme"} className="relative justify-center">
                                    <img key={url+"bitemetieme"} alt="Listing image" className="object-cover w-40 h-40 rounded-lg self-center"  src={url} />
                                    <button key={url} type="button" onClick={()=>handleImageDelete(i)} className="absolute bg-redLight rounded-lg text-white w-8 left-0 top-0">X</button>
                                </div>
                            })
                        }
                    </div>
                    
                    <button disabled={uploading} type="button" onClick={handleImageSubmit} className="p-3 text-black border  rounded uppercase hover:shadow-lg hover:bg-wskin hover:text-wcreame disabled:opacity-80">{uploading ? "Uploading..." : "Upload"}</button>
                    <button className="p-3 max-w-2xl text-black border  rounded uppercase hover:shadow-lg hover:bg-wskin hover:text-wcreame disabled:opacity-80">Create Listing</button>

                </div>
                
            </form>
        </main>
    );
};

export default CreateListing;
