import User from "../model/User.js";
import fs from "fs";
import Accommodation from "../model/Accommodation.js";
import imagekit from "../configs/imagekit.js";

//API to Change Role of User
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list accommodation" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const addAnnex = async (req, res) => {
  try {
    const { _id } = req.user;
    let annex = JSON.parse(req.body.annexData);

    // Main image
    const mainImageFile  = req.files?.image?.[0];
    if (!mainImageFile ) {
      return res.json({ success: false, message: "Main image is required" });
    }

    const mainFileBuffer   = fs.readFileSync(mainImageFile .path);
    const mainResponse  = await imagekit.upload({
      file: mainFileBuffer,
      fileName: mainImageFile.originalname,
      folder: "/accommodations",
    });

    //Optimization through imagekit URL transformation
    var mainImageUrl = imagekit.url({
      path: mainResponse.filePath,
      transformation: [
        { width: "1280" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    // Gallery images (max 4)
    const galleryFiles = req.files?.gallery || [];
    if (galleryFiles.length > 4) {
      return res.json({ success: false, message: "Maximum 4 gallery images allowed" });
    }
    let galleryUrls = [];

    for (let file  of galleryFiles) {
      const fileBuffer  = fs.readFileSync(file .path);
      const response  = await imagekit.upload({
        file: fileBuffer,
        fileName: file.originalname,
        folder: "/accommodations/gallery",
      });

      const galleryUrl  = imagekit.url({
        path: response.filePath,
        transformation: [
          { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });

      galleryUrls.push(galleryUrl);
    }

    

    await Accommodation.create({
      ...annex,
      owner: _id,
      image: mainImageUrl,
      gallery: galleryUrls,
    });

    res.json({ success: true, message: "Accommodation added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to List Owner Accommodations
export const getOwnerAnnex = async (req, res) => {
  try {
    const { _id } = req.user;
    const annexs = await Accommodation.find({ owner: _id });
    res.json({ success: true, annexs });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to Toggle Accommodation Availability
export const toggleAnnexAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { annexId } = req.query;

    const annex = await Accommodation.findById(annexId);

    // Check if Accommodation belongs to the user
    if (annex.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    annex.isAvaliable = !annex.isAvaliable;
    await annex.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to delete a accommodation
export const deleteAnnex = async (req, res) => {
  try {
    const { _id } = req.user;
    const { annexId } = req.query;

    const annex = await Accommodation.findById(annexId);

    // Check if accommodation belongs to the user
    if (annex.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    
    annex.owner = null;
    annex.isAvaliable = false;

    await annex.save();

    res.json({ success: true, message: "Accommodation Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const annexs = await Accommodation.find({ owner: _id });
    const totalAccommodations = annexs.length;
    const totalAvailable = annexs.filter(a => a.isAvaliable).length;

    res.json({
      success: true,
      dashboardData: {  
        totalAccommodations,
        totalAvailable,
        recentBookings: [], 
      },
      annexs, 
    });

    
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to update user image

export const updateUserImage = async (req, res)=>{
  try {
    const{_id}=req.user;
    const imageFile  = req.file;

    const fileBuffer =fs.readFileSync(imageFile.path)
    const response=await imagekit.upload({
      file:fileBuffer,
      fileName:imageFile.originalname,
      folder:"/users"
    });

    const  OptimizedImageUrl=imagekit.url({
      path:response.filePath,
      transformation:[
         { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
      ]
    });
     
    await User.findByIdAndUpdate(_id,{ image: OptimizedImageUrl });
    res.json({success:true, message:"Image Updated", image: OptimizedImageUrl,});
    
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
    
  }

}


// API to update an accommodation
export const updateAnnex = async (req, res) => {
  try {
    const { _id } = req.user;
    const { annexId } = req.query;
    let annexData = JSON.parse(req.body.annexData);

    const annex = await Accommodation.findById(annexId);

    // Check ownership
    if (annex.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Update main image if provided
    if (req.files?.image?.[0]) {
      const mainFileBuffer = fs.readFileSync(req.files.image[0].path);
      const mainResponse = await imagekit.upload({
        file: mainFileBuffer,
        fileName: req.files.image[0].originalname,
        folder: "/accommodations",
      });

      const mainImageUrl = imagekit.url({
        path: mainResponse.filePath,
        transformation: [{ width: "1280" }, { quality: "auto" }, { format: "webp" }],
      });

      annex.image = mainImageUrl;
    }

    // Update gallery images if provided
    if (req.files?.gallery?.length) {
      let galleryUrls = [];
      for (let file of req.files.gallery) {
        const fileBuffer = fs.readFileSync(file.path);
        const response = await imagekit.upload({
          file: fileBuffer,
          fileName: file.originalname,
          folder: "/accommodations/gallery",
        });

        galleryUrls.push(
          imagekit.url({
            path: response.filePath,
            transformation: [{ width: "1280" }, { quality: "auto" }, { format: "webp" }],
          })
        );
      }
      annex.gallery = galleryUrls;
    }

    // Update other fields
    Object.assign(annex, annexData);

    await annex.save();
    res.json({ success: true, message: "Accommodation updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
