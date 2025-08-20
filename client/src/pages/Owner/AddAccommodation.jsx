import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import "./AddAccommodation.css";

const AddAccommodation = () => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // array for 4 images

  const [annex, setCar] = useState({
    No: "",
    Street: "",
    pricePerDay: 0,
    category: "",
    Gender: "",
    Bathroom: "",
    capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Accommodation Data Submitted:", annex);
    console.log("Main Image:", mainImage);
    console.log("Gallery Images:", galleryImages);
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
              onChange={(e) => setCar({ ...annex, No: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              placeholder="e.g. Ocean View Lane..."
              required
              value={annex.Street}
              onChange={(e) => setCar({ ...annex, Street: e.target.value })}
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
              onChange={(e) => setCar({ ...annex, Village: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Monthly Rent (LKR)</label>
            <input
              type="number"
              placeholder="5000"
              required
              value={annex.pricePerDay}
              onChange={(e) =>
                setCar({ ...annex, pricePerDay: e.target.value })
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
              onChange={(e) => setCar({ ...annex, location: e.target.value })}
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
              onChange={(e) => setCar({ ...annex, Bathroom: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Preferred Gender</label>
            <select
              value={annex.Gender}
              onChange={(e) => setCar({ ...annex, Gender: e.target.value })}
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
              onChange={(e) => setCar({ ...annex, capacity: e.target.value })}
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
            onChange={(e) => setCar({ ...annex, description: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          <img src={assets.tick_icon} alt="" />
          List Your Accommodation
        </button>
      </form>
    </div>
  );
};

export default AddAccommodation;
