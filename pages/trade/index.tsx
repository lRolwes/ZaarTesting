import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import { useTrendingCollections } from "@reservoir0x/reservoir-kit-ui";
import useTopCollections from "../../hooks/TopCollections";
import InfiniteScroll from "react-infinite-scroll-component";

const TableSection = () => {
  const { data: collections } = useTrendingCollections({
    period: "24h",
    limit: 1000,
  });
  const [collectionImage, setImage] = useState([" "]);
  const [collectionName, setName] = useState([" "]);
  const [collectionVolume, setVolume] = useState([0]);
  const [collectionFloorPrice, setFloorPrice] = useState([0]);
  const [collectionTopBid, setTopBid] = useState([0]);
  const [collection24HourPercentChange, set24HourPercentChange] = useState([0]);
  const [collection24HourRawChange, set24HourRawChange] = useState([0]);
  const [collectionOwners, setOwners] = useState([0]);
  const [collectionSales, setSales] = useState([0]);
  const [collectionPercentListed, setPercentListed] = useState([0]);
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
      let sales = [];
      let percentListed = [];

      for (let x = 0; x < 1000; x++) {
        images.push("url('" + collections?.[x].image + "')" || " ");
        names.push(collections?.[x].name?.toString() || " ");
        volumes.push(Number(collections?.[x].volume?.toFixed(2)) || 0);
        floorPrices.push(
          collections?.[x].floorAsk?.price?.amount?.decimal || 0
        );
        topBids.push(collections?.[x].topBid?.price?.amount?.decimal || 0);
        percentChanges.push(
          Number(collections?.[x].floorAskPercentChange?.toFixed(2)) || 0
        );
        rawChanges.push(
          (Number(collections?.[x].floorAskPercentChange) / 100) *
            Number(collections?.[x].floorAsk?.price?.amount?.decimal) || 0
        );
        owners.push(collections?.[x].ownerCount || 0);
        sales.push(collections?.[x].onSaleCount || 0);
        percentListed.push(
          Number(
            (
              (Number(collections?.[x].onSaleCount) * 100) /
              Number(collections?.[x].count)
            ).toFixed(2)
          ) || 0
        );
      }
      setImage(images);
      setName(names);
      setVolume(volumes);
      setFloorPrice(floorPrices);
      setTopBid(topBids);
      set24HourPercentChange(percentChanges);
      setOwners(owners);
      setSales(sales);
      set24HourRawChange(rawChanges);
      setPercentListed(percentListed);
      console.log(collections);
    }
  }, [collections]);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20); // Load first 20 items initially

  const fetchMoreData = () => {
    setEndIndex((prevEndIndex) => prevEndIndex + 20); // Load 20 more items
  };
  return (
    <div className="mt-[40px] ">
      <div className="container-fluid mx-auto px-4 py-6">
        {/* Tabs with underline */}
        

        {/* Table */}
        {/* 1st row */}
        <InfiniteScroll
          className="w-full"
          dataLength={endIndex} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={endIndex < 1000}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more data</b>
            </p>
          }
        >
          <div className="container-fluid mx-auto px-4 py-6 z-10">
          {/* Tabs with underline */}
          <div className="border-b border-dark-gray uppercase">
            <nav className="flex space-x-4" aria-label="Tabs">
              {/* Current: "border-yellow-400", Default: "border-transparent" */}
              <a
                href="#"
                aria-current="page"
                className="hover:text-yellow px-3 py-2 font-medium text-sm rounded-t-md text-yellow border-b-2 border-yellow focus:outline-none shadow active"
              >
                <i className="fal fa-books"></i> Collections
              </a>
              <a
                href="#"
                className="px-3 py-2 font-medium text-sm rounded-t-md text-white hover:text-yellow border-b-2 border-transparent focus:outline-none"
              >
                <i className="far fa-star"></i> Watchlist
              </a>
            </nav>
          </div>
        </div>

          <div className="overflow-x-auto rounded-lg z-10">
            <div className="table-wrapper">
              <table className="sticky-first-column w-full text-sm text-left text-white z-10">
                <thead className="max-h-[300px] text-s uppercase text-gray w-full z-1">
                  <tr className="border-b border-dark-gray cursor-pointer">
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Collection
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
                      Sales
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Capsule APY
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Owners
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      % Listed
                    </th>
                  </tr>
                </thead>
                <tbody className="z-10">
                  {collections
                    ?.slice(startIndex, endIndex)
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="dark-gray-hover cursor-pointer w-full"
                      >
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
                              <span className=" mt-[2px] px-2 pl-0.5 !pr-0">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 flex items-center">
                          <div
                            className="h-10 w-10 rounded-sm mr-4"
                            style={{
                              backgroundImage: collectionImage[index],
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                          {collectionName[index]}
                          <div className="inline-flex items-center ml-1 opacity-80"></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionFloorPrice[index]}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionTopBid[index]}
                        </td>
                        <td
                          className={`px-6 py-4 text-right ${collection24HourPercentChange[index] > 0 ? "text-green-500" : "text-red"}`}
                        >
                          {collection24HourPercentChange[index]}%
                        </td>
                        <td className="px-6 py-4 text-right text-green-500">
                          <span className="text-white">
                            {collection24HourRawChange[index]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionVolume[index]}
                        </td>
                        <td className="px-6 py-4 text-right text-white">
                          {collectionSales[index]}
                        </td>
                        <td className="px-6 py-4 text-right text-green-500"></td>
                        <td className="px-6 py-4 text-right">
                          {collectionOwners[index]}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionPercentListed[index]}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary">
        <HomeHeader />
        <TableSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
