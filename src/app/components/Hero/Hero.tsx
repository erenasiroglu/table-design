import React from "react";
import Link from "next/link";
import "./styles.css";

export const Hero: React.FC = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Create Your Table</h1>
      <p className="hero-description">
        Create a table according to your needs or choose one of the pre-made
        tables.
      </p>
      <div className="hero-buttons">
        <Link href="/pre-made-tables" className="hero-button">
          Pre-Made Tables
        </Link>
        <Link href="/create-own-table" className="hero-button">
          Create Your Own Table
        </Link>
      </div>
    </div>
  );
};
