import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import {assets } from "../../assets/assets";
import "./ManageAccommodations.css";
import { useAppContext } from "../../contex/AppContext";
import toast from "react-hot-toast";


const ManageAccommodations = () => {

  const{isOwner,axios,currency}=useAppContext()

  const [annexs, setAnnexs] = useState([]);

  const fetchOwnerAnnexs = async () => {
    try {
      const {data} =await axios.get('/api/owner/accommodations')
      if (data.success){
        setAnnexs(data.annexs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const toggleAvailability = async (annexId) => {
    try {
      const {data} =await axios.post(`/api/owner/toggle-accommodation?annexId=${annexId}`)
      if (data.success){
        toast.success(data.message)
        fetchOwnerAnnexs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteAnnex = async (annexId) => {

    try {
      const confirm = window.confirm('Are you sure you want to delete this Accommodation?')
      if (!confirm) return null
      console.log("Deleting annex:", annexId);
      const {data} =await axios.post(`/api/owner/delete-accommodation?annexId=${annexId}`)
      if (data.success){
        toast.success(data.message)
        fetchOwnerAnnexs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    isOwner &&fetchOwnerAnnexs();
  }, [isOwner]);

  return (
    <div className="manage-annexs-container">
      {/* Header Section */}
      <Title
        title="Manage annexs"
        subTitle="View all listed annexs, update their details, or remove them from the booking platform."
      />

      {/* Table Wrapper Section */}
      <div className="manage-annexs-table-wrapper">
        <table className="manage-annexs-table">
          <thead>
            <tr>
              <th>Accommodation</th>
              <th className="hide-on-mobile">Capacity</th>
              <th>Rent (Monthly)</th>
              <th className="hide-on-mobile">Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {annexs.map((annex, index) => (
              <tr key={index}>
                <td className="annex-info">
                  <img src={annex.image} alt="" className="annexs-image" />
                  <div className="annex-name hide-on-mobile">
                    <p>
                      {annex.No} {annex.Street}
                    </p>
                    <p>{annex.Village} </p>
                  </div>
                </td>

                <td className="hide-on-mobile">{annex.capacity}</td>
                <td>{currency}  {annex.rentPerMonth}</td>
                <td className="hide-on-mobile">
                  <span
                    className={
                      annex.isAvaliable
                        ? "status-available"
                        : "status-unavailable"
                    }
                  >
                    {annex.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="actions">

                  <img
                    onClick={()=>toggleAvailability(annex._id)}
                    src={
                      annex.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt=""
                    className="action-icon"
                  />

                  <img
                    onClick={()=>deleteAnnex(annex._id)}
                    src={assets.delete_icon}
                    alt=""
                    className="action-icon"
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccommodations;
