import User from "../model/User.js";

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
    const imageFile = req.file;

    res.json({ success: true, message: "Accommodation added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
