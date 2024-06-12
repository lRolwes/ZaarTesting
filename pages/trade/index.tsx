import type { NextPage } from "next";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import { useTrendingCollections } from "@reservoir0x/reservoir-kit-ui";
import InfiniteScroll from "react-infinite-scroll-component";
import Watch from "../../components/Watch";
import { useAccount } from "wagmi";
import { getAccount } from '@wagmi/core'
import { config } from './../../config'
import {FavStar} from './../../components/FavStar';
const TableSection: React.FC<{WatchlistItems:WatchList}> = ({WatchlistItems}) => {
  const watchlist: WatchList = WatchlistItems;
  const { data: collections } = useTrendingCollections({
    period: "24h",
    limit: 1000,
  });
  const [collectionId, setId] = useState<string[]>();
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
  const [collectionOnSaleCount, setOnSaleCount] = useState(["0"]);
  const [collectionTokenCount, setTokenCount] = useState(["0"]);
  useEffect(() => {
    if (collections != null) {
      let ids = [];
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
      let tokenCount = [];
      let onSaleCount = [];
      for (let x = 0; x < 1000; x++) {
        ids.push(collections?.[x]?.id || " ");
        images.push("url('" + collections?.[x]?.image + "')" || " ");
        names.push(collections?.[x]?.name?.toString() || " ");
        volumes.push(Number(collections?.[x]?.volume?.toFixed(2)) || 0);
        floorPrices.push(
          collections?.[x]?.floorAsk?.price?.amount?.decimal || 0
        );
        topBids.push(collections?.[x]?.topBid?.price?.amount?.decimal || 0);
        percentChanges.push(
          Number(collections?.[x]?.floorAskPercentChange?.toFixed(2)) || 0
        );
        rawChanges.push(
          (Number(collections?.[x]?.floorAskPercentChange) / 100) *
          Number(collections?.[x]?.floorAsk?.price?.amount?.decimal) || 0
        );
        owners.push(collections?.[x]?.ownerCount || 0);
        sales.push(collections?.[x]?.onSaleCount || 0);
        percentListed.push(
          Number(
            (
              (Number(collections?.[x]?.onSaleCount)/Number(collections?.[x]?.tokenCount))
            ).toFixed(2)
          ) || 0
        );
        tokenCount.push(collections?.[x]?.tokenCount?.toString() || "0");
        onSaleCount.push(collections?.[x]?.onSaleCount?.toString() || "0");
      }
      setId(ids);
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
      setTokenCount(tokenCount);
      setOnSaleCount(onSaleCount);
    }
  }, [collections]);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20); // Load first 20 items initially

  const fetchMoreData = () => {
    setEndIndex((prevEndIndex) => prevEndIndex + 20); // Load 20 more items
  };
  return (
    <div className=" ">
      <div className="container-fluid mx-auto px-4 ">
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

          <div className="overflow-x-auto rounded-lg z-10">
            <div className="table-wrapper max-h-screen overflow-y-auto  no-scrollbar">
              <table className="sticky-first-column w-full text-sm text-left text-light-green z-10">
                <thead className="max-h-[800px] text-s uppercase text-gray w-full z-1 whitespace-nowrap">
                  <tr className="border-b border-dark-gray cursor-pointer">
                    <th scope="col" className="px-4 pb-3"></th>
                    <th scope="col" className="px-4 pb-3">
                      Collection
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      Floor Price
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      Top Offer
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      24H Change (%)
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      24H Change (listed)
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      24H Volume
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      Sales
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      Capsule APY
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
                      Owners
                    </th>
                    <th scope="col" className="px-4 pb-3 text-right">
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
                            <div className="flex items-center justify-center text-xs font-medium text-light-green">
                              <div className="w-5 h-12 flex items-center">
                                <div
                                  role="button"
                                  tabIndex={0}
                                  className="flex items-center w-full h-full"
                                >
                                  <div className="flex items-center ">
                                    {collectionId?.[index]? <FavStar id={collectionId[index]} defaultStatus={false}/> :null}
                                  </div>
                                </div>
                              </div>
                              <span className=" px-2 pl-0.5 !pr-0 text-gray flex items-center">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 flex items-center">
                          {collectionId && (
                            <div className="flex flex-row items-center">  <Link href={`/${collectionId[index]}`}>
                              <div
                                className="h-10 w-10 rounded-sm mr-4"
                                style={{
                                  backgroundImage: collectionImage[index],
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </Link>
                          
                          <Link className="hover:text-hoveryellow w-52 truncate" href={`/${collectionId[index]}`}>
                            {collectionName[index]}
                          </Link>
                          </div>)}
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
                          <span className="text-light-green">
                            {collection24HourRawChange[index]?.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionVolume[index]}
                        </td>
                        <td className="px-6 py-4 text-right text-light-green">
                          {collectionSales[index]}
                        </td>
                        <td className="px-6 py-4 text-right text-green-500"> --</td>
                        <td className="px-6 py-4 text-right">
                          {collectionOwners[index]}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {collectionOnSaleCount[index]}{"/"}{collectionTokenCount[index]}{"  ("}{collectionPercentListed[index]}%{")"}
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

const fetchData = async (): Promise<WatchList> => {
  try {
    const account = getAccount(config);
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/getWatchlist?ownerAddress=`+account.address);
    let userData: WatchList = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return (
      { address: [], authorAddress: "" }
    );
  }
};

type WatchList = {
  address: string[]
  authorAddress: string
}

const Home: NextPage = () => {
  const [watchlist, setWatchlist] = useState(false);
  const { address } = useAccount();
  const [WatchlistItems, setWatchlistItems]= useState<WatchList>({address:[], authorAddress:""});

  useEffect(() => {
    const loadData = async () => {
      fetchData().then(data => {
        setWatchlistItems(data);
      });
    }
    loadData();
  }, [address, WatchlistItems]);

  return (
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary">
        <HomeHeader />
        <div className="container-fluid mx-auto px-4 py-6 z-1000 mt-[50px]">
          {/* Tabs with underline */}
          <div className="border-b border-dark-gray uppercase">
            <nav className="flex space-x-4" aria-label="Tabs">
              {/* Current: "border-yellow-400", Default: "border-transparent" */}
              <button
                onClick={() => setWatchlist(false)}
                aria-current="page"
                className={`hover:text-white px-3 py-2 font-medium text-sm rounded-t-md text-yellow ${!watchlist ? " border-b-2 border-yellow " : "border-transparent"}  focus:outline-none shadow active`}
              >
                <i className="fal fa-books"></i> COLLECTIONS
              </button>
              <button
                onClick={() => setWatchlist(true)}
                className={`px-3 py-2 font-medium text-sm rounded-t-md text-yellow hover:text-white ${watchlist ? " border-b-2 border-yellow " : "border-transparent"} focus:outline-none`}
              >
                <i className="far fa-star"></i> WATCHLIST
              </button>
            </nav>
          </div>
        </div>
        <div className="h-100px w-full bg-yellow text-black">
        </div>
        {watchlist ? <Watch WatchlistItems={WatchlistItems}/> : <TableSection WatchlistItems={WatchlistItems}/> }
        <Footer />
      </main>
    </div>
  );
};

export default Home;