"use client";
import React, { useState, useEffect } from "react";

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

export default function Calendar({ emojiMap }) {
  const [selectedMonth, setSelectMonth] = useState(monthsArr[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

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
    <div
      style={{
        border: "1px solid #1837c1",
      }}
      className="flex flex-col gap-4 p-4 rounded-lg shadow-lg bg-#2b1c4f mt-[40px] border"
    >
      {/* Navigation and Month Display */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="text-white-600 text-2xl hover:text-white-400 transition duration-200"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className="text-red-600 text-center text-xl font-semibold">
          {selectedMonth} {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(1)}
          className="text-white-600 text-2xl hover:text-white-400 transition duration-200"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2">
        {dayList.map((day) => (
          <div key={day} className="font-bold text-center text-white-800">
            {day}
          </div>
        ))}
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 gap-2">
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
                  className={`p-3 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                    isToday ? "bg-yellow-400" : "bg-white"
                  } ${
                    dayDisplay
                      ? "bg-transparent text-transparent"
                      : "border-gray-200 text-black hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  {!dayDisplay && (
                    <>
                      <p>{dayIndex}</p>
                      {/* Display emoji if it exists for the day */}
                      {emojiMap[dateKey] && (
                        <span className="ml-2">{emojiMap[dateKey]}</span>
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
