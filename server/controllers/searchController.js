import Accommodation from "../model/Accommodation.js";

//API to search the accommodations
export const searchAccommodations = async (req, res) => {
  try {
    const { location, capacity, maxPrice } = req.query;

    const query = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (capacity) query.capacity = { $gte: parseInt(capacity) };
    if (maxPrice) query.pricePerDay = { $lte: parseInt(maxPrice) };

    const results = await Accommodation.find(query);

    res.json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
