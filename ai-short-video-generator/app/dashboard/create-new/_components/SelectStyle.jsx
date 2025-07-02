"use client";

import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpg",
      alt: "Realistic",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
      alt: "Cartoon",
    },
    {
      name: "Comic",
      image: "/comic2.jpg",
      alt: "Comic",
    },
    {
      name: "WaterColor",
      image: "/water.jpg",
      alt: "WaterColor",
    },
    {
      name: "GTA",
      image: "/gta.png",
      alt: "GTA",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            className={`relative hover:scale-105 transition-all 
          cursor-pointer rounded-xl ${
            selectedOption == item.name && "border-2 border-primary"
          }`}
            key={index}
          >
            <div className="relative w-full h-65 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                onClick={() => {
                  setSelectedOption(item.name);
                  onUserSelect("imageStyle", item.name);
                }}
              />
            </div>
            <h2
              className="absolute p-1 bg-black bottom-0 w-full
             text-white text-center rounded-b-lg"
            >
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
