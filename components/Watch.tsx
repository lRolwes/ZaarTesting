
import React, { use, useEffect, useState } from "react";
import axios from 'axios';
import {FavStar} from './FavStar';
import Link from 'next/link';
import { getAccount } from '@wagmi/core'
import { config } from './../config'



type WatchList = {
  address: string[]
  authorAddress: string
}
type Collection = {
  id: string
  image: string
  name: string
  volume: {'1day': number}
  
  floorAsk: {
    price: {
      amount: {
        decimal: number
      }
    }
  }
  topBid: {
    price: {
      amount: {
        decimal: number
      }
    }
  }
  floorAskPercentChange: number
  ownerCount: number
  onSaleCount: number
  count: number
}
const Watch: React.FC<{WatchlistItems:WatchList}> = ({WatchlistItems}) => {
  const [watchlist, setWatchlist] = useState<WatchList>(WatchlistItems);
  const [collections, setCollections] = useState<Collection[]>([]);
  

async function readNFTs(){
  try{
    const readCollections: Collection[] = [];
    if(watchlist != undefined && watchlist.address != undefined && watchlist.address.length > 0){
    for(let i of watchlist.address){
      const thisCollection = await nftLookup(i);
      readCollections.push(thisCollection);
    }
    setCollections(readCollections);
  }
  }catch(e){
    console.log(e);
  }
}
  const [collectionId, setId] = useState<string[]>([]);
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
  async function nftLookup(target: string) {
    const options = {
      method: 'GET',
      url: 'https://api.reservoir.tools/collections/v7?id='+target+'&limit=1',
      headers: {accept: '*/*', 'x-api-key': 'f1bc813b-97f8-5808-83de-1238af13d6f9'}
    };

    try {
      const response = await axios.request(options);
      return response.data.collections[0];
    } catch (error) {
      console.error(error);
      return " ";
    }
  }
  useEffect(() => {
    setWatchlist(WatchlistItems);
    readNFTs();
    if (collections.length>0) {
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

      for (let item of collections) {
        ids.push(item?.id);
        images.push("url('" + item?.image + "')" || " ");
        names.push(item?.name?.toString() || " ");
        volumes.push(item?.volume['1day']? Number(item?.volume['1day']?.toFixed(2)): 0);
        floorPrices.push(
          item?.floorAsk?.price?.amount?.decimal || 0
        );
        topBids.push(item?.topBid?.price?.amount?.decimal || 0);
        percentChanges.push(
          Number(item?.floorAskPercentChange?.toFixed(2)) || 0
        );
        rawChanges.push(
          (Number(item?.floorAskPercentChange) / 100) *
          Number(item?.floorAsk?.price?.amount?.decimal) || 0
        );
        owners.push(item?.ownerCount || 0);
        sales.push(item?.onSaleCount || 0);
        percentListed.push(
          Number(
            (
              (Number(item?.onSaleCount) * 100) /
              Number(item?.count)
            ).toFixed(2)
          ) || 0
        );
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
    }
  }, [collections]);

  
  return (
    <div>      
    <div className=" ">
    
      <div className="container-fluid mx-auto px-4 ">
        {/* Table */}
          <div className="overflow-x-auto rounded-lg z-10 no-scrollbar">
            <div className="table-wrapper">
              <table className="sticky-first-column w-full text-sm text-left text-white z-10">
                <thead className="max-h-[800px] text-s uppercase text-gray w-full z-1 whitespace-nowrap">
                  <tr className="border-b border-dark-gray cursor-pointer">
                    <th scope="col" className="px-6 pb-3"></th>
                    <th scope="col" className="px-6 pb-3">
                      Collection
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      Floor Price
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      Top Offer
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      24H Change (%)
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      24H Change (listed)
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      24H Volume
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      Sales
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      Capsule APY
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      Owners
                    </th>
                    <th scope="col" className="px-6 pb-3 text-right">
                      % Listed
                    </th>
                  </tr>
                </thead>
                <tbody className="z-10">
                  {collections
                    ?.map((item, index) => (
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
                                   {collectionId[index]? <FavStar id={collectionId[index]}  defaultStatus={true} />: null}
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
                          <Link href={`/${collectionId[index]}`}>
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
                          <Link href={`/${collectionId[index]}`} className="hover:text-hoveryellow">
                          {collectionName[index]}
                          </Link>
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
      </div>
    </div>
    </div>
  )
}

export default Watch
