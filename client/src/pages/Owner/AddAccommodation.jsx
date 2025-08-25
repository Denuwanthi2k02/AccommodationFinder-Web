import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import "./AddAccommodation.css";
import { useAppContext } from "../../contex/AppContext";
import toast from "react-hot-toast";

const AddAccommodation = () => {
  const{axios,currency} = useAppContext()
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // array for 4 images

  const [annex, setAnnex] = useState({
    No: "",
    Street: "",
    rentPerMonth: 0,
    category: "",
    Gender: "",
    Bathroom: "",
    capacity: 0,
    location: "",
    description: "",
  });

  const[isLoading,setIsloading]=useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Accommodation Data Submitted:", annex);
    console.log("Main Image:", mainImage);
    console.log("Gallery Images:", galleryImages);
    if(isLoading) return null
    setIsloading(true)
    try {
      const formData =new FormData()
      formData.append("image", mainImage);  // use mainImage state

      galleryImages.forEach((file) => {
        formData.append("gallery", file);  // append each gallery image
      });

      formData.append('annexData',JSON.stringify(annex))
      const{data}=await axios.post('/api/owner/add-accommodation',formData)

      if(data.success){
        toast.success(data.message)
        setMainImage(null)
        setGalleryImages([]);   
        setAnnex({
          No: "",
          Street: "",
          rentPerMonth: 0,
          category: "",
          Gender: "",
          Bathroom: "",
          capacity: 0,
          location: "",
          description: "",
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsloading(false)
    }
  };

  return (
    <div className="addannex-container">
      {/* Page Title */}
      <Title
        title="Add New Accommodation"
        subTitle="Fill in the details to list a new accommodation, including pricing, availability, and property specifications."
      />

      {/* Form Section */}
      <form onSubmit={onSubmitHandler} className="addannex-form">
        {/* Main Image Upload */}
        <div className="upload-section">
          <label htmlFor="annex-main-image" className="upload-label">
            <img
              src={
                mainImage ? URL.createObjectURL(mainImage) : assets.upload_icon
              }
              alt="Upload annex"
              className="upload-preview"
            />
            <input
              type="file"
              id="annex-main-image"
              accept="image/*"
              hidden
              onChange={(e) => setMainImage(e.target.files[0])}
            />
          </label>
          <p className="upload-text">
            Upload the <strong>main image</strong> of your accommodation
          </p>
        </div>

        {/* Gallery Images Upload */}
        <div className="upload-section gallery-upload">
          <label htmlFor="annex-gallery" className="upload-label">
            <input
              type="file"
              id="annex-gallery"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 4); // only take first 4
                setGalleryImages(files);
              }}
            />
            <div className="gallery-previews">
              {galleryImages.length > 0 ? (
                galleryImages.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Gallery ${index}`}
                    className="gallery-preview"
                  />
                ))
              ) : (
                <img
                  src={assets.upload_icon}
                  alt="Upload gallery"
                  className="upload-preview"
                />
              )}
            </div>
          </label>
          <p className="upload-text">
            Upload up to <strong>4 gallery images</strong>
          </p>
        </div>

        {/* House No. & Street */}
        <div className="grid-2">
          <div className="form-group">
            <label>House No.</label>
            <input
              type="text"
              placeholder="e.g. 5/2..."
              required
              value={annex.No}
              onChange={(e) => setAnnex({ ...annex, No: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              placeholder="e.g. Ocean View Lane..."
              required
              value={annex.Street}
              onChange={(e) => setAnnex({ ...annex, Street: e.target.value })}
            />
          </div>
        </div>

        {/* Area, Price, Location */}
        <div className="grid-3">
          <div className="form-group">
            <label>Area</label>
            <input
              type="text"
              placeholder="e.g. Hapugala..."
              required
              value={annex.Village}
              onChange={(e) => setAnnex({ ...annex, Village: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Monthly Rent {currency}</label>
            <input
              type="number"
              placeholder="5000"
              required
              value={annex.rentPerMonth}
              onChange={(e) =>
                setAnnex({ ...annex, rentPerMonth: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Distance to campus in (km)</label>
            <input
              type="number"
              placeholder="e.g. 2.5"
              required
              value={annex.location}
              onChange={(e) => setAnnex({ ...annex, location: e.target.value })}
            />
          </div>
        </div>

        {/* Bathroom, Gender, Capacity */}
        <div className="grid-3">
          <div className="form-group">
            <label>Bathroom(s)</label>
            <input
              type="text"
              placeholder="e.g. 1, 2, shared/private"
              required
              value={annex.Bathroom}
              onChange={(e) => setAnnex({ ...annex, Bathroom: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Preferred Gender</label>
            <select
              value={annex.Gender}
              onChange={(e) => setAnnex({ ...annex, Gender: e.target.value })}
              required
            >
              <option value="">Select Preferred Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of tenants allowed</label>
            <input
              type="number"
              placeholder="e.g. 4"
              required
              value={annex.capacity}
              onChange={(e) => setAnnex({ ...annex, capacity: e.target.value })}
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="A comfortable annex with a spacious room, modern facilities, and a convenient location."
            required
            value={annex.description}
            onChange={(e) => setAnnex({ ...annex, description: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Accommodation'}
        </button>
      </form>
    </div>
  );
};

export default AddAccommodation;
