import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const annexSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    No: { type: String, required: true },
    Street: { type: String, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    Village: { type: String, required: true },
    capacity: { type: Number, required: true },
    Bathroom: { type: String, required: true },
    Gender: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Annex = mongoose.model("Accommodation", annexSchema);

export default Annex;
