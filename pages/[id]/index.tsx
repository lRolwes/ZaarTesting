import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import { useRouter } from "next/router";
import axios from "axios";
import { BuyModal, Trait } from "@reservoir0x/reservoir-kit-ui";
import { getAccount } from "@wagmi/core";
import { config } from "./../../config";
import { FavStar } from "./../../components/FavStar";
import PriceChart from "./../../components/PriceChart";
import InfiniteScroll from "react-infinite-scroll-component";
import sdk from "@api/reservoirprotocol";
import { paths } from "@reservoir0x/reservoir-sdk";
import { reset } from "viem/actions";

type CollectionData = {
  createdAt: string;
  name: string;
  image: string;
  id: string;
  twitterUrl: string;
  discordUrl: string;
  externalUrl: string;
  description: string;
  tokenCount: string;
  contractKind: string;
  royalties: { bps: string };
  floorAsk: { price: { amount: { decimal: number } } };
  topBid: { price: { amount: { decimal: number } } };
  floorSaleChange: { "1day": number };
  volume: { "1day": number };
  volumeChange: { "1day": number };
};

const TopSection = ({ collectionData }: { collectionData: CollectionData }) => {
  const givenDate = new Date(
    collectionData?.createdAt ? collectionData.createdAt : ""
  );
  const currentDate = new Date();
  const differenceInMilliseconds = Number(currentDate) - Number(givenDate);
  const age = Math.floor(
    differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365.25
  );

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
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center rounded-sm cursor-pointer text-xs font-medium text-gray">
                    <FavStar
                      watchlist={{ address: [], authorAddress: "" }}
                      id={collectionData?.id}
                      onWatchlist={false}
                    />
                  </div>
                  <div>
                    <svg
                      onClick={() => {
                        navigator.clipboard.writeText(collectionData?.id);
                      }}
                      className="ml-3 cursor-pointer  text-gray hover:text-white"
                      aria-hidden="true"
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {collectionData?.discordUrl != null &&
                  collectionData?.discordUrl != "" ? (
                    <div className="ml-3 cursor-pointer">
                      <Link
                        className="text-gray hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={collectionData?.discordUrl}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M13.5447 2.77022C12.5249 2.3023 11.4313 1.95755 10.2879 1.76011C10.2671 1.75629 10.2463 1.76582 10.2356 1.78486C10.0949 2.03501 9.93915 2.36134 9.83006 2.61784C8.60027 2.43372 7.37679 2.43372 6.17221 2.61784C6.0631 2.35564 5.90166 2.03501 5.76038 1.78486C5.74966 1.76645 5.72886 1.75693 5.70803 1.76011C4.56527 1.95692 3.47171 2.30167 2.45129 2.77022C2.44246 2.77403 2.43488 2.78038 2.42986 2.78863C0.355594 5.88754 -0.212633 8.91028 0.0661201 11.8955C0.0673814 11.9101 0.0755799 11.9241 0.086932 11.933C1.45547 12.938 2.78114 13.5482 4.08219 13.9526C4.10301 13.9589 4.12507 13.9513 4.13832 13.9342C4.44608 13.5139 4.72043 13.0707 4.95565 12.6047C4.96953 12.5774 4.95628 12.545 4.92791 12.5342C4.49275 12.3692 4.0784 12.1679 3.67982 11.9393C3.64829 11.9209 3.64577 11.8758 3.67477 11.8543C3.75865 11.7914 3.84255 11.726 3.92264 11.66C3.93713 11.6479 3.95732 11.6454 3.97435 11.653C6.59286 12.8485 9.4277 12.8485 12.0153 11.653C12.0323 11.6447 12.0525 11.6473 12.0677 11.6593C12.1478 11.7254 12.2316 11.7914 12.3161 11.8543C12.3451 11.8758 12.3433 11.9209 12.3117 11.9393C11.9131 12.1723 11.4988 12.3692 11.063 12.5336C11.0346 12.5444 11.022 12.5774 11.0359 12.6047C11.2762 13.0701 11.5505 13.5132 11.8526 13.9335C11.8652 13.9513 11.8879 13.9589 11.9087 13.9526C13.2161 13.5482 14.5417 12.938 15.9103 11.933C15.9223 11.9241 15.9298 11.9108 15.9311 11.8962C16.2647 8.44488 15.3723 5.44693 13.5655 2.78926C13.5611 2.78038 13.5535 2.77403 13.5447 2.77022ZM5.34668 10.0778C4.55833 10.0778 3.90875 9.35406 3.90875 8.46521C3.90875 7.57635 4.54574 6.85259 5.34668 6.85259C6.15392 6.85259 6.79721 7.5827 6.78459 8.46521C6.78459 9.35406 6.14761 10.0778 5.34668 10.0778ZM10.6632 10.0778C9.87484 10.0778 9.22526 9.35406 9.22526 8.46521C9.22526 7.57635 9.86222 6.85259 10.6632 6.85259C11.4704 6.85259 12.1137 7.5827 12.1011 8.46521C12.1011 9.35406 11.4704 10.0778 10.6632 10.0778Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div />
                  )}

                  {collectionData?.twitterUrl != null &&
                  collectionData?.twitterUrl != "" ? (
                    <div className="ml-3 cursor-pointer">
                      <Link
                        className="text-gray hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={collectionData?.twitterUrl}
                      >
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M9.14163 7.19284L13.6089 2H12.5503L8.67137 6.50887L5.57328 2H2L6.68492 8.81821L2 14.2637H3.05866L7.15491 9.50218L10.4267 14.2637H14L9.14137 7.19284H9.14163ZM7.69165 8.87828L7.21697 8.19934L3.44011 2.79694H5.06615L8.11412 7.15685L8.5888 7.83579L12.5508 13.503H10.9248L7.69165 8.87854V8.87828Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div />
                  )}

                  {collectionData?.externalUrl != null &&
                  collectionData?.externalUrl != "" ? (
                    <div className="ml-3 cursor-pointer">
                      <Link
                        className="text-gray hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={collectionData?.externalUrl}
                      >
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                          />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-1 uppercase space-x-2">
                {collectionData?.contractKind?.substring(0, 3) == "erc" ? (
                  <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                    Ethereum
                  </span>
                ) : (
                  <div />
                )}
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  {collectionData?.tokenCount} ITEMS
                </span>
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  MINTED {age}Y AGO
                </span>
                <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                  {Number(collectionData?.royalties.bps) / 100}% CREATOR FEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavSection = ({ collectionData }: { collectionData: CollectionData }) => {
  const [activeTab, setActiveTab] = useState("items");
  function toggleTab(t: string) {
    setActiveTab(t);
  }
  return (
    <div>
      <div className="flex-1 flex justify-between gap-x-3 flex-wrap-reverse md:flex-nowrap uppercase px-6 md:px-0">
        <nav className="inline-flex overflow-x-auto max-w-screen hidescroll md:px-6 h-[35px]">
          <button
            className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab == "items" ? "bg-gray-200 text-yellow border-b-2" : "text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
            onClick={() => toggleTab("items")}
          >
            Items
          </button>
          <button
            className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 sm:hidden ${activeTab == "info" ? "bg-gray-200 text-yellow border-b-2" : "text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
            onClick={() => toggleTab("info")}
          >
            Info
          </button>
          <button
            className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab == "activity" ? "bg-gray-200 text-yellow border-b-2" : "text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
            onClick={() => toggleTab("activity")}
          >
            Activity
          </button>
          <button
            className={`uppercase tab-button cursor-pointer shrink-0 text-sm font-medium font-dm-sans whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3  ${activeTab == "traits" ? "bg-gray-200 text-yellow border-b-2" : "text-gray hover:text-white"} mr-2.5 last:mr-0 text-yellow border-yellow`}
            onClick={() => toggleTab("traits")}
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
                  <div className="truncate">
                    {collectionData?.floorAsk?.price?.amount?.decimal
                      ? collectionData.floorAsk.price.amount.decimal
                      : ""}
                  </div>
                </div>
              </span>
            </div>
            <span className="w-full flex-1 mr-3">
              <span
                className={`${Number(collectionData.floorSaleChange["1day"]) >= 0.0 ? "text-green-500" : "text-red"}`}
              >
                {Number(
                  Number(collectionData.floorSaleChange["1day"]).toFixed(2)
                )}
                %
              </span>
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
                  <div className="truncate">
                    {collectionData?.topBid?.price?.amount?.decimal
                      ? collectionData.topBid.price.amount.decimal
                      : ""}
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div className="flex px-1.5 last:pr-0 gap-1 whitespace-nowrap mr-3">
            24h Vol
            <span className="w-full mr-3">
              <div className="text-light-green font-medium inline-flex items-center max-w-full">
                <div className="truncate">
                  {Number(collectionData.volume["1day"]).toFixed(2)}
                </div>
              </div>
            </span>
            <span className="w-full">
              <span
                className={`${collectionData.volumeChange["1day"] >= 0.0 ? "text-green-500" : "text-red"}`}
              >
                {Number(collectionData.volumeChange["1day"]).toFixed(2)}%
              </span>
            </span>
          </div>
        </div>
      </div>
      {activeTab == "items" ? (
        <ItemsSection collectionData={collectionData} />
      ) : activeTab == "activity" ? (
        <ActivitySection id={collectionData.id.toString()} /> // Fix: Pass the id property as a string
      ) : activeTab == "traits" ? (
        <TraitsSection id={collectionData.id} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
const ItemsSection = ({
  collectionData,
}: {
  collectionData: CollectionData;
}) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  return (
    <div>
      <div
        className={`mx-auto p-2 pl-6 pr-6 md:flex md:items-center md:justify-between hidden sm:inline-block`}
      >
        {/* Description */}
        <div className="w-full flex flex-col">
          <p
            className={`md:flex-1 md:mr-4 text-gray ${isTextExpanded ? "" : "line-clamp-3"}`}
          >
            {collectionData.description}
          </p>
          <div
            className="text-white cursor-pointer"
            onClick={() => setIsTextExpanded(!isTextExpanded)}
          >
            {isTextExpanded ? "Show less" : "Show more"}
          </div>
        </div>
      </div>
      <FilterSection
        id={collectionData.id}
        count={Number(collectionData.tokenCount)}
      />
    </div>
  );
};
const TraitsSection = ({id}:{id:string}) => {
  const [traitData, setTraitData] = useState<TraitCategoryType[]>([]);

  useEffect(() => {
    async function traitLookup<TraitCategoryType>(): Promise<
      TraitCategoryType[]
    > {
      let lookupString = `https://api.reservoir.tools/collections/${id}/attributes/all/v4`;
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          //accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try {
        const response = await axios.request(options);
        return response.data.attributes;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    async function traitMetadataLookup<TraitCategoryType>(key:string): Promise<
      TraitCategoryType[]
    > {
      let lookupString = `https://api.reservoir.tools/collections/${id}/attributes/explore/v5?attributeKey=${key}&limit=500`;
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try {
        const response = await axios.request(options);
        return response.data.attributes;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    if (id) {
      const fetchTraitData = async () => {
        const traits = await traitLookup<TraitCategoryType>();
        for(let category in traits){
          let values = await traitMetadataLookup<TraitType>(traits[category].key);
          traits[category].values = values;
        }
        setTraitData(traits);
      }
      fetchTraitData();
    }
  }, [id]);
  return (
  <div className="px-6 flex flex-col">
    {traitData.map((category, index) => {
    return(
    <div className = " ml-3 text-xl text-white mb-8 " key={index}> <p className="font-bold">{category.key}{" ("+category.attributeCount+")"}</p>
    <div className="grid grid-cols-6">
      {category.values.map((trait, index) => {return(
      <div key={index} className="flex flex-row p-2" >
        <Image
          src={trait.sampleImages[0]}
          width={100}
          height={100}
          alt="img"
        />
        <div className="ml-4 flex flex-col">
        <div>{trait.value}</div>
        <div>{trait.floorAskPrices[0]}</div>
        <div>{trait.tokenCount}</div>

        </div>
      </div>
      );})}

      </div>
    </div>);
  })}

  </div>);
};
const ActivitySection = ({id}:{id:string}) => {
  const [activityData, setActivityData] = useState<ActivityType[]>([]);
  const [filteredActivityData, setFilteredActivityData] = useState<ActivityType[]>();
  const [listing, setListing] = useState(true);
  const [transfer, setTransfer] = useState(true);
  const [mint, setMint] = useState(true);
  const [sale, setSale] = useState(true);
  const [bid, setBid] = useState(true);
  const [markets, setMarkets] = useState({
    OpenSea: true,
    LooksRare: true,
    Blur: true,
    NFTX: true,
    SudoSwap: true,
    MagicEden: true,
  });
  const [eventsDropdown, setEventsDropdown] = useState(false);
  const [marketsDropdown, setMarketsDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpenseaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, OpenSea: value }));
  };
  const handleLooksRareChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, LooksRare: value }));
  };
  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, Blur: value }));
  };
  const handleNFTXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, NFTX: value }));
  };
  const handleSudoSwapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, SudoSwap: value }));
  };
  const handleMagicEdenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, MagicEden: value }));
  };
  const resetFilters = () => {
    setListing(true);
    setSale(true);
    setTransfer(true);
    setMint(true);
    setMarkets({
      OpenSea: true,
      LooksRare: true,
      Blur: true,
      NFTX: true,
      SudoSwap: true,
      MagicEden: true,
    });
  };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    //value = encodeURIComponent(value);
    setSearch(value);
  };
  useEffect(() => {
    async function nftLookup() {
      let cont = "";
      let lookupString = `https://api.reservoir.tools/collections/activity/v6?collection=${id}`;
      let eventArray: ActivityType[] = [];
      let count = 0;
      const options = {method: 'GET', headers: {accept: '*/*', 'x-api-key': 'f1bc813b-97f8-5808-83de-1238af13d6f9'}};

      while (cont != null && count < 10) {
        count = count+1;
        let newString = lookupString;
        if (cont != "") {
          newString = newString + `&continuation=${cont}`;
        }
        const res = await fetch(`${newString}`, options);
        const data = await res.json();
        eventArray = [...eventArray, ...data.activities];
        cont = data.continuation;
      }
      return eventArray;
    }

    if (id) {
      const fetchNftData = async () => {
        let data = await nftLookup();
        setActivityData(data);
      };
      fetchNftData();
    }
  },[id]);
  useEffect(() => {
    let data = activityData;
    if (search != "") {
      data = data.filter((item) => {
        return item.token?.tokenId?.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (!listing) {
      data = data.filter((item) => {
        return item.type != "list" && item.type != "ask";
      });
    }
    if (!bid) {
      data = data.filter((item) => {
        return item.type != "bid" && item.type != "bid_cancel";
      });
    }
    if (!mint) {
      data = data.filter((item) => {
        return item.type != "mint";
      });
    }
    if (!transfer) {
      data = data.filter((item) => {
        return item.type != "transfer";
      });
    }
    if (!sale) {
      data = data.filter((item) => {
        return item.type != "sale";
      });
    }
    if (!markets.OpenSea) {
      data = data.filter((item) => {
        return item.order?.source?.name != "OpenSea";
      });
    }
    if (!markets.Blur) {
      data = data.filter((item) => {
        return item.order?.source?.name != "Blur";
      });
    }
    if (!markets.LooksRare) {
      data = data.filter((item) => {
        return item.order?.source?.name != "LooksRare";
      });
    }
    if (!markets.NFTX) {
      data = data.filter((item) => {
        return item.order?.source?.name != "NFTX";
      });
    }
    if (!markets.SudoSwap) {
      data = data.filter((item) => {
        return item.order?.source?.name != "SudoSwap";
      });
    }
    if (!markets.MagicEden) {
      data = data.filter((item) => {
        return item.order?.source?.name != "MagicEden";
      });
    }
    setFilteredActivityData(data);
  },[activityData, search, listing, bid, mint, transfer, sale, markets]);

  return (
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
                      <input
                        placeholder="Search for items"
                        type="text"
                        className="bg-transparent text-sm w-full outline-none px-2.5 text-gray placeholder-gray-500"
                        onChange={handleSearchInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional filters for larger screens */}
              <div className="hidden lg:flex gap-1.5 items-center mt-2">
                {/* Event filter */}
                <div className="relative">
                <div
                  className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
                  onClick={() => {
                    setEventsDropdown(!eventsDropdown);
                    setMarketsDropdown(false);
                  }}
                >
                  Event
                  {eventsDropdown ? (
                    <FaChevronUp className="text-gray ml-1" />
                  ) : (
                    <FaChevronDown className="text-gray ml-1" />
                  )}
                </div>
                <div
                  className={`absolute right-0 dropdown-content w-[200px] z-30 mt-1 ${eventsDropdown ? "block" : "hidden"}`}
                >
                  <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                    {/* Market Options with additional data */}
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={listing}
                        onChange={()=>{setListing(!listing)}}
                      />
                      Listing <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={bid}
                        onChange={()=>{setBid(!bid)}}
                      />
                      Bid <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={sale}
                        onChange={()=>{setSale(!sale)}}
                      />
                      Sale <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={transfer}
                        onChange={()=>{setTransfer(!transfer)}}
                      />
                      Transfer <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={mint}
                        onChange={()=>{setMint(!mint)}}
                      />
                      Mint <span className="text-xs text-gray ml-1"></span>
                    </label>
                  </div>
                  </div>
                </div>
                {/* Market filter */}
                <div className="relative">
                <div
                  className="border rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
                  onClick={() => {
                    setMarketsDropdown(!marketsDropdown);
                    setEventsDropdown(false);
                  }}
                >
                  Market
                  {marketsDropdown ? (
                    <FaChevronUp className="text-gray ml-1" />
                  ) : (
                    <FaChevronDown className="text-gray ml-1" />
                  )}
                </div>
                <div
                  className={`absolute right-0 dropdown-content w-[200px] z-30 mt-1 ${marketsDropdown ? "block" : "hidden"}`}
                >
                  <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                    {/* Market Options with additional data */}
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.OpenSea}
                        onChange={handleOpenseaChange}
                      />
                      OpenSea <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.LooksRare}
                        onChange={handleLooksRareChange}
                      />
                      LooksRare <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.Blur}
                        onChange={handleBlurChange}
                      />
                      Blur <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.NFTX}
                        onChange={handleNFTXChange}
                      />
                      NFTX <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.SudoSwap}
                        onChange={handleSudoSwapChange}
                      />
                      Sudoswap <span className="text-xs text-gray ml-1"></span>
                    </label>
                    <label className="block cursor-pointer px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-yellow mr-2"
                        checked={markets.MagicEden}
                        onChange={handleMagicEdenChange}
                      />
                      MagicEden <span className="text-xs text-gray ml-1"></span>
                    </label>
                    {/* Add other options similarly */}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap ml-6 sm:ml-4 md:pl-2">
        {!markets.Blur || !markets.LooksRare || !markets.MagicEden || !markets.NFTX || !markets.OpenSea || !markets.SudoSwap ?
          <div className="flex flex-row gap-2">
            {markets.Blur ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">Blur</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, Blur: false }))}}>
                X
            </span>
          </button> : null}
          {markets.OpenSea ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">OpenSea</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, OpenSea: false }))}}>
                X
            </span>
          </button> : null}
          {markets.LooksRare ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">LooksRare</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, LooksRare: false }))}}>
                X
            </span>
          </button> : null}
          {markets.NFTX ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">NFTX</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, NFTX: false }))}}>
                X
            </span>
          </button> : null}
          {markets.SudoSwap ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">SudoSwap</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, SudoSwap: false }))}}>
                X
            </span>
          </button> : null}
          {markets.MagicEden?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Market</span>
            <span className="capitalize text-light-green mr-1 ml-1">MagicEden</span>
            <span
                onClick={()=>{setMarkets((prevMarkets) => ({ ...prevMarkets, MagicEden: false }))}}>
                X
            </span>
          </button> : null}
          </div>
          : null}
        {sale && !(listing && sale && transfer && mint && bid) ?
          <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
            <span className="text-gray capitalize">Event</span>
            <span className="capitalize text-light-green mr-1 ml-1">Sale</span>
            <span
                onClick={()=>{setSale(false)}}>
                X
            </span>
          </button> : null}
            {listing && !(listing && sale && transfer &&mint && bid) ?
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
              <span className="text-gray capitalize">Event</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Listing
              </span>
              <span
                onClick={()=>{setListing(false)}}>
                X
              </span>
            </button>
            : null}
            {transfer && !(listing && sale && transfer &&mint && bid) ?
            <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
              <span className="text-gray capitalize">Event</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Transfer
              </span>
              <span
                onClick={()=>{setTransfer(false)}}>
                X
              </span>
            </button>: null}
          {mint && !(listing && sale && transfer && mint && bid) ?
             <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
              <span className="text-gray capitalize">Event</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Mint
              </span>
              <span
                onClick={()=>{setMint(false)}}>
                X
              </span>
            </button>
            : null}
          {bid && !(listing && sale && transfer && mint && bid) ?
             <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
              <span className="text-gray capitalize">Event</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Bid
              </span>
              <span
                onClick={()=>{setBid(false)}}>
                X
              </span>
            </button>
            : null}
          <div
            className="inline-block text-xs cursor-pointer text-blue my-1"
            onClick={()=>{resetFilters()}}
          >
            Clear
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap ml-2 mr-2 md:ml-6 md:pl-1 md:mr-8 mt-3">
          {/*Table*/}
          <div className="overflow-x-auto rounded-lg w-full min-h-[500px]">
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
                {filteredActivityData && filteredActivityData.map((item, index) => {
                return(
                    <tr key={index} className="dark-gray-hover cursor-pointer">
                    <td className="px-4 py-4 flex items-center">
                      <div className="bg-black border border-dark-gray-all w-[30px] h-[30px] mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                        {item.order?.source?.icon && <Image
                          width={160}
                          height={160}
                          className="w-7 h-7 object-cover rounded-sm"
                          src={item.order.source.icon}
                          alt="Blur"
                        />}
                      </div>
                      {item.type}

                    </td>
                    <td className="px-2 py-0 text-right">
                      <div
                        className="flex items-center text-sm overflow-hidden last:pr-4"
                        role="cell"
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center w-full overflow-hidden">
                            <div className="mr-2">
                              <div className="relative overflow-hidden rounded-sm w-[30px] h-[30px]">
                                {item.token.tokenImage && <Image
                                  width={160}
                                  height={160}
                                  alt="NFT Image"
                                  className="object-cover w-full"
                                  src={item.token.tokenImage}
                                />}{" "}
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <div className="text-sm text-gray">{item?.token?.tokenName? item.token.tokenName: null}</div>
                              </div>
                              <div className="inline-block">
                                <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                                  <div className="text-light-green text-xs">
                                    <div> {item.token?.rarityScore? item.token.rarityScore : null}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.price?.amount?.decimal? item.price.amount.decimal : null} <i className="fab fa-ethereum"></i>
                      <br />
                      <span className="text-xs text-gray">36% above floor</span>
                    </td>
                    <td className="px-6 py-4 text-right text-light-green">
                      <div className="truncate undefined">{item.fromAddress? item.fromAddress.slice(0,4)+"..."+item.fromAddress.slice(-4) : null}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-green-500">
                      <div >{item.toAddress? item.toAddress.slice(0,4)+"..."+item.toAddress.slice(-4) : null}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                    {item.timestamp ? (() => {
    const diffInMinutes = Math.floor((new Date().getTime() - new Date(item.timestamp * 1000).getTime()) / (1000 * 60));
    if (diffInMinutes < 60) {
      return diffInMinutes + "M ago";
    } else {
      return Math.floor(diffInMinutes / 60) + "H ago";
    }
  })() : null
  }
                      <br />
                      <span className="text-xs text-gray">{item.timestamp ? new Date(item.timestamp * 1000).toLocaleString() : null}</span>
                    </td>
                  </tr>
                  );
                  })}
                  
                              
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
type TokenType = {
  market: {
    floorAsk: {
      price: {
        amount: {
          decimal: number;
          usd: number;
        };
      };
      source: {
        domain: string;
      };
      validFrom: number;
      validUntil: number;
    };
    topBid: {
      price: {
        amount: {
          decimal: number;
        };
      };
    };
  };
  token: {
    tokenId: string;
    rarity: string;
    image: string;
    name: string;
    attributes: TraitType[];
    lastSale: {
      price: {
        amount: {
          decimal: number;
        };
      };
      timestamp: number;
    };
    owner: string;
    collection: {
      id: string;
      name: string;
      creator: string;
      tokenCount: number;
      floorAskPrice: {
        amount: {
          decimal: number;
        };
      };
    };
  };
};
type TraitType = {
  key: string;
  value: string;
  tokenCount: number;
  count: number;
  floorAskPrice: {
    amount: {
      decimal: number;
      usd: number;
    };
  };
  sampleImages: string[];
  floorAskPrices: number[];
};
type TraitCategoryType = {
  key: string;
  attributeCount: number;
  values: TraitType[];
};
function TokenCard({
  collectionId,
  setDetailsToken,
  setDetailsModal,
  nft,
}: {
  collectionId: string;
  setDetailsToken: (detailsToken: TokenType) => void;
  setDetailsModal: (detailsModal: boolean) => void;
  nft: TokenType;
}) {
  return (
    <div className="bg-dark-gray text-white rounded-xl flex flex-col border border-transparent hover:border-gray-700 group relative overflow-hidden">
      <div className="px-3 py-1.5">
        <span className="text-light-green text-xs font-medium">
          Rarity #{nft.token.rarity}
        </span>
      </div>
      <div className="flex-1 relative flex justify-center items-center">
        <div className="object-cover">
          {nft.token.image != " " ? (
            <Image
              src={
                nft.token.image
                  ? nft.token.image.toString()
                  : "/images/img-placeholder.png"
              }
              alt="Token"
              style={{ objectFit: "cover" }}
              className="responsive"
              width={350}
              height={260}
            />
          ) : (
            <div className="object-cover w-[350px] h-[260px] bg-gray-200"></div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-2">
        <a className="mb-1.5 flex items-center gap-1 hover:text-blue" href="#">
          {nft.token.name}
        </a>
        <div className="flex justify-between items-center mb-1 relative">
          <button
            type="button"
            className="flex items-center justify-center px-2 py-1.5 text-xs font-medium text-light-green border border-dark-gray-all gray hover:border-gray-400 rounded"
          >
            {nft.market?.floorAsk?.price?.amount?.decimal?.toString()} ETH
          </button>
          <a
            id="btn"
            className="border font-medium text-xs text-light-green border-dark-gray-all rounded hover:bg-gray hover:text-white hover:border-gray-400 px-1.5 h-6 flex items-center cursor-pointer"
            onClick={() => {
              setDetailsToken(nft);
              setDetailsModal(true);
            }}
          >
            Details
          </a>
        </div>
        <div className="flex justify-between">
          <div className="text-xs -mx-3 mb-2 px-3 py-1 text-light-green flex items-center">
            Last{" "}
            {nft.token.lastSale?.price?.amount?.decimal != undefined
              ? nft.token.lastSale?.price?.amount?.decimal + " "
              : "-- "}
            ETH
            <i className="fas fa-history ml-1"></i>
          </div>
        </div>
      </div>
      {/* Buy Now Button */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform">
        {nft.market?.floorAsk ? (
          <BuyModal
            trigger={
              <button className="w-full py-2 bg-yellow text-black uppercase text-sm font-bold rounded-b-xl hover:bg-yellow-600">
                Buy Now
              </button>
            }
            token={collectionId + ":" + nft.token.tokenId}
            onConnectWallet={() => {
              console.log("Connected");
            }}
            onPurchaseComplete={(data) => console.log("Purchase Complete")}
            onPurchaseError={(error, data) =>
              console.log("Transaction Error", error, data)
            }
            onClose={(data, stepData, currentStep) =>
              console.log("Modal Closed")
            }
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function FilterSection({ id, count }: { id: string; count: number }) {
  //stores raw token Data
  const [tokenData, setTokenData] = useState<TokenType[]>([]);
  //stores filtered token data
  const [filteredTokenData, setFilteredTokenData] = useState<TokenType[]>([]);
  //stores if details modal is expanded or any token
  const [detailsModal, setDetailsModal] = useState(false);
  //sets the token to be displayed in the details modal
  const [detailsToken, setDetailsToken] = useState<TokenType>();
  //user account address
  const account = getAccount(config);
  /*State Variables for traits and Trait Filters*/
  //Raw Trait data from ReservoirKit, an array of objects
  const [traitData, setTraitData] = useState<TraitCategoryType[]>([]);
  //state variable to store whether or not the traits dropdown is open
  const [traitsOpen, setTraitsOpen] = useState(false);
  //State variable for the selected trait category in Trait Filter Dropdown
  const [selectedTraitCategory, setSelectedTraitCategory] =
    useState<string>("all");
  //State varaiable to store whether each individual Trait Category dropdown in the section is open
  const [traitCategoryDropdown, setTraitCategoryDropdown] = useState<
    Record<string, boolean>
  >({});
  //store whether any trait filters are applied
  const [traitFilterApplied, setTraitFilterApplied] = useState(false);
  //store selected filters
  const [traitFilterSelection, setTraitFilterSelection] = useState<
    Record<string, boolean>
  >({});
  //store ordering direction of filter Category
  const [traitOrderDirection, setTraitOrderDirection] =
    useState<string>("Most");
  //string to search for traits
  const [traitSearch, setTraitSearch] = useState("");

  //Other filters
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("floorAskPrice");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [activeStatus, setActiveStatus] = useState("show_all");
  const [price, setPrice] = useState(false);
  const [priceFloor, setPriceFloor] = useState(0);
  const [priceCeiling, setPriceCeiling] = useState(1000000);
  const [activePriceFloor, setActivePriceFloor] = useState(0);
  const [activePriceCeiling, setActivePriceCeiling] = useState(10000);
  const [rarity, setRarity] = useState(false);
  const [activeRarityFloor, setActiveRarityFloor] = useState(0);
  const [activeRarityCeiling, setActiveRarityCeiling] = useState(10000);
  const [rarityFloor, setRarityFloor] = useState(1);
  const [rarityCeiling, setRarityCeiling] = useState(10000);
  const [market, setMarket] = useState(false);
  const [markets, setMarkets] = useState({
    OpenSea: true,
    LooksRare: true,
    Blur: true,
    NFTX: true,
    SudoSwap: true,
    MagicEden: true,
  });
  const [myItems, setMyItems] = useState(false);
  //values for the infinite scroll table
  const [data, setData] = useState<TokenType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(50);

  //handler functions to help interact with filters
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    //value = encodeURIComponent(value);
    setSearch(value);
  };
  const handleTraitSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    value = encodeURIComponent(value);
    setTraitSearch(value);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveStatus(event.target.value);
  };
  const handlePriceFloorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    let numVal = Number(value);
    setPriceFloor(numVal);
  };
  const handlePriceCeilingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    let numVal = Number(value);
    setPriceCeiling(numVal);
  };
  const handleActivePriceChange = () => {
    setActivePriceCeiling(priceCeiling);
    setActivePriceFloor(priceFloor);
  };
  const handleRarityFloorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    let numVal = Number(value);
    setRarityFloor(numVal);
  };
  const handleRarityCeilingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    let numVal = Number(value);
    setRarityCeiling(numVal);
  };
  const handleActiveRarityChange = () => {
    setActiveRarityCeiling(rarityCeiling);
    setActiveRarityFloor(rarityFloor);
  };
  const handleOpenseaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, OpenSea: value }));
  };
  const handleLooksRareChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, LooksRare: value }));
  };
  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, Blur: value }));
  };
  const handleNFTXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, NFTX: value }));
  };
  const handleSudoSwapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, SudoSwap: value }));
  };
  const handleMagicEdenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.checked;
    setMarkets((prevMarkets) => ({ ...prevMarkets, MagicEden: value }));
  };

  /*
  This function:
  - reverses the value of the changed trait filter
  - if it is now applied it makes sure that the trait filter is applied
  - if not, it checks if any filters are selected
  - if no filters are selected, it sets the trait filter to not applied
  */

  function handleTraitFilterSelectionChange(value: string) {
    setTraitFilterSelection((prevState) => ({
      ...prevState,
      [value]: !traitFilterSelection[value],
    }));
    if (traitFilterSelection[value] !== true) {
      setTraitFilterApplied(true);
    } else {
      let applied = false;
      for (let key in traitFilterSelection) {
        if (key != value && traitFilterSelection[key] == true) {
          applied = true;
        }
      }
      if (!applied) {
        setTraitFilterApplied(false);
      }
    }
  }

  /*function to reset all trait filters to false and turn off the trait filter*/
  function resetTraitFilters() {
    for (let key in traitFilterSelection) {
      setTraitFilterSelection((prevState) => ({
        ...prevState,
        [key]: false,
      }));
    }
    setTraitFilterApplied(false);
    setTraitSearch("");
  }
  const fetchMoreData = async () => {
    setEndIndex(endIndex + 10);
    setStartIndex(startIndex + 10);
    const newData = filteredTokenData.slice(startIndex, endIndex);

    if (newData.length === 0) {
      setHasMore(false);
      return;
    }
    setData((prevData) => [...prevData, ...newData]);
  };
  // UseEffect to get and store all tokens in the collection and store in tokenData
  useEffect(() => {
    async function nftLookup() {
      let lookupString = `https://api.reservoir.tools/tokens/v7?collection=${id}`;
      if(search != "") {
        lookupString += `&tokenName=${search}`;
      }
      if (activePriceFloor > 0) {
        lookupString += `&minFloorAskPrice=${activePriceFloor}`;
      }
      if (activePriceCeiling < 10000) {
        lookupString += `&maxFloorAskPrice=${activePriceCeiling}`;
      }
      if (activeRarityFloor >= 1 && activePriceFloor <=0 && activePriceCeiling >= 10000) {
        lookupString += `&minRarityRank=${activeRarityFloor}`;
      }
      if (activeRarityCeiling < 10000 && activePriceFloor <=0 && activePriceCeiling >= 10000) {
        lookupString += `&maxRarityRank=${activeRarityCeiling}`;
      }
      if (sort == "floorAskPrice") {
        lookupString+="&sortBy=floorAskPrice"
      }
      if (sort == "rarity") {
        lookupString+="&sortBy=rarity"
      }
      if (sort == "listedAt"){
        lookupString+="&sortBy=listedAt"
      }
      if (sortDirection == "desc") {
        lookupString+="&sortDirection=desc"
      }
      if (traitFilterApplied) {
        for (let attribute in traitFilterSelection) {
          if(traitFilterSelection[attribute]){
            let parts = attribute.split(":");
            lookupString += `&attributes[${parts[0]}]=${parts[1]}`
          }
        }
      }
      lookupString += "&includeTopBid=true&includeLastSale=true&includeAttributes=true&limit=100";
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try{
      const response = await axios.request(options);
      const data = response.data;
      console.log(response.data);
      return data.tokens;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    }

    if (id) {
      const fetchNftData = async () => {
        let nftData = await nftLookup();
        setTokenData(nftData);
      };
      fetchNftData();
    }
  }, [id, count, search, sort, sortDirection, activePriceFloor, activePriceCeiling, activeRarityFloor, activeRarityCeiling, traitFilterApplied, traitFilterSelection]);

  useEffect(() => {
    let nftData = tokenData;
    if (activeStatus == "buy_now" && nftData.length > 0) {
      nftData = nftData.filter(
        (item: TokenType) => item.market?.floorAsk?.price?.amount?.decimal > 0
      );
    }
    if (!markets.OpenSea && nftData.length > 0) {
      nftData = nftData.filter(
        (item: TokenType) => item.market.floorAsk.source.domain != "opensea.io"
      );
    }
    if (!markets.Blur && nftData.length > 0) {
      nftData = nftData.filter(
        (item: TokenType) => item.market.floorAsk.source.domain != "blur.io"
      );
    }
    if (!markets.LooksRare && nftData.length > 0) {

      nftData = nftData.filter(
        (item: TokenType) =>
          item.market.floorAsk.source.domain != "looksrare.org"
      );
    }
    if (!markets.NFTX && nftData.length > 0) {

      nftData = nftData.filter(
        (item: TokenType) => item.market.floorAsk.source.domain != "nftx.io"
      );
    }
    if (!markets.SudoSwap && nftData.length > 0) {
      nftData = nftData.filter(
        (item: TokenType) =>
          item.market.floorAsk.source.domain != "sudoswap.xyz"
      );
    }
    if (!markets.MagicEden && nftData.length > 0) {
      nftData = nftData.filter(
        (item: TokenType) =>
          item.market.floorAsk.source.domain != "magiceden.io"
      );
    }
    /*
    if (traitFilterApplied) {
      for (let attribute in traitFilterSelection) {
        if (traitFilterSelection[attribute] && nftData.length > 0) {
          nftData = nftData.filter((item: TokenType) =>
            item.token.attributes?.some((trait) => trait.value == attribute)
          );
        }
      }
    }
    */
    if (myItems && nftData.length > 0) {
      if (account.address != undefined) {
        nftData = nftData.filter(
          (item: TokenType) => item.token.owner == account.address
        );
      } else {
        nftData = [];
      }
    }
    
    setFilteredTokenData(nftData);
  }, [
    tokenData,
    id,
    search,
    sort,
    sortDirection,
    activePriceFloor,
    activePriceCeiling,
    activeRarityFloor,
    activeRarityCeiling,
    markets,
    traitFilterSelection,
    traitFilterApplied,
    activeStatus,
    myItems,
    account.address,
  ]);
  //useEffect for loading traits for collections
  useEffect(() => {
    async function traitLookup<TraitCategoryType>(): Promise<
      TraitCategoryType[]
    > {
      let lookupString = `https://api.reservoir.tools/collections/${id}/attributes/all/v4`;
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try {
        const response = await axios.request(options);
        return response.data.attributes;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    if (id) {
      const fetchTraitData = async () => {
        const traits = await traitLookup<TraitCategoryType>();
        if (traitSearch != "") {
          for (let attribute in traits) {
            let filteredValues = traits[attribute].values.filter((item) =>
              item.value.toLowerCase().includes(traitSearch.toLowerCase())
            );
            if (filteredValues.length! > 0) {
              traits[attribute].values = filteredValues;
            } else {
              delete traits[attribute];
            }
          }
        }
        setTraitData(traits);

        //initialize trait categories
        for (let attribute in traits) {
          setTraitCategoryDropdown((prevState) => ({
            ...prevState,
            [attribute]: false,
          }));
          for (let value in traits[attribute].values) {
            setTraitFilterSelection((prevState) => ({
              ...prevState,
              [attribute+":"+value]: false,
            }));
          }
        }
      };
      fetchTraitData();
    }
  }, [
    id,
    setTraitData,
    setTraitCategoryDropdown,
    traitOrderDirection,
    traitSearch,
  ]);
  //useEffect for sorting and filtering traits
  useEffect(() => {
    function TraitCompare(a: TraitCategoryType, b: TraitCategoryType) {
      if (traitOrderDirection == "Least") {
        if (a.attributeCount < b.attributeCount) {
          return -1;
        }
        if (a.attributeCount > b.attributeCount) {
          return 1;
        }
        return 0;
      } else if (traitOrderDirection == "Most") {
        if (a.attributeCount > b.attributeCount) {
          return -1;
        }
        if (a.attributeCount < b.attributeCount) {
          return 1;
        }
        return 0;
      }
      return 0;
    }
    let traits = traitData;
    traits.sort((a, b) => TraitCompare(a, b));
    setTraitData(traits);
  }, [traitOrderDirection, traitData]);

  return (
    <div>
      <div className="flex-1 pt-3 pb-2 md:pt-3 md:pb-3 flex gap-2 border-gray-200 md:mx-6 z-3 px-6 md:px-0">
        <div className="flex-col-reverse sm:flex-row-reverse lg:flex-row flex w-full gap-1.5 items-center lg:justify-between">
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative w-full sm:w-auto">
              {/* Lowest Price Filter Dropdown Container */}
              <div className="relative">
                <button
                  onClick={() => {
                    setSortOpen(!sortOpen);
                  }}
                >
                  {/* Trigger */}
                  <div className="text-white cursor-pointer truncate border border-dark-gray-all rounded-sm flex justify-between items-center text-sm px-4 h-10 bg-black text-gray outline-none focus:outline-none h-[50px] text-white">
                    {sort == "floorAskPrice"
                      ? sortDirection == "asc"
                        ? "Lowest Price"
                        : "Highest Price"
                      : sort == "listedAt"
                        ? "Recently Listed"
                        : sort == "rarity"
                          ? sortDirection == "desc"
                            ? "Common to Rarest"
                            : "Rarest to Common"
                          : "NA"}
                    {sortOpen ? (
                      <FaChevronUp className="text-gray-400 ml-2" />
                    ) : (
                      <FaChevronDown className="text-gray-400 ml-2" />
                    )}
                  </div>
                </button>

                {/* Dropdown Content */}
                <div
                  className={` ${sortOpen ? " " : "hidden "} absolute w-50 mt-1 z-30`}
                >
                  <div className="bg-dark-gray mt-2 text-white rounded-sm shadow-lg">
                    {/* Dropdown Options */}
                    <button
                      onClick={() => {
                        setSort("floorAskPrice");
                        setSortDirection("asc");
                        setSortOpen(false);
                      }}
                      className={`w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left ${sort == "floorAskPrice" && sortDirection == "asc" ? "text-yellow" : ""}`}
                    >
                      Lowest Priced
                    </button>
                    <button
                      onClick={() => {
                        setSort("floorAskPrice");
                        setSortDirection("desc");
                        setSortOpen(false);
                      }}
                      className={`w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left ${sort == "floorAskPrice" && sortDirection == "desc" ? "text-yellow" : ""}`}
                    >
                      Highest Price
                    </button>
                    <button
                      onClick={() => {
                        setSort("listedAt");
                        setSortDirection("asc");
                        setSortOpen(false);
                      }}
                      className={`w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left ${sort == "listedAt" && sortDirection == "asc" ? "text-yellow" : ""}`}
                    >
                      Recently Listed
                    </button>
                    <button
                      onClick={() => {
                        setSort("rarity");
                        setSortDirection("desc");
                        setSortOpen(false);
                      }}
                      className={`block cursor-pointer px-4 py-2 hover:bg-gray text-left ${sort == "rarity" && sortDirection == "desc" ? "text-yellow" : ""}`}
                    >
                      Common to Rarest
                    </button>
                    <button
                      className={`w-full block cursor-pointer px-4 py-2 hover:bg-gray text-left ${sort == "rarity" && sortDirection == "asc" ? "text-yellow" : ""}`}
                      onClick={() => {
                        setSort("rarity");
                        setSortDirection("asc");
                        setSortOpen(false);
                      }}
                    >
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
                <input
                  type="text"
                  placeholder="Search for tokens"
                  onChange={handleSearchInputChange}
                  className=" border-2 border-dark-gray border-l border-r border-t bg-black w-full px-4 py-2 rounded-sm bg-black text-white placeholder-gray-50 focus:outline-none ml-2 h-[50px]"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Additional filters for larger screens */}
        <div className="hidden lg:flex gap-1.5 items-center">
          {/* Status filter */}
          <div className="relative mb-4">
            <div
              onClick={() => {
                setStatus(!status);
              }}
              className="cursor-pointer bg-black text-white border hover:bg-slate-800 border-gray rounded px-4 flex justify-between items-center h-[50px]"
            >
              Status
              {status ? (
                <FaChevronUp className="text-gray-400 ml-2" />
              ) : (
                <FaChevronDown className="text-gray-400 ml-2" />
              )}
            </div>
            <div
              className={`absolute dropdown-content w-[150px] bg-light-gray z-30 mt-1 ${status ? "" : "hidden"} z-30`}
            >
              <div className="bg-gray text-light-green rounded-sm">
                <label className="block cursor-pointer px-4 py-2 pl-0">
                  <input
                    type="radio"
                    name="status"
                    value="buy_now"
                    className=" ml-2 form-radio accent-yellow mr-2"
                    onChange={handleStatusChange}
                    checked={activeStatus === "buy_now"}
                  />
                  Buy Now
                </label>
                <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                  <input
                    type="radio"
                    name="status"
                    value="show_all"
                    className="ml-2 form-radio accent-yellow mr-2"
                    onChange={handleStatusChange}
                    checked={activeStatus === "show_all"}
                  />
                  Show All
                </label>
              </div>
            </div>
          </div>

          {/* Price filter */}
          <div className="relative mb-4">
            <div
              onClick={() => {
                setPrice(!price);
              }}
              className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-[50px] "
            >
              Price
              {price ? (
                <FaChevronUp className="text-gray-400 ml-2" />
              ) : (
                <FaChevronDown className="text-gray-400 ml-2" />
              )}
            </div>
            <div
              className={`absolute bg-gray dropdown-content w-[200px] z-30 mt-1 ${price ? "  " : "hidden"}`}
            >
              <div className="w-full flex items-center justify-center space-x-2 px-4 py-2 pl-0 pr-0">
                {/* Min Input */}
                <input
                  type="text"
                  placeholder="Min"
                  onChange={handlePriceFloorChange}
                  className="w-[75px] bg-black text-white border border-gray rounded px-4 py-2 focus:outline-none"
                />

                {/* Max Input */}
                <input
                  type="text"
                  placeholder="Max"
                  onChange={handlePriceCeilingChange}
                  className="w-[75px] bg-black text-white border border-gray rounded px-4 py-2 focus:outline-none"
                />

                {/* Currency Dropdown */}
                <SiEthereum className="text-white" />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    handleActivePriceChange();
                  }}
                  className="px-2 py-2 bg-yellow text-black font-bold rounded-sm text-xs uppercase mr-2 mb-2"
                >
                  <span className="inline-block whitespace-nowrap">Apply</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rarity filter */}
          <div className="relative mb-4">
            <div
              onClick={() => {
                setRarity(!rarity);
              }}
              className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-[50px] "
            >
              Rarity
              {rarity ? (
                <FaChevronUp className="text-gray-400 ml-2" />
              ) : (
                <FaChevronDown className="text-gray-400 ml-2" />
              )}
            </div>
            <div
              className={`absolute bg-gray dropdown-content w-[200px] z-30 mt-1 ${rarity ? "  " : "hidden"}`}
            >
              <div className="w-full flex items-center justify-center space-x-2 px-4 py-2 pl-0 pr-0">
                {/* Min Input */}
                <input
                  type="text"
                  placeholder="Min"
                  onChange={handleRarityFloorChange}
                  className="w-[75px] bg-black text-white border border-gray rounded px-4 py-2 focus:outline-none"
                />

                {/* Max Input */}
                <input
                  type="text"
                  placeholder="Max"
                  onChange={handleRarityCeilingChange}
                  className="w-[75px] bg-black text-white border border-gray rounded px-4 py-2 focus:outline-none"
                />

                {/* Currency Dropdown */}
                <SiEthereum className="text-white" />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    handleActiveRarityChange();
                  }}
                  className="px-2 py-2 bg-yellow text-black font-bold rounded-sm text-xs uppercase mr-2 mb-2"
                >
                  <span className="inline-block whitespace-nowrap">Apply</span>
                </button>
              </div>
            </div>
          </div>
          {/* Market filter */}
          <div className="relative mb-4">
            {/* Trigger */}
            <div
              onClick={() => {
                setMarket(!market);
              }}
              className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-[50px] "
            >
              Markets
              {market ? (
                <FaChevronUp className="text-gray-400 ml-2" />
              ) : (
                <FaChevronDown className="text-gray-400 ml-2" />
              )}
            </div>
            {/* Dropdown Content */}
            <div
              className={`absolute bg-gray dropdown-content w-[200px] z-30 mt-1 ${market ? "block" : "hidden"}`}
            >
              <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                {/* Market Options with additional data */}
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.OpenSea}
                    onChange={handleOpenseaChange}
                  />
                  OpenSea <span className="text-xs text-gray ml-1"></span>
                </label>
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.LooksRare}
                    onChange={handleLooksRareChange}
                  />
                  LooksRare <span className="text-xs text-gray ml-1"></span>
                </label>
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.Blur}
                    onChange={handleBlurChange}
                  />
                  Blur <span className="text-xs text-gray ml-1"></span>
                </label>
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.NFTX}
                    onChange={handleNFTXChange}
                  />
                  NFTX <span className="text-xs text-gray ml-1"></span>
                </label>
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.SudoSwap}
                    onChange={handleSudoSwapChange}
                  />
                  Sudoswap <span className="text-xs text-gray ml-1"></span>
                </label>
                <label className="block cursor-pointer px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-yellow mr-2"
                    checked={markets.MagicEden}
                    onChange={handleMagicEdenChange}
                  />
                  MagicEden <span className="text-xs text-gray ml-1"></span>
                </label>
                {/* Add other options similarly */}
              </div>
            </div>
          </div>

          {/* Traits filter */}
          <div className="relative mb-4">
            {/* Trigger */}
            <div
              onClick={() => {
                setTraitsOpen(!traitsOpen);
              }}
              className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-[50px] "
            >
              Traits
              {traitsOpen ? (
                <FaChevronUp className="text-gray-400 ml-2" />
              ) : (
                <FaChevronDown className="text-gray-400 ml-2" />
              )}
            </div>
            {/* Dropdown Content */}
            <div
              id="traits-dropdown"
              className={`z-30 ${traitsOpen ? "block" : "hidden"} absolute mt-3 right-0 mt-1  bg-dark-gray border-gray-all rounded-sm shadow-lg w-[500px] h-[330px]`}
            >
              <div className="p-4 h-full">
                {/* Search and Rarity Filter */}
                <div className="flex justify-between pb-3 border-dark-gray">
                  <div className="flex-1 mr-2">
                    <input
                      type="text"
                      placeholder="Search for Traits"
                      onChange={handleTraitSearchInputChange}
                      className="w-full px-3 py-2 bg-black focus:none text-white rounded-sm"
                      autoComplete="off"
                    ></input>
                  </div>
                  <div className="w-30">
                    <select
                      onChange={(e) => setTraitOrderDirection(e.target.value)}
                      className="w-full px-3 py-2 bg-dark-gray border-dark-gray-all text-gray h-10 rounded-sm"
                    >
                      <option value="Most">Most Rare</option>
                      <option value="Least">Least Rare</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      resetTraitFilters();
                    }}
                    className={`${traitFilterApplied ? "block " : "hidden "}w-30 bg-dark-gray text-yellow border-dark-gray-all  font-bold hover:bg-gray py-2 px-4 ml-2 rounded-sm text-sm text-center`}
                  >
                    Reset
                  </button>
                </div>

                {/* Tabbed Content with Scrollable Sections */}
                <div className="absolute flex h-full">
                  <div className="w-[100px] bg-dark-gray p-0 pt-2 pr-2 overflow-y-auto max-h-[260px] no-scrollbar">
                    <ul className="text-sm text-light-gray ">
                      <li
                        className={`p-2 hover:bg-gray cursor-pointer ${selectedTraitCategory == "all" ? "bg-gray text-yellow" : ""}`}
                        onClick={() => {
                          setSelectedTraitCategory("all");
                        }}
                      >
                        All
                      </li>
                      {traitData.map((traitCategory) => (
                        <li
                          key={traitCategory.key}
                          onClick={() => {
                            setSelectedTraitCategory(traitCategory.key);
                          }}
                          className={`p-2 hover:bg-gray cursor-pointer ${selectedTraitCategory == traitCategory.key ? " bg-gray text-yellow" : ""}`}
                        >
                          {traitCategory.key}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-[400px] h-[250px] p-2 overflow-y-auto text-sm text-light-gray border-dark-gray-l no-scrollbar">
                    {traitData.map((thisTraitCategory) => (
                      <div key={thisTraitCategory.key} className="text-white">
                        {selectedTraitCategory == "all" ||
                        selectedTraitCategory == thisTraitCategory.key ? (
                          <div>
                            <span
                              onClick={() => {
                                setTraitCategoryDropdown((prevState) => ({
                                  ...prevState,
                                  [thisTraitCategory.key]:
                                    !traitCategoryDropdown[
                                      thisTraitCategory.key
                                    ],
                                }));
                              }}
                              className="text-white py-4 text-lg flex flex-row justify-between"
                            >
                              {thisTraitCategory.key}

                              {traitCategoryDropdown[thisTraitCategory.key] ? (
                                <FaChevronUp className="text-gray-400 mr-4 align-right" />
                              ) : (
                                <FaChevronDown className="text-gray-400 mr-4 align-right" />
                              )}
                            </span>
                            {traitCategoryDropdown[thisTraitCategory.key] ? (
                              <ul className="text-md text-white bg-black w-full py-2">
                                {thisTraitCategory.values?.map(
                                  (traitval: TraitType) => (
                                    <li
                                      key={traitval.value}
                                      className="p-2 hover:bg-gray-700 cursor-pointer traits-list-item"
                                    >
                                      <div className=" flex flex-row items-center">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox accent-yellow mr-2 h-[20px] w-[20px]"
                                          checked={
                                            traitFilterSelection[thisTraitCategory.key+":"+traitval.value]
                                          }
                                          onChange={() => {
                                            handleTraitFilterSelectionChange(
                                              thisTraitCategory.key+":"+traitval.value
                                            );
                                          }}
                                        />
                                        <div className="flex flex-row justify-between w-full">
                                          <div className="flex flex-col">
                                            <div>{traitval.value}</div>
                                            <div className="text-gray">
                                              {traitval.count}{" "}
                                              {" (" +
                                                Number(
                                                  (
                                                    traitval.count / count
                                                  ).toFixed(3)
                                                ) *
                                                  100 +
                                                "%)"}
                                            </div>
                                          </div>
                                          <div className="flex flex-col">
                                            <div>
                                              {traitval.floorAskPrice?.amount
                                                ?.decimal
                                                ? traitval.floorAskPrice?.amount
                                                    ?.decimal
                                                : "--"}
                                            </div>
                                            <div className="text-gray">
                                              {traitval.floorAskPrice?.amount
                                                ?.usd
                                                ? "$" +
                                                  traitval.floorAskPrice?.amount?.usd.toFixed(
                                                    2
                                                  )
                                                : "--"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center pb-2 z-3">
        <div className="pl-6">
          <div className="flex items-center">
            <div className="pr-1 inline-flex items-center justify-center rounded-full w-[10px] h-[10px] bg-yellow" />

            <span className="text-xs text-gray dark:text-gray mr-2 ml-2">
              {filteredTokenData.length} results
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-row items-center flex-wrap md:ml-2 md:pl-2">
            <div
              className={`${activeStatus == "buy_now" ? "block" : "hidden"} ml-2 text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center justify-center text-xs`}
            >
              <span className="text-gray capitalize">Status</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                Buy Now
              </span>
              <i
                className="cursor-pointer font-bold"
                onClick={() => {
                  setActiveStatus("show_all");
                }}
              >
                X
              </i>
            </div>

            <div
              className={`${activePriceFloor > 0 ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
            >
              <span className="text-gray capitalize">Price</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                {">"} {activePriceFloor} ETH
              </span>
              <i
                onClick={() => {
                  setActivePriceFloor(0);
                }}
                className=" cursor-pointer font-bold"
              >
                X
              </i>
            </div>

            <div
              className={`${activePriceCeiling < 10000 ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
            >
              <span className="text-gray capitalize">Price</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                {"<"} {activePriceCeiling} ETH
              </span>
              <i
                onClick={() => {
                  setActivePriceCeiling(10000);
                }}
                className=" cursor-pointer font-bold"
              >
                X
              </i>
            </div>

            <div
              className={`${activeRarityFloor > 1 ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
            >
              <span className="text-gray capitalize">Rarity</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                {">"} {activeRarityFloor}
              </span>
              <i
                onClick={() => {
                  setActiveRarityFloor(1);
                }}
                className=" cursor-pointer font-bold"
              >
                X
              </i>
            </div>

            <div
              className={`${activeRarityCeiling < 10000 ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
            >
              <span className="text-gray capitalize">Rarity</span>
              <span className="capitalize text-light-green mr-1 ml-1">
                {"<"} {activeRarityCeiling}
              </span>
              <i
                onClick={() => {
                  setActiveRarityCeiling(10000);
                }}
                className=" cursor-pointer font-bold"
              >
                X
              </i>
            </div>

            {markets.OpenSea == true &&
            markets.LooksRare == true &&
            markets.Blur == true &&
            markets.NFTX == true &&
            markets.SudoSwap == true &&
            markets.MagicEden == true ? (
              <div />
            ) : (
              <div className="flex flex-row">
                <div
                  className={` ${markets.OpenSea ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    OpenSea
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        OpenSea: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>

                <div
                  className={` ${markets.LooksRare ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    LooksRare
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        LooksRare: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>

                <div
                  className={` ${markets.Blur ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    Blur
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        Blur: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>

                <div
                  className={` ${markets.NFTX ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    NFTX
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        NFTX: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>

                <div
                  className={` ${markets.SudoSwap ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    SudoSwap
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        SudoSwap: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>

                <div
                  className={` ${markets.MagicEden ? "block" : "hidden"} text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 ml-2`}
                >
                  <span className="text-gray capitalize">Market</span>
                  <span className="capitalize text-light-green mr-1 ml-1">
                    MagicEden
                  </span>
                  <i
                    onClick={() =>
                      setMarkets((prevMarkets) => ({
                        ...prevMarkets,
                        MagicEden: false,
                      }))
                    }
                    className=" cursor-pointer font-bold"
                  >
                    X
                  </i>
                </div>
              </div>
            )}
            {traitFilterApplied ? (
              <div className="flex flex-row">
                {Object.keys(traitFilterSelection).map((value) => (
                  <div className="flex flex-row flex-start" key={value}>
                    {traitFilterSelection[value] ? (
                      <div className="ml-2 text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600 hidden sm:block">
                        <span className="text-gray capitalize">Traits</span>
                        <span className="capitalize text-light-green mr-1 ml-1">
                          {value}
                        </span>
                        <i
                          onClick={() => {
                            handleTraitFilterSelectionChange(value);
                          }}
                          className=" cursor-pointer h-14 w-14 font-bold"
                        >
                          X
                        </i>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
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
                onChange={() => {
                  setMyItems(!myItems);
                }}
              />
              <div className="w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow dark:peer-focus:ring-yellow peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-0">
        {/* NFT Cards Section */}
        {filteredTokenData ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>End of list</b>
              </p>
            }
          >
            <div className="z-20 min-h-[500px] mb-[50px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 py-4">
              {filteredTokenData.map((nft) => (
                <TokenCard
                  setDetailsModal={setDetailsModal}
                  setDetailsToken={setDetailsToken}
                  key={nft.token.tokenId}
                  collectionId={id}
                  nft={nft}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div>Loading...</div>
        )}
        {detailsModal && detailsToken ? (
          <DetailsModal setDetailsModal={setDetailsModal} nft={detailsToken} />
        ) : null}
      </div>
    </div>
  );
}

const LuckyBuy = () => {
  return (
    <div
      id="modal-lucky-buy"
      className="h-auto w-11/12 lg:w-9/12 p-3 bg-black rounded-sm z-40"
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

                  <div className="flex justify-center items-center sticky top-5 z-30 bg-black">
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
                        <div className="p-2 border-b border-dark-gray hover:bg-gray">
                          <div className="text-sm font-semibold text-white uppercase">
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
type ActivityType = {
  type: string;
  timestamp: number;
  fromAddress: string;
  toAddress: string;
  token:{
    tokenId: string;
    tokenName: string;
    tokenImage: string;
    rarityScore: number;
  };
  order: {
    source:{
      name: string;
      icon: string;
    };
  };
  price: {
    amount: {
      decimal: number;
    };
  };
};
const DetailsModal = ({
  setDetailsModal,
  nft,
}: {
  setDetailsModal: (detailsModal: boolean) => void;
  nft: TokenType;
}) => {
  //state variable to store activity data
  const [dates, setDates] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const timestamp = nft.token?.lastSale?.timestamp
    ? nft.token.lastSale.timestamp
    : 0; // replace with the actual timestamp
  let lastSale = new Date();
  if (timestamp > 0) {
    lastSale = new Date(timestamp * 1000); // convert to milliseconds
  }
  const now = new Date();
  let validUntil = new Date();
  if (nft.market?.floorAsk?.validUntil > 0) {
    validUntil = new Date(
      nft.market?.floorAsk?.validFrom
        ? nft.market.floorAsk.validUntil * 1000
        : 0
    );
  }
  let validFrom = new Date();
  if (nft.market?.floorAsk?.validFrom > 0) {
    validFrom = new Date(
      nft.market?.floorAsk?.validFrom ? nft.market.floorAsk.validFrom * 1000 : 0
    );
  }
  //expiration Date
  const expirationSecondsAgo = Math.floor(
    (now.getTime() - validUntil.getTime()) / 1000
  );
  const expirationMinutesAgo = Math.floor(expirationSecondsAgo / 60);
  const expirationHoursAgo = Math.floor(expirationMinutesAgo / 60);
  const expirationDaysAgo = Math.floor(expirationHoursAgo / 24);
  const expirationMonthsAgo = Math.floor(expirationDaysAgo / 30);
  const expirationYearsAgo = Math.floor(expirationDaysAgo / 365);
  //listed Date
  const listedSecondsAgo = Math.floor(
    (now.getTime() - validFrom.getTime()) / 1000
  );
  const listedMinutesAgo = Math.floor(listedSecondsAgo / 60);
  const listedHoursAgo = Math.floor(listedMinutesAgo / 60);
  const listedDaysAgo = Math.floor(listedHoursAgo / 24);
  const listedMonthsAgo = Math.floor(listedDaysAgo / 30);
  const listedYearsAgo = Math.floor(listedDaysAgo / 365);
  //Held for
  const secondsAgo = Math.floor((now.getTime() - lastSale.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  useEffect(() => {
    async function activityLookup() {
      let lookupString = `https://api.reservoir.tools/tokens/${nft.token.collection.id}:${nft.token.tokenId}/activity/v5`;
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try {
        const response = await axios.request(options);
        const activities: ActivityType[] = response.data.activities;
        const data = activities.filter(
          (item: ActivityType) => item.type === "sale"
        );
        let newDates: number[] = [];
        let newPrices: number[] = [];
        for (let sale of data) {
          newDates = [...newDates, sale.timestamp];
          newPrices = [...newPrices, sale.price.amount.decimal];
        }
        setDates(newDates);
        setPrices(newPrices);
        return response.data.activities;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    activityLookup();
  }, [
    nft.token.tokenId,
    dates,
    setDates,
    prices,
    setPrices,
    nft.token.collection.id,
  ]);

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-60 z-40"></div>
      <div className="absolute z-50 w-[100%] h-[90%] top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2 opacity-100 ">
        {/*view NFT modal*/}
        <div
          id="modal-view-nft"
          className="h-auto w-11/12 lg:w-9/12 p-3 bg-dark-gray rounded-sm z-40"
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
                {/* Escape/Close Button */}
                <button
                  onClick={() => {
                    setDetailsModal(false);
                  }}
                  className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none"
                >
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
                        {nft?.token?.collection?.name}
                      </Link>
                    </div>

                    {/* NFT Title */}
                    <h2 className="text-3xl font-bold text-light-green mb-3">
                      {nft?.token?.name}
                    </h2>

                    {/* NFT Attributes */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center">
                        {/* Rarity Ranking */}
                        <span className="mr-2 bg-gray text-gray text-xs font-semibold px-2.5 py-0.5 rounded">
                          #{nft.token?.rarity}
                        </span>
                      </div>
                      <div className="text-gray mt-7">
                        {/* Flex container for inline display on small screens and above */}
                        <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                          {/* Created by */}
                          <div className="mr-0 sm:mr-7">
                            <span className="text-xs">Created by</span>
                            <div className="text-sm font-bold">
                              <div className="text-yellow hover:text-yellow-200">
                                {nft.token.collection.creator.substring(0, 7)}
                                ...
                              </div>
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
                                {nft.token?.owner.substring(0, 7)}...
                              </a>
                            </div>
                          </div>

                          {/* Held for */}
                          <div className="mr-0 sm:mr-7">
                            <span className="text-xs">Held for</span>
                            <div className="text-sm font-bold text-light-green">
                              {yearsAgo > 0
                                ? yearsAgo.toString() + " years"
                                : null}
                              {monthsAgo > 0
                                ? (monthsAgo % 12).toString() + " months "
                                : daysAgo > 0
                                  ? Math.floor(daysAgo % 30) + " days"
                                  : "--"}
                            </div>
                          </div>

                          {/* Last Price */}
                          <div className="mr-0 sm:mr-7">
                            <span className="text-xs">Last Price</span>
                            <div className="text-sm font-bold text-light-green">
                              {nft.token?.lastSale?.price?.amount?.decimal
                                ? nft.token?.lastSale?.price?.amount?.decimal
                                : "--"}
                            </div>
                          </div>

                          {/* Collection Floor */}
                          <div className="mr-0 sm:mr-7">
                            <span className="text-xs">Collection Floor</span>
                            <div className="text-sm font-bold text-light-green">
                              {
                                nft.token.collection.floorAskPrice.amount
                                  .decimal
                              }
                              <i className="fab fa-ethereum ml-1"></i>
                            </div>
                          </div>

                          {/* Top Offer */}
                          <div className="mr-0 sm:mr-7">
                            <span className="text-xs">Top Offer</span>
                            <div className="flex items-center">
                              <div className="text-sm font-bold text-light-green">
                                {nft.market?.topBid?.price?.amount?.decimal
                                  ? nft.market.topBid.price.amount.decimal
                                  : "--"}
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
                              <span className="text-gray">Listed for: </span>{" "}
                              <span className="font-semibold">
                                {nft?.market?.floorAsk?.price?.amount?.decimal
                                  ? nft.market.floorAsk.price.amount.decimal +
                                    " "
                                  : "--"}
                                ETH
                                <i className="fab fa-ethereum ml-1 fa-xs text-gray"></i>
                              </span>{" "}
                              <span className="text-gray ml-1">
                                {nft?.market?.floorAsk?.price?.amount?.usd
                                  ? "$(" +
                                    nft.market.floorAsk.price.amount.usd.toFixed(
                                      2
                                    ) +
                                    ")"
                                  : ""}
                              </span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 sm:gap-4 w-full">
                              <button
                                type="button"
                                className="text-black uppercase bg-yellow hover:bg-white focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                              >
                                Buy now
                              </button>
                              <button
                                id="btn"
                                className="text-white uppercase bg-dark border border-gray-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
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
                            <div className="text-sm font-bold">
                              {"in "}
                              {expirationYearsAgo > 0
                                ? expirationYearsAgo + " years "
                                : expirationMonthsAgo > 0
                                  ? (expirationMonthsAgo % 12) + " months "
                                  : expirationDaysAgo > 0
                                    ? (expirationDaysAgo % 30) + " days "
                                    : expirationHoursAgo > 0
                                      ? (expirationHoursAgo % 24) + " hours "
                                      : "--"}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-xs">Listed</div>
                            <div className="text-sm font-bold">
                              {listedYearsAgo > 0
                                ? listedYearsAgo + " years ago "
                                : listedMonthsAgo > 0
                                  ? (listedMonthsAgo % 12) + " months ago "
                                  : listedDaysAgo > 0
                                    ? (listedDaysAgo % 30) + " days ago "
                                    : listedHoursAgo > 0
                                      ? (listedHoursAgo % 24) + " hours ago"
                                      : "--"}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-xs">Markup</div>
                            <div className="text-sm font-bold">
                              {nft.market?.floorAsk?.price?.amount?.decimal &&
                              nft.token?.lastSale?.price?.amount?.decimal
                                ? (
                                    ((nft.market.floorAsk.price.amount.decimal -
                                      nft.token.lastSale.price.amount.decimal) /
                                      nft.token.lastSale.price.amount.decimal) *
                                    100
                                  ).toFixed(2) + "%"
                                : "--"}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-xs">Floor Difference</div>
                            <div className="text-sm font-bold">
                              {nft.market?.floorAsk?.price?.amount?.decimal &&
                              nft.market?.topBid?.price?.amount?.decimal
                                ? (
                                    ((nft.market.floorAsk.price.amount.decimal -
                                      nft.market.topBid.price.amount.decimal) /
                                      nft.market.topBid.price.amount.decimal) *
                                    100
                                  ).toFixed(2) + "%"
                                : "--"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-sm overflow-hidden">
                        <div className="py-3 px-0 uppercase mt-2 text-light-green">
                          Sale History
                        </div>
                        {/*<canvas className="p-0" id="chartLine"></canvas>*/}
                        <PriceChart prices={prices} dates={dates} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Trait Details and Action Button */}
              <div className="md:w-4/12 p-2 bg-dark-gray rounded-lg mr-2">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-[300px] h-[300px]">
                    <Image
                      width={300}
                      height={300}
                      alt="NFT Image"
                      className="object-cover w-[100px] mb-3 rounded-sm responsive"
                      src={
                        nft.token.image
                          ? nft.token.image
                          : "./images/img-placeholder.png"
                      }
                    />
                  </div>
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
                      {nft.token.attributes.map(
                        (trait: TraitType, index: number) => (
                          <div key={index} className={`mb-2 }`}>
                            <div
                              className={`flex justify-between text-light-green text-sm "}`}
                            >
                              <div>
                                <p>{trait.value}</p>
                                <div className="bg-gray text-gray text-xs inline-block px-2 py-1 rounded">
                                  {trait.key}
                                </div>
                                <span className="text-light-green text-xs ml-1">
                                  {trait.tokenCount}{" "}
                                  {" (" +
                                    (
                                      (trait.tokenCount /
                                        nft.token.collection.tokenCount) *
                                      100
                                    ).toFixed(2) +
                                    "%)"}
                                </span>
                              </div>
                              <div>
                                <p>
                                  {trait.floorAskPrice?.amount?.decimal
                                    ? trait.floorAskPrice.amount.decimal
                                    : "--"}
                                </p>
                                <p className="text-gray-400 text-xs text-right">
                                  {trait.floorAskPrice?.amount?.usd
                                    ? "($" +
                                      trait.floorAskPrice.amount.usd.toFixed(
                                        2
                                      ) +
                                      ")"
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
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
    twitterUrl: "",
    discordUrl: "",
    externalUrl: "",
    description: "",
    tokenCount: "",
    royalties: { bps: "" },
    floorAsk: { price: { amount: { decimal: 0 } } },
    topBid: { price: { amount: { decimal: 0 } } },
    floorSaleChange: { "1day": 0 },
    volume: { "1day": 0 },
    volumeChange: { "1day": 0 },
  });

  async function nftLookup() {
    const options = {
      method: "GET",
      url: `https://api.reservoir.tools/collections/v7?id=${id}`,
      headers: {
        //accept: "*/*",
        "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
      },
    };

    try {
      const response = await axios.request(options);
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
          {nftData ? <NavSection collectionData={nftData} /> : <div></div>}

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
