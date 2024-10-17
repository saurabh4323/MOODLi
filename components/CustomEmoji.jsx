"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./CustomEmoji.module.css";

export default function CustomEmoji() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [emojiName, setEmojiName] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [activeShape, setActiveShape] = useState(null);
  const [draggingAccessory, setDraggingAccessory] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff"); // Default white background
  const [savedEmojis, setSavedEmojis] = useState([]); // New state for saved emojis
  const canvasRef = useRef(null);

  // List of accessories
  const accessoryOptions = ["eye", "nose", "ear", "cap", "glasses", "beard"];

  // List of background shapes
  const shapeOptions = ["circle", "square", "star", "triangle", "hexagon"];

  // Handle file upload for custom background or emoji
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      setUploadedImage(event.target.result); // Set uploaded image once loaded

      img.onload = function () {
        drawCanvas(); // Draw canvas after image is loaded
      };
    };
    reader.readAsDataURL(file);
  };

  // Draw the canvas with all accessories, background shapes, and background color
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fill the canvas background with selected color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background shape if selected
    if (activeShape) {
      drawShape(ctx, activeShape, canvas.width, canvas.height);
    }

    // Draw background image if uploaded
    if (uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }

    // Draw each accessory
    accessories.forEach((accessory) => {
      const img = new Image();
      img.src = `/${accessory.type}.png`;
      img.onload = () => {
        ctx.drawImage(img, accessory.x, accessory.y, 50, 50); // Adjust size and position
      };
    });
  };

  const drawShape = (ctx, shape, width, height) => {
    ctx.beginPath();
    ctx.fillStyle = "#f0f0f0"; // Light background color
    switch (shape) {
      case "circle":
        ctx.arc(width / 2, height / 2, 100, 0, 2 * Math.PI);
        break;
      case "square":
        ctx.rect(25, 25, width - 50, height - 50);
        break;
      case "star":
        // Draw star shape
        drawStar(ctx, width / 2, height / 2, 5, 80, 40);
        break;
      case "triangle":
        ctx.moveTo(width / 2, 50);
        ctx.lineTo(50, height - 50);
        ctx.lineTo(width - 50, height - 50);
        ctx.closePath();
        break;
      case "hexagon":
        drawHexagon(ctx, width / 2, height / 2, 100);
        break;
      default:
        break;
    }
    ctx.fill();
  };

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const drawHexagon = (ctx, x, y, size) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(
        x + size * Math.cos((Math.PI / 3) * i),
        y + size * Math.sin((Math.PI / 3) * i)
      );
    }
    ctx.closePath();
  };

  useEffect(() => {
    drawCanvas();
  }, [accessories, uploadedImage, activeShape, bgColor]); // bgColor added to dependencies

  // Handle accessory placement
  const handleAccessoryPlacement = (accessoryType) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setAccessories((prevAccessories) => [
      ...prevAccessories,
      { type: accessoryType, x: rect.width / 2 - 25, y: rect.height / 2 - 25 },
    ]);
  };

  // Handle mouse down event (start dragging)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if we clicked on an accessory
    for (let i = 0; i < accessories.length; i++) {
      const accessory = accessories[i];
      if (
        x >= accessory.x &&
        x <= accessory.x + 50 &&
        y >= accessory.y &&
        y <= accessory.y + 50
      ) {
        setDraggingAccessory(i);
        return;
      }
    }
  };

  // Handle mouse move event (dragging)
  const handleMouseMove = (e) => {
    if (draggingAccessory === null) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setAccessories((prevAccessories) =>
      prevAccessories.map((accessory, index) =>
        index === draggingAccessory
          ? { ...accessory, x: x - 25, y: y - 25 } // Adjust position to center the accessory on the cursor
          : accessory
      )
    );
  };

  // Handle mouse up event (stop dragging)
  const handleMouseUp = () => {
    setDraggingAccessory(null);
  };

  // Handle background shape selection
  const applyBackgroundShape = (shape) => {
    setActiveShape(shape);
  };

  // Handle background color change
  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  // Reset the canvas
  const resetCanvas = () => {
    setAccessories([]);
    setUploadedImage(null);
    setActiveShape(null);
    setBgColor("#ffffff"); // Reset background color to white
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveEmoji = () => {
    const canvas = canvasRef.current;
    const emojiData = canvas.toDataURL("image/png");
    // localStorage.setItem(emojiName, emojiData);
    // loadSavedEmojis(); // Reload saved emojis after saving
    alert("Emoji saved!");
  };

  // Load saved emojis from local storage
  // const loadSavedEmojis = () => {
  //   const emojis = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);

  //     // Only process keys that start with "emoji_"
  //     if (key && key.startsWith("emoji_")) {
  //       const emojiData = localStorage.getItem(key);
  //       emojis.push({ name: key.replace("emoji_", ""), data: emojiData });
  //     }
  //   }
  //   setSavedEmojis(emojis);
  // };

  // Load emojis on component mount
  // useEffect(() => {
  //   loadSavedEmojis();
  // }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ color: "#ffff" }}>Create Your Custom Emoji</h1>

      <input
        type="text"
        style={{ color: "#000" }}
        placeholder="Emoji Name"
        value={emojiName}
        onChange={(e) => setEmojiName(e.target.value)}
        className={styles.inputField}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className={styles.uploadBtn}
      />

      <div className={styles.optionsContainer}>
        <h2 style={{ fontWeight: "500" }}>Accessories</h2>
        <div className={styles.first}>
          {accessoryOptions.map((accessory) => (
            <button
              key={accessory}
              className={styles.buttons}
              onClick={() => handleAccessoryPlacement(accessory)}
            >
              {accessory.charAt(0).toUpperCase() + accessory.slice(1)}
            </button>
          ))}
        </div>

        <h2 style={{ fontWeight: "500" }}>Shapes</h2>
        <div className={styles.first}>
          {shapeOptions.map((shape) => (
            <button
              key={shape}
              className={styles.buttons}
              onClick={() => applyBackgroundShape(shape)}
            >
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </button>
          ))}
        </div>

        <h2 style={{ fontWeight: "500" }}>Background Color</h2>
        <input
          type="color"
          value={bgColor}
          onChange={handleBgColorChange}
          className={styles.colorPicker}
        />
      </div>

      <canvas
        ref={canvasRef}
        width="200"
        height="200"
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>

      <div className={styles.controlButtons}>
        {/* <button onClick={saveEmoji}>Save Emoji</button> */}
        <button onClick={resetCanvas}>Reset Canvas</button>
      </div>

      {/* Saved Emojis Section */}
      <div className={styles.savedEmojis}>
        {/* <h2>Saved Emojis</h2> */}
        <div className={styles.emojiList}>
          {savedEmojis.map((emoji) => (
            <div key={emoji.name} className={styles.emojiItem}>
              <img
                src={emoji.data}
                alt={emoji.name}
                className={styles.emojiImg}
              />
              <p>{emoji.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
