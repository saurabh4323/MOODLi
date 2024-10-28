"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import "./noti.css";
import { useRouter } from "next/navigation";
export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const route = useRouter();
  useEffect(() => {
    // Fetch user data and create a map of userId to user name
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/sau");
        if (response.data) {
          const userMap = response.data.reduce((map, user) => {
            map[user.userId] = user.name;
            return map;
          }, {});
          setUsers(userMap);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch notifications for the current user
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await axios.get(`/api/notification/${userId}`);
        if (response.data && response.data.data) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUsers();
    fetchNotifications();
  }, []);

  // Toggle Popup visibility
  const handleBellClick = () => setShowPopup(!showPopup);
  const navigateToSenderProfile = (senderId) => {
    const viewinguserId = senderId;
    route.push(`/viewing/${viewinguserId}`);
  };
  return (
    <div>
      <div
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          padding: "5px",
          cursor: "pointer",
          backgroundColor: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleBellClick}
      >
        <Bell color="#fff" />
        <p style={{ marginLeft: "3px" }}>{notifications.length}</p>
      </div>

      {/* Notification Popup */}
      {showPopup && (
        <div className="notification-popup">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                <p
                  onClick={() => navigateToSenderProfile(notification.senderId)}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {users[notification.senderId] || "Unknown User"}{" "}
                </p>
                <p>{notification.content}</p>
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p>
              No notifications found. Start posting and connecting to grow your
              network!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
