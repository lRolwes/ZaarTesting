import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import { useRouter } from "next/router";
import axios from "axios";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { createWalletClient, http } from 'viem'
import { useAccount } from "wagmi";
type CollectionData = {
    createdAt: string;
    name: string;
    image: string;
    id: string;
    description: string;
    tokenCount: string;
    contractKind: string;
    royalties: {bps: string};
    floorAsk:{price:{amount:{decimal:number}}};
    topBid:{price:{amount:{decimal:number}}};
    floorSaleChange: {"1day": number};
    volume:{"1day":number};
    volumeChange:{"1day":number};
};
const TopSection = ({
  collectionData,
}: {
  collectionData: CollectionData
}) => {
  const givenDate = new Date(collectionData?.createdAt? collectionData.createdAt:"");
  const currentDate = new Date();
  const differenceInMilliseconds = Number(currentDate) - Number(givenDate);
  const age = Math.floor(differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);

  return (
    <div className=" container-fluid mx-auto px-4 py-3">
      <div className=" text-white">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center space-x-4">
            <div
              className="object-cover w-16 h-16"
              style={{
                backgroundImage:
                  "url('" + collectionData?.image?.toString() + "')",
                backgroundSize: "cover",
                height: "16", // Set a fixed height
                width: "16", // Set a fixed width
              }}
            ></div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-light-green">
                  {collectionData?.name}
                </h1>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-sm cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-600"
                  >
                    <i className="fal fa-star text-gray"></i>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-sm cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-600"
                  >
                    <i className="fal fa-copy text-gray"></i>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-sm cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-600"
                  >
                    <i className="fas fa-sync-alt text-gray"></i>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-sm cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-600 hidden sm:inline-block"
                  >
                    <i className="fas fa-globe text-gray"></i>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-sm cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-600 hidden sm:inline-block"
                  >
                    <i className="fab fa-twitter text-gray"></i>
                  </button>
                  
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1 uppercase">
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                {collectionData?.contractKind?.substring(0,3)=="erc" ? "Ethereum" : "Polygon"}
                </span>
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  {collectionData?.tokenCount} ITEMS
                </span>
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  MINTED {age}Y AGO
                </span>
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  {(Number(collectionData?.royalties.bps)/100)}% CREATOR FEE
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavSection = ({
  collectionData,
}: {
  collectionData: CollectionData
}) => {
  const [activeTab, setActiveTab] = useState("items");
  function toggleTab(t: string){
    setActiveTab(t);
  }
  return (
    <div>
      <div className="flex-1 flex justify-between gap-x-3 flex-wrap-reverse md:flex-nowrap uppercase px-6 md:px-0">
      <nav className="inline-flex overflow-x-auto max-w-screen hidescroll md:px-6 h-[35px]">
        <button
          className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab=="items"?"bg-gray-200 text-yellow border-b-2":"text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
          onClick={()=>toggleTab("items")}
        >
          Items
        </button>
        <button
          className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 sm:hidden ${activeTab=="info"?"bg-gray-200 text-yellow border-b-2":"text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
          onClick={()=>toggleTab("info")}
        >
          Info
        </button>
        <button
          className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab=="activity"?"bg-gray-200 text-yellow border-b-2":"text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
          onClick={()=>toggleTab("activity")}
        >
          Activity
        </button>
        <button
          className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab=="traits"?"bg-gray-200 text-yellow border-b-2":"text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
          onClick={()=>toggleTab("traits")}
        >
          Traits
        </button>
      </nav>
      <div className="pb-4 <sm:px-2 sm:pb-0 sm:px-6 text-sm font-normal max-w-[calc(100vw_-_16px)] overflow-y-auto hidescroll flex text-gray divide-x-1 divide-gray-300 inline-flex items-center">
        <div className="flex pr-1.5 last:pr-0 gap-1 whitespace-nowrap">
          <div className="flex gap-1 mr-3">
            <div className="dashed-underline">Floor</div>
            <span className="w-full max-w-[200px]">
              <div className="text-light-green font-medium inline-flex items-center max-w-full">
                <div className="truncate">{collectionData?.floorAsk?.price?.amount?.decimal? collectionData.floorAsk.price.amount.decimal:""}</div>
              </div>
            </span>
          </div>
          <span className="w-full flex-1 mr-3">
            <span className={`${Number(collectionData.floorSaleChange["1day"])>=0.0? "text-green-500":"text-red"}`}>{Number(Number(collectionData.floorSaleChange["1day"]).toFixed(2))}%</span>
          </span>
        </div>
        <div className="flex px-1.5 last:pr-0 gap-1 whitespace-nowrap mr-3">
          <button
            type="button"
            className="dashed-underline cursor-pointer uppercase"
            aria-expanded="false"
          >
            Offer
          </button>
          <span className="w-full">
            <div className="flex items-center">
              <div className="text-light-green font-medium inline-flex items-center max-w-full">
                <div className="truncate">{collectionData?.topBid?.price?.amount?.decimal? collectionData.topBid.price.amount.decimal:""}</div>
              </div>
            </div>
          </span>
        </div>
        <div className="flex px-1.5 last:pr-0 gap-1 whitespace-nowrap mr-3">
          24h Vol
          <span className="w-full mr-3">
            <div className="text-light-green font-medium inline-flex items-center max-w-full">
              <div className="truncate">{Number(collectionData.volume["1day"]).toFixed(2)}</div>
            </div>
          </span>
          <span className="w-full">
            <span className={`${collectionData.volumeChange["1day"]>=0.0? "text-green-500":"text-red"}`}>{Number(collectionData.volumeChange["1day"]).toFixed(2)}%</span>
          </span>
        </div>
      </div>
    </div>
    {activeTab=="items"? <ItemsSection collectionData={collectionData}/>
      :activeTab=="activity"? <ActivitySection/>
  :activeTab=="traits"? <div></div> : <div></div>}
    </div>
  );
};
const ItemsSection = ({
  collectionData,
}: {
  collectionData: CollectionData
}) => {
  return (
    <div>
      <div className="mx-auto p-2 pl-6 pr-6 md:flex md:items-center md:justify-between hidden sm:inline-block">
            {/* Description */}
            <p className="md:flex-1 md:mr-4 text-gray">{collectionData.description}</p>
            {/* See More/Less Button */}
            <div className="text-right mt-2">
              <button
                className="text-blue-500"
                x-text="expanded ? 'See less' : 'See more'"
              ></button>
            </div>
      </div>
          <NFTCards id={collectionData.id} />
    </div>
  );
}

const ActivitySection = () => {
  return(
    <div className="">
            <div className="container-fluid mx-auto">
              <div className="bg-black text-light-green">
                {/* Activity Header */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 pt-3 pb-2 md:pt-3 md:pb-2 flex gap-2 border-gray-200 md:mx-6 z-3 px-6 md:px-0">
                    <div className="flex-col-reverse sm:flex-row-reverse lg:flex-row flex w-full gap-1.5 items-center lg:justify-between">
                      <div className="relative w-full sm:max-w-90">
                        <div className="relative max-w-[350px]">
                          <div className="flex items-center rounded-sm border border-dark-gray-all h-10 w-full">
                            <span className="font-medium text-xs pl-2 text-gray-400">
                              {/* Font Awesome icon for search */}
                              <i className="fas fa-search"></i>
                            </span>
                            <input
                              placeholder="Search for items"
                              type="text"
                              className="bg-transparent text-sm w-full outline-none px-2.5 text-gray placeholder-gray-500"
                              id="search-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Additional filters for larger screens */}
                    <div className="hidden lg:flex gap-1.5 items-center mt-2">
                      {/* Event filter */}
                      <div className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1">
                        Event
                        <i className="fas fa-chevron-up transform rotate-180 text-gray mr-1"></i>
                      </div>
                      {/* Market filter */}
                      <div className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1">
                        Market
                        <i className="fas fa-chevron-up transform rotate-180 text-gray mr-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap ml-6 sm:ml-4 md:pl-2">
                <button
                  type="button"
                  className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600"
                >
                  <span className="text-gray capitalize">Event</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    Sale
                  </span>
                  <i className="fas fa-times cursor-pointer h-14 w-14"></i>
                </button>
                <div className="flex items-center gap-2 flex-wrap md:ml-0 md:pl-0">
                  <button
                    type="button"
                    className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600"
                  >
                    <span className="text-gray capitalize">Event</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      Listing
                    </span>
                    <i className="fas fa-times cursor-pointer h-14 w-14"></i>
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap md:ml-0 md:pl-0">
                  <button
                    type="button"
                    className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600"
                  >
                    <span className="text-gray capitalize">Event</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      Transfer
                    </span>
                    <i className="fas fa-times cursor-pointer h-14 w-14"></i>
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap md:ml-0 md:pl-0">
                  <button
                    type="button"
                    className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600"
                  >
                    <span className="text-gray capitalize">Event</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      Mint
                    </span>
                    <i className="fas fa-times cursor-pointer h-14 w-14"></i>
                  </button>
                </div>
                <a
                  className="inline-block text-xs cursor-pointer text-blue my-1"
                  role="button"
                >
                  Clear
                </a>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-2 mr-2 md:ml-6 md:pl-1 md:mr-8 mt-3">
                {/*Table*/}
                <div className="overflow-x-auto rounded-lg w-full">
                  <Table />
                </div>
              </div>
            </div>
          </div>
  );
}

function TokenCard({
  token,
}: {
  token: { tokenId: string; rarity: string; image: string; name: string };
}) {
  const { address } = useAccount();

  const buyToken = async (tokenId: string) => {
    console.log("Buying Token", tokenId);
  
  const wallet = createWalletClient({
    account: address,
    transport: http()
  })
  getClient()?.actions.buyToken({
    items: [{ token: tokenId, quantity: 1 }],
    wallet,
    onProgress: (steps: Execute['steps']) => {
      console.log(steps)
    }
  })
  
  };
  return (
    <div className="bg-dark-gray text-white rounded-xl flex flex-col border border-transparent hover:border-gray-700 group relative overflow-hidden">
      <div className="px-3 py-1.5">
        <span className="text-light-green text-xs font-medium">
          Rarity #{token.rarity}
        </span>
      </div>
      <div className="flex-1 relative">
        <div
          className="object-cover w-[300px] h-[300px]"
          style={{
            backgroundImage: "url('" + token.image?.toString() + "')",
            backgroundSize: "cover",
            height: "16", // Set a fixed height
            width: "16", // Set a fixed width
          }}
        ></div>
      </div>
      <div className="flex flex-col p-2">
        <a className="mb-1.5 flex items-center gap-1 hover:text-blue" href="#">
          {token.name}
        </a>
        <div className="flex justify-between items-center pb-1.5">
          <button
            type="button"
            className="flex items-center justify-center px-2 py-1.5 text-xs font-medium text-light-green border border-dark-gray-all gray hover:border-gray-400 rounded"
          >
            2.6548 ETH
          </button>
          <a
            id="btn"
            className="border font-medium text-xs text-light-green border-dark-gray-all rounded hover:bg-gray-700 hover:text-white hover:border-gray-400 px-1.5 h-6 flex items-center cursor-pointer"
          >
            Details
          </a>
        </div>
        <div className="flex justify-between">
          <div className="text-xs -mx-3 -mb-2 px-3 py-1 text-light-green flex items-center">
            Last 6.65 ETH
            <i className="fas fa-history ml-1"></i>
          </div>
        </div>
      </div>
      {/* Buy Now Button */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform">
        <BuyModal trigger={
            <button 
            className="w-full py-2 bg-yellow text-black uppercase text-sm font-bold rounded-b-xl hover:bg-yellow-600"
            onClick = {()=>{buyToken(token.tokenId)}}
            >
              Buy Now
            </button>
          }
          token={token.tokenId?.toString()}
          onConnectWallet={()=>{console.log("Connected")}}
          onPurchaseComplete={(data) => console.log("Purchase Complete")}
          onPurchaseError={(error, data) =>
            console.log("Transaction Error", error, data)
          }
          onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
        />
      </div>
    </div>
  );
}

function NFTCards({ id }: { id: string }) {
  const [tokenData, setTokenData] = useState([
    { token: { tokenId: "0", rarity: "0", image: " ", name: " " } },
  ]);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("floorAskPrice");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [priceFloor, setPriceFloor] = useState(0);
  const [priceCeiling, setPriceCeiling] = useState(1000000);
  const [rarityFloor, setRarityFloor] = useState(0);
  const [rarityCeiling, setRarityCeiling] = useState(1000000);
  const [markets, setMarkets] = useState({
    "OpenSea": false,
    "Rarible": false,
    "Foundation": false
  });
  const [traits, setTraits] = useState({
    "Trait 1": false,
    "Trait 2": false,
    "Trait 3": false
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = encodeURIComponent(value);
    setSearch(value);
  }
  useEffect(() => {
    async function nftLookup() {

      let lookupString = `https://api.reservoir.tools/tokens/v7?collection=${id}&sortBy=${sort}&sortDirection=${sortDirection}`
      if(search!="" && search!=null){
        lookupString = lookupString + `&tokenName=${search}`
      }
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: { accept: "*/*", "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9" },
      };
      try {
        const response = await axios.request(options);
        //console.log(response.data);
        return response.data.tokens;
      } catch (error) {
        console.error(error);
        return " ";
      }
    }

    if (id) {
      const fetchNftData = async () => {
        const nftData = await nftLookup();
        setTokenData(nftData);
      };
      fetchNftData();
    }
  }, [id, search, setTokenData, sort, sortDirection]);

  return (
    <div>
      <div className="flex-1 pt-3 pb-2 md:pt-3 md:pb-3 flex gap-2 border-gray-200 md:mx-6 z-3 px-6 md:px-0">
        <div className="flex-col-reverse sm:flex-row-reverse lg:flex-row flex w-full gap-1.5 items-center lg:justify-between">
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative w-full sm:w-auto">
                  
                  {/* Lowest Price Filter Dropdown Container */}
                  <div className="relative">
                    <button
                    onClick={()=>{setSortOpen(!sortOpen)}}>
                    {/* Trigger */}
                    <div className="text-white cursor-pointer truncate border border-dark-gray-all rounded-sm flex justify-between items-center text-sm px-4 h-10 bg-black text-gray outline-none focus:outline-none h-[50px] text-white" >
                      {sort=="floorAskPrice"? (sortDirection=="asc"? "Lowest Price": "Highest Price"): sort=="listedAt"? "Recently Listed": sort=="rarity"? (sortDirection=="asc"? "Common to Rarest": "Rarest to Common"): "NA"}
                      {sortOpen?
                        <FaChevronUp className="text-gray-400 ml-2" />:
                        <FaChevronDown className="text-gray-400 ml-2" />
                      }
                    </div>
                    </button>

                    {/* Dropdown Content */}
                    <div  className={` ${sortOpen? " " : "hidden "} absolute w-50 mt-1 z-10`}>
                      <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                        {/* Dropdown Options */}
                        <button
                          onClick= {()=>{setSort("floorAskPrice"); setSortDirection("asc"); setSortOpen(false)}}
                         className="w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left" >
                          Lowest Priced
                        </button>
                        <button 
                        onClick={()=>{setSort("floorAskPrice");setSortDirection("desc"); setSortOpen(false)}}
                        className="w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left">
                          Highest Price
                        </button>
                        <button 
                        onClick = {()=>{setSort("listedAt"); setSortDirection("asc"); setSortOpen(false)}}
                        className="block cursor-pointer px-4 py-2 hover:bg-gray text-left" >
                          Recently Listed
                        </button>
                        <button 
                        onClick={()=>{setSort("rarity"); setSortDirection("asc"); setSortOpen(false)}}
                        className="block cursor-pointer px-4 py-2 hover:bg-gray text-left" >
                          Common to Rarest
                        </button>
                        <button
                        onClick={()=>{setSort("rarity"); setSortDirection("desc"); setSortOpen(false)}}
                        className="block cursor-pointer px-4 py-2 hover:bg-gray text-left" >
                          Rarest to Common
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            <button
              type="button"
              className="hover:border-gray-400 flex items-center justify-center rounded-sm cursor-pointer px-2 text-xs py-1.5 font-medium text-gray border border-dark-gray-all  h-10 w-full lg:hidden rounded-sm text-sm text-gray"
            >
              {/* Font Awesome icon for filter */}
              <i className="fas fa-filter"></i>&nbsp;&nbsp;Filters
            </button>
          </div>
          <div className="relative w-full sm:max-w-90">
            <div className="relative max-w-[350px]">
              <div className="flex items-center ">
                <span className="font-medium text-xs pl-2 text-gray-400">
                  {/* Font Awesome icon for search */}
                  <i className="fas fa-search"></i>
                </span>
                  <input type="text" placeholder="Search for tokens" onChange={handleInputChange} className=" border-2 border-dark-gray border-l border-r border-t bg-black w-full px-4 py-2 rounded-sm bg-black text-white placeholder-gray-50 focus:outline-none ml-2" autoComplete="off"/>
              </div>
            </div>
          </div>
        </div>
        {/* Additional filters for larger screens */}
        <div className="hidden lg:flex gap-1.5 items-center">
          {/* Status filter */}
          <div className="relative mb-4">
                        <div onClick={()=>{setStatus(!status)}} className="cursor-pointer bg-black text-white border hover:bg-slate-800 border-gray-600 rounded py-2 px-4 flex justify-between items-center h-[50px]" >
                            Status
                            <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                        <div className={`absolute dropdown-content w-[150px] bg-light-gray z-10 mt-1 ${status?"":"hidden"} z-10`}>
                            <div className="bg-gray text-light-green rounded-sm">
                                <label className="block cursor-pointer px-4 py-2 pl-0">
                                    <input type="radio" name="status" value="buy_now" className=" ml-2 form-radio accent-yellow mr-2"/>Buy Now
                                </label>
                                <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                                    <input type="radio" name="status" value="show_all" className="ml-2 form-radio accent-yellow mr-2"/>Show All
                                </label>
                            </div>
                        </div>
                      </div>
          {/* Price filter */}
          <div
            className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
            tabIndex={0}
          >
            Price
            <i className="fas fa-chevron-up transform rotate-180 text-gray mr-1"></i>
          </div>
          {/* Rarity filter */}
          <div
            className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
            tabIndex={0}
          >
            Rarity
            <i className="fas fa-chevron-up transform rotate-180 text-gray mr-1"></i>
          </div>
          {/* Market filter */}
          <div
            className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
            tabIndex={0}
          >
            Market
            <i className="fas fa-chevron-up transform rotate-180 text-gray mr-1"></i>
          </div>
          {/* Traits filter */}
          <div
            className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-2"
            tabIndex={0}
          >
            <i className="fas fa-tag"></i>&nbsp;Traits
          </div>
        </div>
      </div>
      <div className="flex items-center pb-2 z-3">
        <div className="pl-6">
          <div className="flex items-center">
            <div className="pr-1 inline-flex items-center justify-center">
              {/* Live indicator can be represented with a dot icon or similar */}
              <i className="fas fa-circle text-yellow"></i>
            </div>
            <span className="text-xs text-gray dark:text-gray mr-2">
              7 results
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap md:ml-2 md:pl-2">
            <button
              type="button"
              className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 hidden sm:block"
            >
              <span className="text-gray capitalize">Status</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Buy Now
              </span>
              <i className="fas fa-times cursor-pointer h-14 w-14"></i>
            </button>
          </div>
        </div>
        <div className="pr-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-gray text-sm">My Items</div>
            <label className="relative inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                defaultChecked
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
            </label>
          </div>
          <div className="flex items-center rounded-sm border-dark-gray-all border">
            <button
              type="button"
              className="flex items-center justify-center h-8 w-9 text-gray hover:text-gray-600 hover:bg-white rounded-sm"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="h-8 w-[1px] bg-dark-gray"></div>
            <button
              type="button"
              className="flex items-center justify-center h-8 w-9 text-light-gray bg-gray-700 rounded-sm"
            >
              <i className="fas fa-th"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-0">
        {/* NFT Cards Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 py-4">
          {tokenData ? (
            tokenData.map((nft) => (
              <TokenCard key={nft.token.tokenId} token={nft.token} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
const Table = () => {
  return (
    <div className="table-wrapper">
      <table className="sticky-first-column not-sticky-second-column w-full text-sm text-left text-light-green">
        <thead className="text-xs uppercase text-gray">
          <tr className="border-b border-dark-gray cursor-pointer">
            <th scope="col" className="px-6 py-3">
              Event
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Item
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Value
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              From
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              To
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 1st row */}
          <tr className="dark-gray-hover cursor-pointer">
            <td className="px-4 py-4 flex items-center">
              <div className="bg-black border border-dark-gray-all w-6 h-6 mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                <Image
                  width={16}
                  height={16}
                  className="w-7 h-7 object-cover rounded-sm"
                  src="/images/blur.png"
                  alt="Blur"
                />
              </div>
              Listing
            </td>
            <td className="px-2 py-0 text-right">
              <div
                className="flex items-center text-sm overflow-hidden last:pr-4"
                role="cell"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center w-full overflow-hidden">
                    <div className="mr-2">
                      <div className="relative overflow-hidden rounded-sm w-9 h-9">
                        <Image
                          width={16}
                          height={16}
                          alt="NFT Image"
                          className="object-cover w-full"
                          src="/images/collections/milady/milady-5799.jpg"
                        />{" "}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm text-gray"># 5799</div>
                      </div>
                      <div className="inline-block">
                        <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                          <div className="text-light-green text-xs">
                            <div> #6,211</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              4.94 <i className="fab fa-ethereum"></i>
              <br />
              <span className="text-xs text-gray">36% above floor</span>
            </td>
            <td className="px-6 py-4 text-right text-light-green">
              <div className="truncate undefined">0x3a…c279</div>
            </td>
            <td className="px-6 py-4 text-right text-green-500">
              <span className="text-gray" />
            </td>
            <td className="px-6 py-4 text-right">
              13s ago
              <br />
              <span className="text-xs text-gray">Apr 1 11:34 PM</span>
            </td>
          </tr>
          {/* 2nd row */}
          <tr className="dark-gray-hover cursor-pointer">
            <td className="px-4 py-4 flex items-center">
              <div className="bg-black border border-dark-gray-all w-6 h-6 mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                <Image
                  width={16}
                  height={16}
                  className="w-5 h-5 object-cover rounded-sm"
                  src="/images/opensea.svg"
                  alt="OpenSea"
                />
              </div>
              Listing
            </td>
            <td className="px-2 py-0 text-right">
              <div
                className="flex items-center text-sm overflow-hidden last:pr-4"
                role="cell"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center w-full overflow-hidden">
                    <div className="mr-2">
                      <div className="relative overflow-hidden rounded-sm w-9 h-9">
                        <Image
                          width={16}
                          height={16}
                          alt="NFT Image width={16} height ={16}"
                          className="object-cover w-full"
                          src="/images/collections/milady/milady-1884.jpg"
                        />{" "}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm text-gray"># 1884</div>
                      </div>
                      <div className="inline-block">
                        <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                          <div className="text-light-green text-xs">
                            <div> #156</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              7.77 <i className="fab fa-ethereum"></i>
              <br />
              <span className="text-xs text-gray">113% above floor</span>
            </td>
            <td className="px-6 py-4 text-right text-light-green">
              <div className="truncate undefined">0x66…0bd0</div>
            </td>
            <td className="px-6 py-4 text-right text-green-500">
              <span className="text-gray" />
            </td>
            <td className="px-6 py-4 text-right">
              2m ago
              <br />
              <span className="text-xs text-gray">Apr 1 11:32 PM</span>
            </td>
          </tr>
          {/* 3rd row */}
          <tr className="dark-gray-hover cursor-pointer">
            <td className="px-4 py-4 flex items-center">
              <div className="bg-black border border-dark-gray-all w-6 h-6 mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                <Image
                  width={16}
                  height={16}
                  className="w-8 h-8 object-cover rounded-sm"
                  src="/images/blur.png"
                  alt="Blur"
                />
              </div>
              Listing
            </td>
            <td className="px-2 py-0 text-right">
              <div
                className="flex items-center text-sm overflow-hidden last:pr-4"
                role="cell"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center w-full overflow-hidden">
                    <div className="mr-2">
                      <div className="relative overflow-hidden rounded-sm w-9 h-9">
                        <Image
                          width={16}
                          height={16}
                          alt="NFT Image width={16} height ={16}"
                          className="object-cover w-full"
                          src="/images/collections/milady/milady-4551.jpg"
                        />{" "}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm text-gray"># 4511</div>
                      </div>
                      <div className="inline-block">
                        <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                          <div className="text-light-green text-xs">
                            <div> #2,082</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              7.77 <i className="fab fa-ethereum"></i>
              <br />
              <span className="text-xs text-gray">113% above floor</span>
            </td>
            <td className="px-6 py-4 text-right text-light-green">
              <div className="truncate undefined">0x66…0bd0</div>
            </td>
            <td className="px-6 py-4 text-right text-green-500">
              <span className="text-gray" />
            </td>
            <td className="px-6 py-4 text-right">
              3m ago
              <br />
              <span className="text-xs text-gray">Apr 1 11:31 PM</span>
            </td>
          </tr>
          {/* 4th row */}
          <tr className="dark-gray-hover cursor-pointer">
            <td className="px-4 py-4 flex items-center">
              <div className="bg-black border border-dark-gray-all w-6 h-6 mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                <i className="fas fa-long-arrow-right"></i>
              </div>
              Sale
            </td>
            <td className="px-2 py-0 text-right">
              <div
                className="flex items-center text-sm overflow-hidden last:pr-4"
                role="cell"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center w-full overflow-hidden">
                    <div className="mr-2">
                      <div className="relative overflow-hidden rounded-sm w-9 h-9">
                        <Image
                          width={16}
                          height={16}
                          alt="NFT Image width={16} height ={16}"
                          className="object-cover w-full"
                          src="/images/collections/milady/milady-6991.jpg"
                        />{" "}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm text-gray"># 6991</div>
                      </div>
                      <div className="inline-block">
                        <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                          <div className="text-light-green text-xs">
                            <div> #7,814</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              3.64 <i className="fab fa-ethereum"></i>
              <br />
              <span className="text-xs text-gray">floor price</span>
            </td>
            <td className="px-6 py-4 text-right text-light-green">
              <div className="truncate undefined">JokerFrog.eth</div>
            </td>
            <td className="px-6 py-4 text-right text-light-green">
              <div className="truncate undefined">0x3a…c279</div>
            </td>
            <td className="px-6 py-4 text-right">
              5m ago <i className="far fa-level-up"></i>
              <br />
              <span className="text-xs text-gray">Apr 1 11:29 PM</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const LuckyBuy = () => {
  return (
    <div
      id="modal-lucky-buy"
      className="h-auto w-11/12 lg:w-9/12 p-3 bg-black rounded-sm z-10"
    >
      <div className="flex flex-col w-full h-auto">
        {/* Modal Header */}
        <div className="bg-black p-2 flex justify-between items-center rounded-sm mb-3">
          {/* Left Side - Tab-like Buttons */}
          <div
            className="inline-flex shadow-md rounded-sm bg-black p-1 text-sm"
            role="tablist"
          >
            {/* Active Tab */}
            <button
              className="px-4 py-2 bg-dark-gray text-light-green rounded-sm focus:outline-none"
              role="tab"
              aria-selected="true"
            >
              Play
            </button>
            {/* Inactive Tab */}
            <button
              className="px-4 py-2 text-gray rounded-sm focus:outline-none"
              role="tab"
            >
              History
            </button>
          </div>

          {/* Right Side - Navigation and Close Buttons */}
          <div className="flex items-center space-x-2 text-sm">
            {/* Escape/Close Button */}
            <button className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none">
              <i className="far fa-times-square"></i> Esc
            </button>
          </div>
        </div>
        {/* End of Modal Header */}

        {/* Modal Body */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Column - Content Area */}
          <div className="md:w-12/12 p-2">
            {/* NFT Image width={16} height ={16} and Details */}
            <div className="w-full flex flex-col items-center md:items-start">
              {/* Left Column: Content Area */}
              <div className="flex-1 p-0">
                <div className="bg-black text-white p-4" id="lucky-buy">
                  <h1 className="font-medium text-light-green font-medium text-2xl uppercase ml-2 text-center mt-0 sm:mt-6 mb-2">
                    LUCKY BUY
                  </h1>
                  <p className="text-center text-light-green mb-5">
                    Spin for a chance to lucky buy this NFT.
                    <br /> XP can be redeemed for Zaar.
                  </p>

                  <div className="flex justify-center items-center sticky top-5 z-10 bg-black">
                    {/* Container for the cards */}
                    <div className="inline-flex gap-1">
                      {/* Cards to the left with XP */}
                      {/* Repeat this card for the other 4 left cards */}
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm text-light-green uppercase mt-2">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          69 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm text-light-green uppercase mt-2">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          42 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm text-light-green uppercase mt-2">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          99 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm text-light-green uppercase mt-2">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          110 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm text-light-green uppercase mt-2">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          250 XP
                        </div>
                      </div>

                      {/* Middle card with the NFT */}
                      <div className="card bg-gray-yellow border-light-gray-all border-1 rounded-sm relative shadow-2xl">
                        <div className="absolute inset-0 flex justify-center items-center">
                          <div className="dial-line bg-white h-full flex flex-col justify-between">
                            <div className="dial-triangle dial-triangle-top"></div>
                            <div className="dial-triangle dial-triangle-bottom"></div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between h-full py-2">
                          <div className="text-sm uppercase text-center text-light-green">
                            NFT
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm text-center text-light-green">
                            #5799
                          </div>
                        </div>
                      </div>

                      {/* Cards to the right with XP */}
                      {/* Repeat this card for the other 4 right cards */}
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm uppercase mt-2 text-light-green">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          69 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm uppercase mt-2 text-light-green">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          10 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm uppercase mt-2 text-light-green">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          420 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm uppercase mt-2 text-light-green">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          250 XP
                        </div>
                      </div>
                      <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                        <div className="text-sm uppercase mt-2 text-light-green">
                          XP
                        </div>
                        <Image
                          alt="xp"
                          width={16}
                          height={16}
                          src="/images/xp.png"
                          className="w-16"
                        />
                        <div className="text-sm mb-2 text-light-green">
                          30 XP
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white p-4 rounded-sm shadow-lg max-w-lg mx-auto">
                    <div className="mb-2 text-center text-light-green text-base mt-5">
                      CHOOSE YOUR ODDS
                    </div>
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value="2"
                        step="1"
                        className="slider w-full h-2 rounded-sm cursor-pointer accent-yellow"
                        id="odds-slider"
                      />
                      <div className="flex justify-between text-sm px-2 text-gray">
                        <span>1%</span>
                        <span>15%</span>
                        <span>30%</span>
                        <span>45%</span>
                        <span>60%</span>
                        <span>75%</span>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-md mx-auto bg-black rounded-sm overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                      <div className="w-full">
                        <div className="p-2 border-b border-dark-gray">
                          <div className="text-sm font-semibold text-light-green uppercase">
                            Details
                          </div>
                        </div>
                        <div className="p-2 pt-0 pb-0">
                          <table className="w-full text-left text-sm text-light-green">
                            <tbody>
                              <tr className="border-b border-dark-gray">
                                <td className="py-0 text-gray">
                                  Potential upside
                                </td>
                                <td className="py-0 text-right">6.67x</td>
                              </tr>
                              <tr className="border-b border-dark-gray">
                                <td className="py-2 text-gray">
                                  Odds of winning
                                </td>
                                <td className="py-2 text-right">15%</td>
                              </tr>
                              <tr className="border-b border-dark-gray">
                                <td className="py-2 text-gray">NFT price</td>
                                <td className="py-2 text-right">2.920</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-gray">You pay</td>
                                <td className="py-2 text-right">0.438</td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="flex items-left justify-left">
                            <div className="flex items-center space-x-2 mt-3">
                              {" "}
                              {/* This will create space between the checkbox and the label */}
                              <input
                                id="termsCheckbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 accent-yellow"
                                required
                              />
                              <label className="text-sm text-gray">
                                I agree to Lucky Buy terms and conditions
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spin button */}
                  <div className="mt-8 flex flex-col items-center mb-0">
                    <button
                      id="spinButton"
                      type="button"
                      className="spin-button text-black uppercase bg-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                    >
                      Spin
                    </button>
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
const DetailsModal = () => {
  return (
    <div>
      {/*view NFT modal*/}
      <div
        id="modal-view-nft"
        className="h-auto w-11/12 lg:w-9/12 p-3 bg-dark-gray rounded-sm z-10"
      >
        <div className="flex flex-col w-full h-auto">
          {/* Modal Header */}
          <div className="bg-dark-gray p-2 flex justify-between items-center rounded-sm mb-3">
            {/* Left Side - Tab-like Buttons */}
            <div
              className="inline-flex shadow-md rounded-sm bg-gray p-1 text-sm"
              role="tablist"
            >
              {/* Active Tab */}
              <button
                className="px-4 py-2 bg-dark-gray text-light-green rounded-sm focus:outline-none"
                role="tab"
                aria-selected="true"
              >
                Overview
              </button>
              {/* Inactive Tab */}
              <button
                className="px-4 py-2 text-gray rounded-sm focus:outline-none"
                role="tab"
              >
                Activity
              </button>
            </div>

            {/* Right Side - Navigation and Close Buttons */}
            <div className="flex items-center space-x-2 text-sm">
              <button className="text-gray bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none">
                &larr; Prev
              </button>
              <button className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none">
                Next &rarr;
              </button>
              {/* Escape/Close Button */}
              <button className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none">
                <i className="far fa-times-square"></i> Esc
              </button>
            </div>
          </div>
          {/* End of Modal Header */}

          {/* Modal Body */}
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Column - Content Area */}
            <div className="md:w-8/12 p-2">
              {/* NFT Image width={16} height ={16} and Details */}
              <div className="w-full flex flex-col items-center md:items-start">
                {/* Left Column: Content Area */}
                <div className="flex-1 p-0">
                  {/* Collection Name and Verification */}
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href="/collection/milady"
                      className="text-yellow font-semibold hover:underline"
                    >
                      Milady Maker
                    </Link>
                  </div>

                  {/* NFT Title */}
                  <h2 className="text-3xl font-bold text-light-green mb-3">
                    Milady 5799
                  </h2>

                  {/* NFT Attributes */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center">
                      {/* Rarity Ranking */}
                      <span className="mr-2 bg-gray text-gray text-xs font-semibold px-2.5 py-0.5 rounded">
                        #6,211
                      </span>
                    </div>
                    <div className="text-gray mt-7">
                      {/* Flex container for inline display on small screens and above */}
                      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                        {/* Created by */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Created by</span>
                          <div className="text-sm font-bold">
                            <a
                              href="#"
                              className="text-yellow hover:text-yellow-200"
                            >
                              Remilia
                            </a>
                          </div>
                        </div>

                        {/* Owner */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Owner</span>
                          <div className="text-sm font-bold">
                            <a
                              href="#"
                              className="text-yellow hover:text-yellow-200"
                            >
                              ugliestduck
                            </a>
                          </div>
                        </div>

                        {/* Held for */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Held for</span>
                          <div className="text-sm font-bold text-light-green">
                            6 months
                          </div>
                        </div>

                        {/* Last Price */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Last Price</span>
                          <div className="text-sm font-bold text-light-green">
                            18.00<i className="fab fa-ethereum ml-1"></i>
                          </div>
                        </div>

                        {/* Collection Floor */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Collection Floor</span>
                          <div className="text-sm font-bold text-light-green">
                            2.40<i className="fab fa-ethereum ml-1"></i>
                          </div>
                        </div>

                        {/* Top Offer */}
                        <div className="mr-0 sm:mr-7">
                          <span className="text-xs">Top Offer</span>
                          <div className="flex items-center">
                            <div className="text-sm font-bold text-light-green">
                              5.53<i className="fab fa-ethereum ml-1"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Offer Button */}
                  <div className="mt-4">
                    <div className="bg-gray text-white p-4 rounded-sm w-full max-w-full">
                      {/* Top Offer and Action Buttons */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col gap-2 w-full">
                          <div className="text-sm sm:text-base mb-2">
                            <span className="text-gray">Listed for</span>{" "}
                            <span className="font-semibold">
                              22.40
                              <i className="fab fa-ethereum ml-1 fa-xs text-gray"></i>
                            </span>{" "}
                            <span className="text-gray ml-1">($55,171)</span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-[100px]">
                            <button
                              type="button"
                              className="text-black uppercase bg-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                            >
                              Buy now
                            </button>
                            <button
                              id="btn"
                              className="text-white uppercase bg-dark border border-gray-600 hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                            >
                              Make offer
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Additional Information in Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div className="text-left">
                          <div className="text-xs">Expiration</div>
                          <div className="text-sm font-bold">in 4w</div>
                        </div>
                        <div className="text-left">
                          <div className="text-xs">Listed</div>
                          <div className="text-sm font-bold">2h ago</div>
                        </div>
                        <div className="text-left">
                          <div className="text-xs">Markup</div>
                          <div className="text-sm font-bold">+89.86%</div>
                        </div>
                        <div className="text-left">
                          <div className="text-xs">Floor Difference</div>
                          <div className="text-sm font-bold">+164.74%</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm overflow-hidden">
                      <div className="py-3 px-0 uppercase mt-2 text-light-green">
                        Sale History
                      </div>
                      <canvas className="p-0" id="chartLine"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trait Details and Action Button */}
            <div className="md:w-4/12 p-2 bg-dark-gray rounded-lg mr-2">
              <div className="flex flex-col items-center md:items-start">
                <Image
                  width={16}
                  height={16}
                  alt="NFT Image width={16} height ={16}"
                  className="object-cover w-full mb-3 rounded-sm"
                  src="/images/collections/milady/milady-5799.jpg"
                />
                <div className="bg-transparent p-0 rounded-sm w-full mt-2 border border-1 border-dark-gray-all">
                  <div className="flex justify-between text-white mb-0">
                    <h2 className="text-base text-light-green font-bold uppercase p-2">
                      Attributes
                    </h2>
                  </div>
                  <div className="flex justify-between bg-gray p-2">
                    <h2 className="text-xs font-bold text-gray">Trait</h2>
                    <h2 className="text-xs font-bold text-gray">Floor</h2>
                  </div>
                  <div className="max-h-48 overflow-y-auto p-2">
                    <div className="mb-2">
                      <div className="flex justify-between text-light-green text-sm">
                        <div>
                          <p>Lolita-Harajuku</p>
                          <div className="bg-gray text-gray text-xs inline-block px-2 py-1 rounded">
                            Core
                          </div>
                          <span className="text-light-green text-xs ml-1">
                            237 (2.44%)
                          </span>
                        </div>
                        <div>
                          <p>
                            2.4798 <i className="fab fa-ethereum fa-xs"></i>
                          </p>
                          <p className="text-gray-400 text-xs text-right">
                            $6.09K
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-light-green text-sm">
                        <div>
                          <p>Bowl Brown</p>
                          <div className="bg-gray text-gray text-xs inline-block px-2 py-1 rounded">
                            Hair
                          </div>
                          <span className="text-light-green text-xs ml-1">
                            414 (4.25%)
                          </span>
                        </div>
                        <div>
                          <p>
                            2.514 <i className="fab fa-ethereum fa-xs"></i>
                          </p>
                          <p className="text-gray-400 text-xs text-right">
                            $5.54K
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Repeat the div block for each trait as needed */}
                    <div className="mb-2">
                      <div className="flex justify-between text-light-green text-sm">
                        <div>
                          <p>Sunset</p>
                          <div className="bg-gray text-gray text-xs inline-block px-2 py-1 rounded">
                            Background
                          </div>
                          <span className="text-light-green text-xs ml-1">
                            1503 (15.44%)
                          </span>
                        </div>
                        <div>
                          <p>
                            2.514 <i className="fab fa-ethereum fa-xs"></i>
                          </p>
                          <p className="text-gray-400 text-xs text-right">
                            $5.54K
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-light-green text-sm">
                        <div>
                          <p>Maid</p>
                          <div className="bg-gray text-gray text-xs inline-block px-2 py-1 rounded">
                            Shirt
                          </div>
                          <span className="text-light-green text-xs ml-1">
                            171 (1.76%)
                          </span>
                        </div>
                        <div>
                          <p>
                            2.4798 <i className="fab fa-ethereum fa-xs"></i>
                          </p>
                          <p className="text-gray-400 text-xs text-right">
                            $6.09K
                          </p>
                        </div>
                      </div>
                    </div>
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

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  nftLookup();
  const [nftData, setNftData] = useState({
    contractKind: "",
    createdAt: "",
    name: "",
    image: "",
    id: "",
    description: "",
    tokenCount: "",
    royalties: {bps: ""},
    floorAsk:{price:{amount:{decimal:0}}},
    topBid:{price:{amount:{decimal:0}}},
    floorSaleChange: {"1day": 0},
    volume:{"1day":0},
    volumeChange:{"1day":0},
  });

  async function nftLookup() {
    const options = {
      method: "GET",
      url: `https://api.reservoir.tools/collections/v7?id=${id}`,
      headers: {
        accept: "*/*",
        "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
      },
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      setNftData(response.data.collections[0]);
      return response.data;
    } catch (error) {
      console.error(error);
      return " ";
    }
  }
  return (
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary mt-[70px]">
        <HomeHeader />
        <div>
          <TopSection collectionData={nftData} />
          {nftData? <NavSection collectionData={nftData}/>: <div></div>}

          <div id="info" className="tab-content hidden">
            <div className="container-fluid mx-auto px-4 py-3">
              <div className="bg-black text-light-green">
                {/* Collection Header */}
                <div className="flex items-center justify-between px-2 py-2 mb-4">
                  <p>
                    Milady Maker is a collection of 10,000 generative
                    pfpNFT$aposs in a neochibi aesthetic inspired by street
                    style tribes.
                  </p>
                </div>

                <div className="flex items-center justify-between px-2 py-2">
                  <a
                    href="https://miladymaker.net/"
                    target="_blank"
                    className="text-light-green uppercase bg-gray hover:bg-yellow-300 hover:text-gray-700 focus:ring-1 focus:outline-none focus:ring-yellow font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                  >
                    Website <i className="fas fa-globe"></i>
                  </a>
                </div>
                <div className="flex items-center justify-between px-2 py-2">
                  <a
                    href="https://twitter.com/MiladyMaker333"
                    target="_blank"
                    className="text-light-green uppercase bg-gray hover:bg-yellow-300 hover:text-gray-700 focus:ring-1 focus:outline-none focus:ring-yellow font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                  >
                    Twitter <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <div className="flex items-center justify-between px-2 py-2">
                  <a
                    href="https://etherscan.io/address/0x5af0d9827e0c53e4799bb226655a1de152a425a5"
                    target="_blank"
                    className="text-light-green uppercase bg-gray hover:bg-yellow-300 hover:text-gray-700 focus:ring-1 focus:outline-none focus:ring-yellow font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                  >
                    Etherscan <i className="fas fa-globe"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </main>
    </div>
  );
}
