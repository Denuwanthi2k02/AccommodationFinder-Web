import express from "express";
import { protect } from "../middleware/auth.js";
import { addAnnex, changeRoleToOwner, deleteAnnex, getOwnerAnnex, toggleAnnexAvailability } from "../controllers/ownerController.js";
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
ownerRouter.get("/toggle-accommodation" ,protect,toggleAnnexAvailability)
ownerRouter.get("/delete-accommodation" ,protect,deleteAnnex)
export default ownerRouter;
