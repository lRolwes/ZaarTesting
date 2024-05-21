import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { HomeHeader } from "../components/HomeHeader";
import { useTrendingCollections } from "@reservoir0x/reservoir-kit-ui";
import useTopCollections from "../hooks/TopCollections";
const HeroContent = () => {
  const { collectionName, collectionImage, collectionVolume, collectionFloorPrice } = useTopCollections();
  const [currentImage, setCurrentImage] = useState(collectionImage[0]);
  const [currentName, setCurrentName] = useState(collectionName[0]);
  const [currentFloorValue, setCurrentFloorValue] = useState(
    collectionFloorPrice[0]
  );
  const [currentVolume, setCurrentVolume] = useState(collectionVolume[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = collectionImage.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % 5;
      setCurrentImage(collectionImage[nextIndex]);
      setCurrentName(collectionName[nextIndex]);
      setCurrentFloorValue(collectionFloorPrice[nextIndex]);
      setCurrentVolume(collectionVolume[nextIndex]);
    }, 6000); // Change image every 3 seconds
    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [
    currentImage,
    collectionImage,
    currentName,
    collectionName,
    currentFloorValue,
    collectionFloorPrice,
    currentVolume,
    collectionVolume,
  ]);

  return (
    <div id="landing">
      {/* Hero Section */}
      <div
        className="pt-32 pb-32 flex content-center items-center justify-center bg-hero min-h-screen"
        style={{ minHeight: "75h" }}
      >
        <div
        className="absolute left-0 right-0 w-full h-full bg-center bg-cover z-10"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          height: "100vh", // Set a fixed height
          width: "100vw", // Set a fixed width
        }}
      ></div>
      {/* Gradient Overlay */}

      {/* Hero Content */}
      <div className="container fixed relative z-20 mt-0 w-full">
        <div className="text-center text-white flex flex-col justify-center items-center">
          <span className="inline-block text-yellow bg-yellow bg-opacity-20 tracking-widest mb-3 px-6 py-1 rounded-full text-lg z-20">
            <i className="fad fa-stars "></i> LAUNCHING SOON™
          </span>
          <div className="flex relative w-[400px] md:w-[45%] justify-center items-center h-auto z-20 ">
            <Image
              src="/images/logo-white.png"
              alt="logo"
              className="fixed rounded-sm z-20 item-center relative"
              layout="responsive"
              width={600}
              height={600}
            />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white uppercase mt-5 z-20">
            A full-featured mobile-friendly NFT marketplace
          </h1>
          <div className="flex justify-center space-x-8 mb-"></div>
          <Link
            href="/migration"
            className="inline-block bg-yellow hover:bg-whitish border-2 border-yellow hover:text-black text-black py-2 px-4 uppercase rounded-sm font-bold mb-20 hover:text-black"
          >
            Migrate Now
          </Link>
        </div>
      </div>
        
 



        {/* Boxes within Hero Image */}
        <div className="absolute bottom-0 w-full z-20 pb-6 pr-2">
          <div className="flex justify-center px-4">
            <div className="flex overflow-x-scroll pb-0 hide-scroll-bar no-scrollbar snap-x snap-mandatory">
              <div className="flex flex-nowrap lg:mx-0">
                {/* Each Box */}
                {/* Apply the hover effect to this div to ensure the entire box moves */}
                <div className="inline-block px-3 snap-start hover:-translate-y-2 transform transition duration-300 hero-box">
                  <div className="w-64 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                    {/* Clickable area */}
                    <a href="#" className="block w-full h-full">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: collectionImage[0] }}
                      >
                        {/* Gradient Overlay for better text visibility */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)",
                          }}
                        ></div>
                        {/* Title at the bottom left */}
                        <div className="absolute bottom-0 left-0 p-4 z-10">
                          <h2 className="text-white text-lg font-bold">
                            {collectionName[0]}
                          </h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Repeat boxes as needed */}
                <div className="inline-block px-3 snap-start hover:-translate-y-2 transform transition duration-300 hero-box">
                  <div className="w-64 h-48 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                    {/* Clickable area */}
                    <a href="#" className="block w-full h-full">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: collectionImage[1] || "",
                        }}
                      >
                        {/* Gradient Overlay for better text visibility */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)",
                          }}
                        ></div>
                        {/* Title at the bottom left */}
                        <div className="absolute bottom-0 left-0 p-4 z-10">
                          <h2 className="text-white text-lg font-bold">
                            {collectionName[1]}
                          </h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Repeat boxes as needed */}
                <div className="inline-block px-3 snap-start hover:-translate-y-2 transform transition duration-300 hero-box ">
                  <div className="w-64 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out relative no-scrollbar">
                    {/* Clickable area */}
                    <a href="#" className="block w-full h-full ">
                      <div
                        className="w-full h-full bg-cover bg-center "
                        style={{
                          backgroundImage: collectionImage[2],
                        }}
                      >
                        {/* Gradient Overlay for better text visibility */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)",
                          }}
                        ></div>
                        {/* Title at the bottom left */}
                        <div className="absolute bottom-0 left-0 p-4 z-10">
                          <h2 className="text-white text-lg font-bold">
                            {collectionName[2]}
                          </h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Repeat boxes as needed */}
                <div className="inline-block px-3 snap-start hover:-translate-y-2 transform transition duration-300 hero-box">
                  <div className="w-64 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                    {/* Clickable area */}
                    <a href="#" className="block w-full h-full">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: collectionImage[3],
                        }}
                      >
                        {/* Gradient Overlay for better text visibility */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)",
                          }}
                        ></div>
                        {/* Title at the bottom left */}
                        <div className="absolute bottom-0 left-0 p-4 z-10">
                          <h2 className="text-white text-lg font-bold">
                            {collectionName[3]}
                          </h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Repeat boxes as needed */}
                <div className="inline-block px-3 snap-start hover:-translate-y-2 transform transition duration-300 hero-box">
                  <div className="w-64 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                    {/* Clickable area */}
                    <a href="#" className="block w-full h-full">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: collectionImage[4],
                        }}
                      >
                        {/* Gradient Overlay for better text visibility */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)",
                          }}
                        ></div>
                        {/* Title at the bottom left */}
                        <div className="absolute bottom-0 left-0 p-4 z-10">
                          <h2 className="text-white text-lg font-bold">
                            {collectionName[4]}
                          </h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableSection = () => {
  const { data: collections } = useTrendingCollections({
    period: "24h",
    limit: 10,
  });
  const [collectionImage, setImage] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionName, setName] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionVolume, setVolume] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionFloorPrice, setFloorPrice] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionTopBid, setTopBid] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collection24HourPercentChange, set24HourPercentChange] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collection24HourRawChange, set24HourRawChange] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionOwners, setOwners] = useState([" "," "," "," "," "," "," "," "," ",]);
  const [collectionPercentListed, setPercentListed] = useState([" "," "," "," "," "," "," "," "," ",]);

  useEffect(() => {
    if (collections != null) {
      let images = [];
      let names = [];
      let volumes = [];
      let floorPrices = [];
      let topBids = [];
      let percentChanges = [];
      let rawChanges = [];
      let owners = [];
      let percentListed = [];

      for (let x = 0; x < 10; x++) {
        images.push("url('" + collections?.[x].image + "')" || " ");
        names.push(collections?.[x].name?.toString() || " ");
        volumes.push(collections?.[x].volume?.toString() || " ");
        floorPrices.push(collections?.[x].floorAsk?.price?.amount?.usd?.toString() || " ");
        topBids.push(collections?.[x].topBid?.price?.toString() || "0");
        percentChanges.push(collections?.[x].floorAskPercentChange?.toString()+"%" || "0");
        owners.push(collections?.[x].ownerCount?.toString() || "0");
      }
      setImage(images);
      setName(names);
      setVolume(volumes);
      setFloorPrice(floorPrices);
      setTopBid(topBids);
      set24HourPercentChange(percentChanges);
      setOwners(owners);
      console.log(collections);
    }
  }, [collections]);
  return (
    <div>
      <div className="container-fluid mx-auto px-4  py-6">
        {/* Tabs with underline */}

        <header className="pt-5 md:pt-4 pb-3 border-b border-dark-gray">
          <h1 className="font-medium text-white font-medium text-xl uppercase ml-2">
            Trending Collections
          </h1>
          <p className="text-sm text-white leading-6 ml-2">
            Aggregated from over{" "}
            <a
              className="border-dashed !cursor-pointer"
              target="_blank"
              href="#"
            >
              169 marketplaces
            </a>
            .
          </p>
        </header>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <div className="table-wrapper">
            <table className="sticky-first-column w-full text-sm text-left text-white">
              <thead className="text-xs uppercase text-gray">
                <tr className="border-b border-dark-gray cursor-pointer">
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Collection
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Capsule APY
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Floor Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Top Offer
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    24H Change (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    24H Change (listed)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    24H Volume
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Owners
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    % Listed
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 1st row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full">
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">1</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[0],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    {collectionName[0]}
                    <div className="inline-flex items-center ml-1 opacity-80">
                      <span className="relative inline-flex items-center justify-center">
                        {" "}
                        {/* Adjust the angle here */}
                        <span className="h-3 w-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                          <span className="text-xs font-semibold text-black z-10">
                            z
                          </span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 rounded-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #ef4444 30%, #facc15 70%)",
                            }}
                          ></span>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-green-500">
                    14.00%
                  </td>
                  <td className="px-6 py-4 text-right">
                    {collectionFloorPrice[0]}
                  </td>
                  <td className="px-6 py-4 text-right">{collectionTopBid[0]}</td>
                  <td className="px-6 py-4 text-right text-green-500">{collection24HourPercentChange[0]}</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+0</span> (0.00%)
                  </td>
                  <td className="px-6 py-4 text-right">{collectionVolume[0]}</td>
                  <td className="px-6 py-4 text-right">
                    {collectionOwners[0]} <span className="text-white">(0%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    0/0.0k <span className="text-white">(0.0%)</span>
                  </td>
                </tr>
                {/* 2nd row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">2</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[1],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',}}
                    />
                    {collectionName[1]}
                    <div className="inline-flex items-center ml-1 opacity-80">
                      <span className="relative inline-flex items-center justify-center">
                        {" "}
                        {/* Adjust the angle here */}
                        <span className="h-3 w-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                          <span className="text-xs font-semibold text-black z-10">
                            z
                          </span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 rounded-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #ef4444 30%, #facc15 70%)",
                            }}
                          ></span>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-green-500">
                    12.00%
                  </td>
                  <td className="px-6 py-4 text-right">6.12</td>
                  <td className="px-6 py-4 text-right">6.09</td>
                  <td className="px-6 py-4 text-right text-red-500">-4.38%</td>
                  <td className="px-6 py-4 text-right text-red-500">
                    <span className="text-white">-69</span> (4.22%)
                  </td>
                  <td className="px-6 py-4 text-right">3133.12</td>
                  <td className="px-6 py-4 text-right">
                    4,248 <span className="text-white">(42.2%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    645/10k <span className="text-white">(6.4%)</span>
                  </td>
                </tr>
                {/* 3rd row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">3</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div className="flex items-center">
                      <div
                        className="h-10 w-10 rounded-sm mr-4"
                        style={{ 
                          backgroundImage: collectionImage[2],
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat', }}
                      />
                      {collectionName[2]}
                      <div className="inline-flex items-center ml-1 opacity-80">
                        <span className="relative inline-flex items-center justify-center">
                          {" "}
                          {/* Adjust the angle here */}
                          <span className="h-3 w-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                            <span className="text-xs font-semibold text-black z-10">
                              z
                            </span>
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 rounded-full"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right, #ef4444 30%, #facc15 70%)",
                              }}
                            ></span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right text-green-500">
                    12.00%
                  </td>
                  <td className="px-6 py-4 text-right">18.70</td>
                  <td className="px-6 py-4 text-right">18.66</td>
                  <td className="px-6 py-4 text-right text-red-500">-3.70%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">3036.92</td>
                  <td className="px-6 py-4 text-right">
                    4,491 <span className="text-white">(51.1%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    483/9k <span className="text-white">(5.36%)</span>
                  </td>
                </tr>
                {/* 4th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">4</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[3],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[3]}
                  </td>
                  <td className="px-6 py-4 text-right text-green-500"></td>
                  <td className="px-6 py-4 text-right">0.85</td>
                  <td className="px-6 py-4 text-right">0.82</td>
                  <td className="px-6 py-4 text-right text-red-500">20.70%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">3036.92</td>
                  <td className="px-6 py-4 text-right">
                    4,491 <span className="text-white">(51.1%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    647/9.2k <span className="text-white">(7%)</span>
                  </td>
                </tr>
                {/* 5th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">5</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[4],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[4]}
                    <div className="inline-flex items-center ml-1 opacity-80">
                      <span className="relative inline-flex items-center justify-center">
                        {" "}
                        {/* Adjust the angle here */}
                        <span className="h-3 w-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                          <span className="text-xs font-semibold text-black z-10">
                            z
                          </span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 rounded-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #ef4444 30%, #facc15 70%)",
                            }}
                          ></span>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-green-500">
                    10.50%
                  </td>
                  <td className="px-6 py-4 text-right">2.64</td>
                  <td className="px-6 py-4 text-right">2.59</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    12.35%
                  </td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">194.84</td>
                  <td className="px-6 py-4 text-right">
                    5,487 <span className="text-white">(55%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    497/10k<span className="text-white">(4.97%)</span>
                  </td>
                </tr>
                {/* 6th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">6</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[5],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[5]}
                    <div className="inline-flex items-center ml-1 opacity-80">
                      <span className="relative inline-flex items-center justify-center">
                        {" "}
                        {/* Adjust the angle here */}
                        <span className="h-3 w-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                          <span className="text-xs font-semibold text-black z-10">
                            z
                          </span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 rounded-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #ef4444 30%, #facc15 70%)",
                            }}
                          ></span>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-green-500">
                    14.00%
                  </td>
                  <td className="px-6 py-4 text-right">26.75</td>
                  <td className="px-6 py-4 text-right">26.31</td>
                  <td className="px-6 py-4 text-right text-red-500">-0.56%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">2000.99</td>
                  <td className="px-6 py-4 text-right">
                    5,581 <span className="text-white">(56%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    346/10k<span className="text-white">(3.46%)</span>
                  </td>
                </tr>
                {/* 7th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">7</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[6],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[6]}
                  </td>
                  <td className="px-6 py-4 text-right text-green-500"></td>
                  <td className="px-6 py-4 text-right">3.36</td>
                  <td className="px-6 py-4 text-right">3.35</td>
                  <td className="px-6 py-4 text-right text-red-500">-2.69%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">1188.79</td>
                  <td className="px-6 py-4 text-right">
                    2,653 <span className="text-white">(30%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    430/9k<span className="text-white">(4.8%)</span>
                  </td>
                </tr>
                {/* 8th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">8</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[7],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[7]}
                  </td>
                  <td className="px-6 py-4 text-right text-green-500"></td>
                  <td className="px-6 py-4 text-right">1.81</td>
                  <td className="px-6 py-4 text-right">1.80</td>
                  <td className="px-6 py-4 text-right text-green-500">1.39%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">218.39</td>
                  <td className="px-6 py-4 text-right">
                    7,559 <span className="text-white">(30%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    989/22k<span className="text-white">(4.59%)</span>
                  </td>
                </tr>
                {/* 9th row */}
                <tr className="dark-gray-hover cursor-pointer">
                  <td className="px-0 py-2 text-right text-green-500">
                    <div className="flex items-center pl-2 max-w-50px">
                      <div className="flex items-center text-xs font-medium text-white">
                        <div className="w-5 h-12">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full h-full"
                          >
                            <div className="flex items-center">
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <span className=" mt-[2px] px-2 pl-0.5 !pr-0">9</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 flex items-center">
                    <div
                      className="h-10 w-10 rounded-sm mr-4"
                      style={{ 
                        backgroundImage: collectionImage[8],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', }}
                    />
                    {collectionName[8]}
                  </td>
                  <td className="px-6 py-4 text-right text-green-500"></td>
                  <td className="px-6 py-4 text-right">0.65</td>
                  <td className="px-6 py-4 text-right">0.63</td>
                  <td className="px-6 py-4 text-right text-green-500">3.86%</td>
                  <td className="px-6 py-4 text-right text-green-500">
                    <span className="text-white">+121</span> (5.32%)
                  </td>
                  <td className="px-6 py-4 text-right">23.65</td>
                  <td className="px-6 py-4 text-right">
                    5,633 <span className="text-white">(56%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    413/10k<span className="text-white">(4.12%)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
const BottomSection = () => {
  return (
    <div>
      <section className="bg-black text-yellow-400 p-8 mt-20 mb-20">
            <div className="text-center">
              <section>              
                <div className="hero-container">
                  <h1 className="hero glitch layers text-3xl sm:text-4xl text-yellow font-bold mb-6 tracking-wide uppercase text-shadow-title"><span>the only NFT marketplace you’ll ever need</span></h1>
                </div>
              </section>
              {/* Subtitle */}
              <p className="text-lg sm:text-2xl mb-10 sm:mb-12 mt-10 sm:mt-12 text-white leading-10">
                Ditch legacy trading. Trade faster than ever before on Zaar.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-12">
                {/* Stat Block 1 */}
                <div className="text-center">
                    <p className="text-3xl font-bold mb-5 uppercase text-white">#1 in global<br/> liquidity</p>
                    <p className="uppercase text-lg text-white">Zaar aggregates liquidity from<br/> all top platforms</p>
                </div>
                {/* Stat Block 2 */}
                <div className="text-center">
                  <p className="text-3xl font-bold mb-5 uppercase text-white">earn yield on your<br/>idle nfts</p>
                  <p className="uppercase text-lg text-white">deposit to the nft capsule to earn<br/>ETH yield</p>
                </div>
                {/* Stat Block 3 */}
                <div className="text-center">
                    <p className="text-3xl font-bold mb-5 uppercase text-white">lock zaar to<br/> maximize yield</p>
                    <p className="uppercase text-lg text-white">upgraded tokenomics model<br/> rewards high conviction holders</p>
                </div>
              </div>
            </div>
        </section>

        {/* This is the main container for the section */}
        <div className="relative text-white bg-cover bg-center border-dark-gray-all mb-20" style={{ backgroundImage: "url('/images/bg-moon.jpg')" }}>
            {/* Overlay can be added if needed to darken the background image */}
            <div className="absolute inset-0 bg-dark-gray opacity-30"></div>

            {/* Container for content */}
            <div className="w-full px-8 relative mx-auto py-10 sm:py-20 z-10">
                {/* Title and subtitle */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow uppercase tracking-wider">Earn Zaar 
            <Image
              src="/images/xp.png"
              alt="xp"
              width={12}
              height={12}
              className="w-12 mb-2 inline-block ml-1"
            /></h1>
                <p className="text-lg sm:text-xl mb-8">Collect XP and earn rewards</p>

                {/* CTA Button */}
                <button className="bg-white text-black font-bold py-2 px-4 rounded-sm hover:bg-gray-200 transition duration-300 uppercase">
                    Start Earning
                </button>

                {/* Statistics with semi-transparent background */}
                <div className="mt-12 p-0 pt-5 pb-5 bg-black bg-opacity-30 rounded-sm">
                    <div className="flex flex-wrap justify-between items-center">
                        {/* Total Rewards Earned */}
                        <div className="w-1/1 sm:w-1/2 md:w-auto mb-4 md:mb-0 px-2">
                            <p className="text-2xl font-semibold text-yellow">YOUR ACTIONS, REWARDED</p>
                            <p className="text-md uppercase mt-3">Protocol actions reward XP. Users can<br/> redeem XP for $ZAAR.</p>
                        </div>

                        {/* Total Rewards Earned */}
                        <div className="w-1/1 sm:w-1/2 md:w-auto mb-4 md:mb-0 px-2">
                            <p className="mt-8 sm:mt-0 text-2xl font-semibold text-yellow">INCREASE EARNINGS</p>
                            <p className="text-md uppercase mt-3">Max lock your $ZAAR to maximise your<br/> XP earning potential.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="overflow-y-hidden overflow-x-hidden">
      <main id="landing" className="font-secondary">
        <HomeHeader />
        <HeroContent />

        <TableSection />
        <BottomSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
