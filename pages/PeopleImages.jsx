import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PeopleImages() {
  const [pictureshow, setPictureshow] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/users/track/${userId}`);

        // Log the response to check if the image data is valid
        console.log("Fetched images:", response.data);
        setPictureshow(response.data); // Assuming response.data is an array of objects
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {pictureshow.map((item, index) => (
        <div key={index}>
          {item.photo ? (
            <img
              src={`data:image/png;base64,${item.photo.toString("base64")}`} // Correctly format the base64 string
              alt="Mood representation"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <div>No photo available</div>
          )}

          <h1>{item.emoji}</h1>
        </div>
      ))}
    </div>
  );
}
