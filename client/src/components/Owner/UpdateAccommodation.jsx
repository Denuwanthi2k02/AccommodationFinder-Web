import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import "./UpdateAccommodation.css";
import { useAppContext } from "../../contex/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateAccommodation = ({ existingData, onClose }) => {
  const { currency } = useAppContext();
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [annex, setAnnex] = useState({
    No: "",
    Street: "",
    Village: "",
    rentPerMonth: 0,
    Bathroom: "",
    Gender: "",
    capacity: 0,
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingData) {
      setAnnex({
        No: existingData.No || "",
        Street: existingData.Street || "",
        Village: existingData.Village || "",
        rentPerMonth: existingData.rentPerMonth || 0,
        Bathroom: existingData.Bathroom || "",
        Gender: existingData.Gender || "",
        capacity: existingData.capacity || 0,
        location: existingData.location || "",
        description: existingData.description || "",
      });
      setMainImage(existingData.image || null);
      setGalleryImages(existingData.gallery || []);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!existingData._id) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("annexData", JSON.stringify(annex));

      if (mainImage && typeof mainImage !== "string") formData.append("image", mainImage);
      galleryImages.forEach((file) => {
        if (typeof file !== "string") formData.append("gallery", file);
      });

      const { data } = await axios.put(
        `/api/owner/update-accommodation?annexId=${existingData._id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addannex-container">
      <Title
        title="Update Accommodation"
        subTitle="Update the details of your accommodation."
      />

      <form onSubmit={handleSubmit} className="addannex-form">
        {/* Main Image */}
        <div className="upload-section">
          <label htmlFor="main-image" className="upload-label">
            <img
              src={
                mainImage
                  ? typeof mainImage === "string"
                    ? mainImage
                    : URL.createObjectURL(mainImage)
                  : assets.upload_icon
              }
              alt="Upload main"
              className="upload-preview"
            />
            <input
              type="file"
              id="main-image"
              accept="image/*"
              hidden
              onChange={(e) => setMainImage(e.target.files[0])}
            />
          </label>
          <p className="upload-text">
            Upload the <strong>main image</strong> of your accommodation
          </p>
        </div>

        {/* Gallery Images */}
        <div className="upload-section gallery-upload">
          <label htmlFor="gallery-images" className="upload-label">
            <input
              type="file"
              id="gallery-images"
              accept="image/*"
              multiple
              hidden
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files).slice(0, 4))
              }
            />
            <div className="gallery-previews">
              {galleryImages.length > 0 ? (
                galleryImages.map((img, index) => (
                  <img
                    key={index}
                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
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
          <p className="upload-text">Upload up to <strong>4 gallery images</strong></p>
        </div>

        {/* House No. & Street */}
        <div className="grid-2">
          <div className="form-group">
            <label>House No.</label>
            <input
              type="text"
              placeholder="e.g. 5/2"
              required
              value={annex.No}
              onChange={(e) => setAnnex({ ...annex, No: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              placeholder="e.g. Ocean View Lane"
              required
              value={annex.Street}
              onChange={(e) => setAnnex({ ...annex, Street: e.target.value })}
            />
          </div>
        </div>

        {/* Village, Rent, Location */}
        <div className="grid-3">
          <div className="form-group">
            <label>Area / Village</label>
            <input
              type="text"
              placeholder="e.g. Hapugala"
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
              onChange={(e) => setAnnex({ ...annex, rentPerMonth: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Distance to campus (km)</label>
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
              required
              value={annex.Gender}
              onChange={(e) => setAnnex({ ...annex, Gender: e.target.value })}
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
            placeholder="A comfortable annex with spacious rooms and modern facilities."
            required
            value={annex.description}
            onChange={(e) => setAnnex({ ...annex, description: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          {isLoading ? "Updating..." : "Update Accommodation"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccommodation;
