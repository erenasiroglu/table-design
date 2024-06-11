import React, { useState } from "react";
import "../src/app/styles/kendi-tablonuzu-olusturun.css";
import Header from "../src/app/components/Header/Header";
import defaultImage from "../src/app/images/login.jpg";

const KendiTablonuzuOlusturun: React.FC = () => {
  const [frameColor, setFrameColor] = useState("black");
  const [image, setImage] = useState<string>(defaultImage.src);
  const [size, setSize] = useState({ width: 50, height: 70 });

  const handleColorChange = (color: string) => {
    setFrameColor(color);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
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
      <h1 className="title">Kendi Tablonuzu Oluşturun</h1>
      <div className="content-container">
        <div className="table-preview-container">
          <div
            className="table-preview"
            style={{
              borderColor: frameColor,
              height: `${size.height * 5}px`,
            }}
          >
            {image && (
              <img src={image} alt="Selected" className="table-image" />
            )}
          </div>
        </div>
        <div className="table-line"></div>
        <div className="table-creation-container">
          <div className="table-options">
            <div className="table-image-picker">
              <label>Resim Yükleyin:</label>
              <div className="file-input-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file-input"
                />
                <label htmlFor="file-input" className="custom-file-input">
                  Dosya Seçin
                </label>
              </div>
            </div>

            <div className="table-color-picker">
              <label>Çerçeve Rengini Seçin:</label>
              <div className="color-options">
                <button
                  onClick={() => handleColorChange("black")}
                  className="color-button black"
                ></button>
                <button
                  onClick={() => handleColorChange("white")}
                  className="color-button white"
                ></button>
                <button
                  onClick={() => handleColorChange("rgb(95,80,67)")}
                  className="color-button brown"
                ></button>
              </div>
            </div>

            <div className="table-size-picker">
              <label>Tablo Boyutunu Seçin:</label>
              <select onChange={handleSizeChange}>
                <option value="30x40">30x40 cm</option>
                <option value="50x70">50x70 cm</option>
                <option value="70x100">70x100 cm</option>
                <option value="100x140">100x140 cm</option>
              </select>
            </div>
            <div className="order-button-container">
              <button className="order-button">Sipariş Ver</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KendiTablonuzuOlusturun;
