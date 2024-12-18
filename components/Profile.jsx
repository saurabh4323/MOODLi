"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./profile.css";
import { Handshake, SunMoon, ImageUp } from "lucide-react";
import { Share2, Headset, Lock, LogOut } from "lucide-react";
import { enableDarkMode, enableLightMode } from "../app/theme"; // Import theme functions
import Changepassword from "./Changepassword";
import Button from "./Button";
import ContactUs from "./ContactUs";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [gender, setGender] = useState("Other");
  const [showchangepass, setshowchangepass] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);
  const [showcontact, setshowcontact] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    favoriteEmoji: "",
    bio: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [showThemeModal, setShowThemeModal] = useState(false); // Modal state
  const [theme, setTheme] = useState("dark");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Logout confirmation modal state
  useEffect(() => {
    // Check if user email is authenticated on component load
    const checkAuthentication = async () => {
      const userId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("email");

      if (!userId || !storedEmail) {
        alert("Please log in to access your profile.");
        rouuter.push("/login");
        return;
      }

      try {
        // console.log("1", storedEmail);
        const response = await axios.post("/api/users/sau", { userId });
        if (response.data.email !== storedEmail) {
          alert("Don't try this again");

          rouuter.push("/login");
        } else {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error verifying user email:", error);
        alert("Authentication error. Redirecting to login.");
        rouuter.push("/login");
      } finally {
        setLoading(false);
      }
    };

    // checkAuthentication();
  }, []);

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      "Hey! Check out this awesome mood-tracking website: Moodli! 😄\n" +
        "Track your mood, join the community, and chat with me! 💬\n" +
        "Use my referral code: moodli@130 to get started.\n" +
        " https://moodli.site"
    );
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        fetchProfile(userId);
      }
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const res = await axios.post("/api/users/sau", { userId });
      setProfile(res.data);
      setGender(res.data.gender || "Other");
    } catch (error) {
      console.error("Error fetching profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        if (!profile.name || !profile.favoriteEmoji) {
          toast.error("Name and Favorite Emoji are required.");
          return;
        }

        try {
          await axios.post("/api/users/sau", {
            userId,
            email: profile.email,
            name: profile.name,
            favoriteEmoji: profile.favoriteEmoji,
            bio: profile.bio,
            phoneNumber: profile.phoneNumber,
            gender: gender,
          });

          fetchProfile(userId);
          toast.success("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile.");
        }
      }
    }
  };
  const handleOtpVerification = async () => {
    const fullPhoneNumber = `+91${profile.phoneNumber}`; // Ensure you use the correct variable for the phone number
    try {
      const response = await axios.post("/api/users/verifyOtp", {
        phoneNumber: fullPhoneNumber, // Use the formatted phone number
        otp: otp, // Make sure this is the OTP entered by the user
      });

      if (response.data.success) {
        toast.success("Phone number verified successfully!");
        setShowOtpModal(false); // Close OTP modal
        const verified = localStorage.setItem("verified", "done");
      } else {
        toast.error("Incorrect OTP. Please try again."); // Notify user if OTP is incorrect
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP.");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      setShowLogoutConfirmation(false); // Close the confirmation modal
      window.location.href = "/login"; // Redirect to login page
    }
  };

  const handleClick = () => {
    window.location.href = "/changepassword";
  };

  const toggleThemeModal = () => {
    setShowThemeModal(!showThemeModal); // Toggle theme modal visibility
  };

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "light") {
      enableLightMode();
    } else {
      enableDarkMode();
    }
    setTheme(selectedTheme);
    toggleThemeModal(); // Close modal after applying theme
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true); // Show confirmation modal
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide confirmation modal
  };
  const rouuter = useRouter();

  const fetchFriends = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `/api/feeltalk/friend?userId=${userId}`
        );
        // console.log("Friend profiles received:", response.data);
        const friends = Array.isArray(response.data?.friends)
          ? response.data.friends
          : [];
        setFriendList(friends); // Now friends contain profile info
        setShowFriendList(true); // Show friend list modal
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriendList([]); // Fallback to empty array on error
      }
    }
  };
  const handlePhoneNumberChange = async (e) => {
    const number = e.target.value;
    setProfile({ ...profile, phoneNumber: number });

    if (number.length === 10) {
      // Check for 10 digits
      const fullPhoneNumber = `+91${number}`; // Combine with country code
      // setShowOtpModal(true);
      // try {
      //   const response = await axios.post("", {
      //     phoneNumber: fullPhoneNumber, // Send the full phone number
      //   });
      //   if (response.data.success) {
      //     toast.success("OTP sent successfully!");
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   console.error("Error sending OTP:", error);
      //   toast.error("Error sending OTP.");
      // }
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profilePicture">
          <span className="emojik">
            {loading ? "😊" : profile.favoriteEmoji || "😊"}
          </span>
        </div>
        <p className="pname">{loading ? "Loading..." : profile.name}</p>

        <button className="buttonk" onClick={fetchFriends}>
          <Handshake /> Friends
        </button>
        <button className="buttonk" onClick={shareOnWhatsApp}>
          <Share2 color="#ffffff" /> Invite Friends
        </button>
        <button className="buttonk" onClick={toggleThemeModal}>
          <SunMoon color="#ffffff" /> Theme
        </button>
        <button className="buttonk" onClick={() => rouuter.push("/contact")}>
          <Headset color="#ffffff" /> Contact us
        </button>
        <button className="buttonk" onClick={() => setshowchangepass(true)}>
          <Lock color="#ffffff" /> Change Password
        </button>

        <button className="buttonk" onClick={handleLogoutClick}>
          <LogOut color="#ffffff" /> Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="teh">Are you sure you want to log out?</p>
            <button
              style={{ backgroundColor: "red", color: "#fff" }}
              className="modal-button"
              onClick={handleLogout}
            >
              Yes
            </button>
            <button
              style={{ backgroundColor: "#b0fc38", color: "#000" }}
              className="modal-buttondark"
              onClick={handleCancelLogout}
            >
              No
            </button>
          </div>
        </div>
      )}

      <div className="main-content">
        <form className="profileInfo" onSubmit={handleUpdateProfile}>
          <div className="infoItem">
            <label>Name:</label>
            <input
              placeholder="Write Your Name"
              type="text"
              className="profileInput"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="infoItem">
            <label>Favorite Emoji:</label>
            <input
              placeholder="use WIN+. for emoji"
              type="text"
              className="profileInput"
              value={profile.favoriteEmoji}
              onChange={(e) =>
                setProfile({ ...profile, favoriteEmoji: e.target.value })
              }
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="infoItem">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="genderSelect"
              disabled={loading}
            >
              <option style={{ color: "#000" }} value="Male">
                Male
              </option>
              <option style={{ color: "#000" }} value="Female">
                Female
              </option>
              <option style={{ color: "#000" }} value="Other">
                Other
              </option>
            </select>
          </div>
          <div className="infoItem">
            <label>Phone Number:</label>
            <input
              placeholder="Enter Your Number"
              type="text"
              className="profileInput"
              value={profile.phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="infoItem">
            <label>Bio:</label>
            <textarea
              placeholder="Describe yourself"
              className="profileTextarea"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={loading} // Disable textarea while loading
            />
          </div>
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
      </div>
      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal-content">
            <h2 className="otp-title">Verify Phone</h2>
            <p className="otp-instructions">
              Enter the 4-digit OTP sent to {profile.phoneNumber}
            </p>
            <input
              type="text"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="4"
              placeholder="Enter OTP"
            />
            <button
              className="otp-verify-button"
              onClick={handleOtpVerification}
            >
              Verify
            </button>
            <button
              className="otp-cancel-button"
              onClick={() => setShowOtpModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Friends List Modal */}
      {showFriendList && (
        <div className="modal-overlays">
          <div className="modal-contents">
            <h2 className="modal-titles" style={{ color: "#000" }}>
              Friend List
            </h2>
            {friendList.length > 0 ? (
              <ul className="friend-lists">
                {friendList.map((friend, index) => (
                  <li key={index} className="friend-items">
                    <span className="friend-names">
                      {friend.name || "Anonymous"}
                    </span>
                    <span className="friend-emojis">
                      {friend.favoriteEmoji || "N/A"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends found.</p>
            )}
            <button
              className="modal-close-button"
              onClick={() => setShowFriendList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showchangepass && (
        <div className="modal-overlayss">
          <div className="can">
            {/* Updated close button with working onClick */}
            <button
              className="modal-close-button"
              onClick={() => setshowchangepass(false)}
            >
              Close
            </button>
          </div>
          <Changepassword />
        </div>
      )}

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="teh">Select Theme</h2>
            <button
              className="modal-button"
              onClick={() => applyTheme("light")}
            >
              Light Mode
            </button>
            <button
              className="modal-buttondark"
              onClick={() => applyTheme("dark")}
            >
              Dark Mode
            </button>
            <button
              className="modal-close-button"
              onClick={toggleThemeModal} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
