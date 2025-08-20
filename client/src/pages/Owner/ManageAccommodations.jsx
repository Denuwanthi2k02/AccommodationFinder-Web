import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import { dummyAnnexData, assets } from "../../assets/assets";
import "./ManageAccommodations.css";

const ManageAccommodations = () => {
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    setCars(dummyAnnexData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="manage-cars-container">
      {/* Header Section */}
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      {/* Table Wrapper Section */}
      <div className="manage-cars-table-wrapper">
        <table className="manage-cars-table">
          <thead>
            <tr>
              <th>Accommodation</th>
              <th className="hide-on-mobile">Capacity</th>
              <th>Rent</th>
              <th className="hide-on-mobile">Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td className="car-info">
                  <img src={car.image} alt="" className="car-image" />
                  <div className="car-name hide-on-mobile">
                    <p>
                      {car.No} {car.Street}
                    </p>
                    <p>{car.Village} </p>
                  </div>
                </td>

                <td className="hide-on-mobile">{car.capacity}</td>
                <td>{`$${car.pricePerDay}/month`}</td>
                <td className="hide-on-mobile">
                  <span
                    className={
                      car.isAvaliable
                        ? "status-available"
                        : "status-unavailable"
                    }
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="actions">
                  <img
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt=""
                    className="action-icon"
                  />
                  <img
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
