"use client";
import React from "react";
import Banner from "@/components/molecules/Banner";
import Search from "@/components/molecules/Search";

const MainBanner = () => {
  return (
    <div className="relative">
      <Banner>
        <div className="relative flex justify-center -mt-16 px-4 mx-auto max-w-6xl">
          <Search  />
        </div>
      </Banner>
      
    </div>
  );
};

export default MainBanner;