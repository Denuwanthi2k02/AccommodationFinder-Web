import express from "express";
import { protect } from "../middleware/auth.js";
import { addAnnex, changeRoleToOwner, deleteAnnex, getOwnerAnnex, toggleAnnexAvailability,getDashboardData, updateUserImage ,updateAnnex} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js"

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post(
  "/add-accommodation",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 4 },
  ]),
  protect,
  addAnnex
);
ownerRouter.get("/accommodations" ,protect,getOwnerAnnex)
ownerRouter.post("/toggle-accommodation" ,protect,toggleAnnexAvailability)
ownerRouter.post("/delete-accommodation" ,protect,deleteAnnex)
ownerRouter.get("/dashboard" ,protect,getDashboardData)
ownerRouter.post("/update-image" ,protect,upload.single("image"),updateUserImage)
ownerRouter.put(
  "/update-accommodation",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 4 },
  ]),
  protect,
  updateAnnex
);
export default ownerRouter;
