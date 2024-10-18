"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Optimized Image from Next.js
import styles from "./CustomEmoji.module.css";

export default function CustomEmoji() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [emojiName, setEmojiName] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [activeShape, setActiveShape] = useState(null);
  const [draggingAccessory, setDraggingAccessory] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [savedEmojis, setSavedEmojis] = useState([]);
  const canvasRef = useRef(null);

  const accessoryOptions = ["eye", "nose", "ear", "cap", "glasses", "beard"];
  const shapeOptions = ["circle", "square", "triangle", "hexagon"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new window.Image();
      img.src = event.target.result;
      setUploadedImage(event.target.result);

      img.onload = function () {
        drawCanvas();
      };
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (activeShape) {
      drawShape(ctx, activeShape, canvas.width, canvas.height);
    }

    if (uploadedImage) {
      const img = new window.Image();
      img.src = uploadedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }

    accessories.forEach((accessory) => {
      const img = new window.Image();
      img.src = `/${accessory.type}.png`;
      img.onload = () => {
        ctx.drawImage(img, accessory.x, accessory.y, 30, 30);
      };
    });
  };

  const drawShape = (ctx, shape, width, height) => {
    ctx.beginPath();
    ctx.fillStyle = "#f0f0f0";
    switch (shape) {
      case "circle":
        ctx.arc(width / 2, height / 2, 100, 0, 2 * Math.PI);
        break;
      case "square":
        ctx.rect(25, 25, width - 50, height - 50);
        break;
      case "star":
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

  useEffect(() => {
    drawCanvas();
  }, [accessories, uploadedImage, activeShape, bgColor]);

  const handleAccessoryPlacement = (accessoryType) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setAccessories((prevAccessories) => [
      ...prevAccessories,
      { type: accessoryType, x: rect.width / 2 - 15, y: rect.height / 2 - 15 },
    ]);
  };

  const handleMouseDown = (e) => {
    handleStart(e);
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0]); // Use the first touch point
  };

  const handleStart = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.pageX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.pageY - rect.top;

    for (let i = 0; i < accessories.length; i++) {
      const accessory = accessories[i];
      if (
        x >= accessory.x &&
        x <= accessory.x + 30 &&
        y >= accessory.y &&
        y <= accessory.y + 30
      ) {
        setDraggingAccessory(i);
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    handleDrag(e);
  };

  const handleTouchMove = (e) => {
    handleDrag(e.touches[0]); // Use the first touch point
  };

  const handleDrag = (e) => {
    if (draggingAccessory === null) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.pageX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.pageY - rect.top;

    setAccessories((prevAccessories) =>
      prevAccessories.map((accessory, index) =>
        index === draggingAccessory
          ? { ...accessory, x: x - 15, y: y - 15 }
          : accessory
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingAccessory(null);
  };

  const handleTouchEnd = () => {
    setDraggingAccessory(null);
  };

  const applyBackgroundShape = (shape) => {
    setActiveShape(shape);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleEmojiNameChange = (e) => {
    setEmojiName(e.target.value);
  };

  const handleSaveEmoji = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    setSavedEmojis((prevEmojis) => [
      ...prevEmojis,
      { name: emojiName, image: dataURL },
    ]);
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: "yellowgreen" }} className={styles.h1}>
        Create Your Custom Emoji
      </h1>
      <div className={styles.controls}>
        <label htmlFor="uploadImage">Upload Image: </label>
        <input
          type="file"
          id="uploadImage"
          onChange={handleFileUpload}
          className={styles.uploadBtn}
        />

        <div>
          <label style={{ marginRight: "20px" }} htmlFor="emojiName">
            Emoji Name:
          </label>
          <input
            style={{ color: "#000" }}
            type="text"
            id="emojiName"
            className={styles.inputField}
            value={emojiName}
            onChange={handleEmojiNameChange}
          />
          <button
            style={{ marginRight: "-20px" }}
            className={styles.buttons}
            onClick={handleSaveEmoji}
          >
            Save Emoji
          </button>
        </div>
      </div>

      <div className={styles.optionsContainer}>
        <h2>Choose a Shape:</h2>
        <div className={styles.first}>
          {shapeOptions.map((shape, index) => (
            <button
              key={index}
              className={styles.buttons}
              onClick={() => applyBackgroundShape(shape)}
            >
              {shape}
            </button>
          ))}
        </div>

        <h2>Accessories:</h2>
        <div className={styles.accessoryButtons}>
          {accessoryOptions.map((accessory, index) => (
            <button
              key={index}
              className={styles.buttons}
              onClick={() => handleAccessoryPlacement(accessory)}
            >
              {accessory}
            </button>
          ))}
        </div>
      </div>

      <label htmlFor="backgroundColor">Choose Background Color: </label>
      <input
        type="color"
        id="backgroundColor"
        value={bgColor}
        className={styles.colorPicker}
        onChange={handleBgColorChange}
      />
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>

      <div className={styles.savedEmojis}>
        <h2>Saved Emojis:</h2>
        <div className={styles.emojiList}>
          {savedEmojis.map((emoji, index) => (
            <div key={index} className={styles.emojiItem}>
              <Image
                src={emoji.image}
                alt={emoji.name}
                width={50}
                height={50}
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
