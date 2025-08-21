import express from "express";
import { searchAccommodations } from "../controllers/accommodationController.js";

const router = express.Router();

// Search API
router.get("/search", searchAccommodations);

export default router;
