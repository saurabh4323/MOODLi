"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./calander.css"; // Import the new CSS file

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const monthsArr = Object.keys(months);
const now = new Date();
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [selectedMonth, setSelectMonth] = useState(monthsArr[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [emojiMap, setEmojiMap] = useState({});

  // Fetch user track data
  useEffect(() => {
    const fetchTrack = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`/api/users/track/${userId}`);
          const trackData = response.data;
          const newEmojiMap = {};

          // Loop through the track data to map emojis to dates
          trackData.forEach((entry) => {
            const date = new Date(entry.selectedAt);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            // Add the emoji for that specific date
            newEmojiMap[formattedDate] = entry.emoji;
          });

          setEmojiMap(newEmojiMap); // Set the emojiMap state with the new data
        } catch (error) {
          console.error("Error fetching track data:", error);
        }
      }
    };

    fetchTrack(); // Fetch emoji data when the component mounts
  }, []);

  const numericMonth = monthsArr.indexOf(selectedMonth);

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectMonth(monthsArr[11]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectMonth(monthsArr[0]);
    } else {
      setSelectMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(selectedYear, numericMonth, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="calendar-container">
      {/* Navigation and Month Display */}
      <div className="calendar-header">
        <button onClick={() => handleIncrementMonth(-1)} className="nav-btn">
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className="calendar-title">
          {selectedMonth} {selectedYear}
        </p>
        <button onClick={() => handleIncrementMonth(1)} className="nav-btn">
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      {/* Days of the Week */}
      <div className="calendar-days">
        {dayList.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Days of the Month */}
      <div className="calendar-grid">
        {[...Array(numRows).keys()].map((rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: 7 }, (_, dayOfWeekIndex) => {
              const dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              const dayDisplay = dayIndex > daysInMonth || dayIndex < 1;
              const isToday =
                dayIndex === now.getDate() &&
                numericMonth === now.getMonth() &&
                selectedYear === now.getFullYear();

              // Create the date string in 'YYYY-MM-DD' format for the emoji map
              const dateKey = `${selectedYear}-${String(
                numericMonth + 1
              ).padStart(2, "0")}-${String(dayIndex).padStart(2, "0")}`;

              return (
                <div
                  key={dayOfWeekIndex}
                  className={`calendar-day ${isToday ? "today" : ""} ${
                    dayDisplay ? "invisible-day" : ""
                  }`}
                >
                  {/* Show date and emoji on desktop, only emoji on mobile */}
                  {!dayDisplay && (
                    <>
                      <p className="desktop-only">{dayIndex}</p>
                      {emojiMap[dateKey] && (
                        <span className="emojikkk">{emojiMap[dateKey]}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
