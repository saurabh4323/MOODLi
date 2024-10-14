"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import Hot Toast
import "./cp.css";
import Button from "./Button";

const Changepassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post("/api/second/changepassword", {
        userId,
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success(response.data.message); // Notify user of success
      } else {
        toast.error(response.data.error); // Notify user of error
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Wrong password entered");
    }
  };

  return (
    <div
      style={{
        marginTop: "80px",
        height: "56vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      {/* Toast container */}
      <form onSubmit={changePassword} className="form-container">
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button className="button" type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default Changepassword;
