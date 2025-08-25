import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import {  assets } from "../../assets/assets";
import "./Dashboard.css";
import { useAppContext } from "../../contex/AppContext";
import toast from "react-hot-toast";


const Dashboard = () => {
  const{axios,isOwner} =useAppContext()
  

  const [data, setData] = useState({
    totalAccommodations: 0,
    totalAvailable: 0,
     recentBookings: [] 
  });

  const dashboardCards = [
    {
      title: "Total Accommodations",
      value: data.totalAccommodations,
      icon: assets.annex,
    },
    {
      title: "Available Accommodations ",
      value: data.totalAvailable,
      icon: assets.listIcon,
    },
  ];

  const fetchDashboardData = async ()=>{
    try {
      const{data} = await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if(isOwner){
      fetchDashboardData()
    }
    
  }, [isOwner]);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Cards */}
      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-text">
              <h1>{card.title}</h1>
              <p>{card.value}</p>
            </div>
            <div className="card-icon">
              <img src={card.icon} alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Content Section */}
      <div className="dashboard-content">
        <div className="recent-bookings">
          <h1 className="section-title">Total Views</h1>
          <p className="section-subtitle">Total accommodation impressions</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="booking-item">
              <div className="booking-info">
                <div className="booking-icon">
                  <img src={assets.listIcon} alt="" />
                </div>
                <div>
                  <p>
                    {booking.annex.No} {booking.annex.Street}
                  </p>
                  <p className="booking-date">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="booking-meta">
                <p className="booking-price">{booking.annex.views}</p>
                <img src={assets.eye_icon} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
