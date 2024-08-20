import React, { useState } from "react";
import Header from "../src/app/components/Header/Header";
import Image from "next/image";
import defaultImage from "../src/app/public/images/login.jpg";
import styles from "../src/app/styles/CreateOwnTable.module.scss";

const CreateOwnTable: React.FC = () => {
  const [frameColor, setFrameColor] = useState("black");
  const [image, setImage] = useState<string>(defaultImage.src);
  const [size, setSize] = useState({ width: 50, height: 70 });
  const [isImageLoading, setImageLoading] = useState(false);

  const handleColorChange = (color: string) => {
    setFrameColor(color);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setImageLoading(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [width, height] = e.target.value.split("x").map(Number);
    setSize({ width, height });
  };

  return (
    <>
      <Header />
      <div className={styles["content-container"]}>
        <div className={styles["table-preview-container"]}>
          <div
            className={styles["table-preview"]}
            style={{
              borderColor: frameColor,
              height: `${size.height * 5}px`,
              width: `${size.width * 5}px`,
            }}
          >
            {isImageLoading && (
              <div className={styles["loader"]}>Loading...</div>
            )}
            {image && (
              <Image
                src={image}
                alt="Selected"
                className={styles["table-image"]}
                width={size.width}
                height={size.height}
                layout="responsive"
              />
            )}
          </div>
        </div>
        <div className={styles["table-line"]}></div>
        <div className={styles["table-creation-container"]}>
          <div className={styles["table-options"]}>
            <div className={styles["table-image-picker"]}>
              <label htmlFor="file-input">Upload Image:</label>
              <div className={styles["file-input-container"]}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file-input"
                  aria-label="Upload Image"
                />
                <label
                  htmlFor="file-input"
                  className={styles["custom-file-input"]}
                >
                  Select File
                </label>
              </div>
            </div>
            <div className={styles["table-color-picker"]}>
              <label>Select Frame Color:</label>
              <div className={styles["color-options"]}>
                {["black", "white", "rgb(95,80,67)"].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`${styles["color-button"]} ${styles[color]}`}
                    aria-label={`Select ${color}`}
                  ></button>
                ))}
              </div>
            </div>
            <div className={styles["table-size-picker"]}>
              <label>Select Table Size:</label>
              <select
                onChange={handleSizeChange}
                aria-label="Select Table Size"
              >
                <option value="30x40">30x40 cm</option>
                <option value="50x70">50x70 cm</option>
                <option value="70x100">70x100 cm</option>
                <option value="100x140">100x140 cm</option>
              </select>
            </div>
            <div className={styles["order-button-container"]}>
              <button className={styles["order-button"]}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOwnTable;
