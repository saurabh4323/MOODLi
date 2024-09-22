"use client";
import React, { useState } from "react";
import { baseRating, gradients } from "@/utils"; // Adjust the import based on your file structure

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

export default function Calendar({ highlightDays }) {
  const [selectedMonth, setSelectMonth] = useState(monthsArr[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = {}; // Replace this with your actual data logic

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
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg bg-white mt-[40px]">
      {/* Navigation and Month Display */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="text-indigo-600 text-2xl hover:text-indigo-400 transition duration-200"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className="text-red-800 text-center text-xl font-semibold">
          {selectedMonth} {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(1)}
          className="text-indigo-600 text-2xl hover:text-indigo-400 transition duration-200"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 gap-2">
        {dayList.map((day) => (
          <div key={day} className="font-bold text-center text-gray-800">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(numRows).keys()].map((rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: 7 }, (_, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              let dayDisplay = dayIndex > daysInMonth || dayIndex < 1;

              let isToday = dayIndex === now.getDate();
              let isHighlighted = dayIndex <= highlightDays;

              let color = dayDisplay ? "transparent" : "white";

              return (
                <div
                  key={dayOfWeekIndex}
                  className={`p-3 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                    isToday ? "border-indigo-600" : "border-gray-200"
                  } ${
                    dayDisplay
                      ? "bg-transparent text-transparent"
                      : `text-black hover:scale-105 hover:shadow-lg ${
                          isHighlighted ? "bg-yellow-400" : ""
                        }`
                  }`}
                  style={{ backgroundColor: isHighlighted ? "yellow" : color }}
                >
                  {!dayDisplay && <p>{dayIndex}</p>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
