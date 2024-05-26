import React from "react";
import Link from "next/link";
import "./styles.css";

export const Hero: React.FC = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Tablonuzu Oluşturun</h1>
      <p className="hero-description">
        İhtiyacınıza uygun bir tablo oluşturun veya hazır tablolardan birini
        seçin.
      </p>
      <div className="hero-buttons">
        <Link href="/hazir-tablolar" className="hero-button">
          Hazır Tablolar
        </Link>
        <Link href="/kendi-tablonuzu-olusturun" className="hero-button">
          Kendi Tablonuzu Oluşturun
        </Link>
      </div>
    </div>
  );
};
