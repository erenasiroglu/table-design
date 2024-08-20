"use client";

import React from "react";
import Header from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Products } from "./components/Products/Products";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
          <Hero />
        </div>
        <Products />
      </main>
    </div>
  );
}
