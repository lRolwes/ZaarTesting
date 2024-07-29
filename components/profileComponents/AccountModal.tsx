import Image from "next/image";
import Link from "next/link";
//import { faBook } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import TokenCard from "./TokenCard";
import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
import DetailsModal from "./DetailsModal";
import ActivitySection from "./ActivitySection";
import BidSection from "./BidsPage";
import OffersSection from "./OffersPage";
import { TokenType } from "./TokenCard";
import useXP from "../../hooks/xpcalcs";
import { getAccount } from '@wagmi/core'
import { config } from './../../config'
const ItemsPage = ({ userTokens }: { userTokens: TokenType[] }) => {
  const [items, setItems] = useState<TokenType[]>(userTokens);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [search, setSearch] = useState("");
  const [collectionSearch, setCollectionSearch] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sort, setSort] = useState("Top Value");
  const [filteredItems, setFilteredItems] = useState<TokenType[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    CollectionType[]
  >([]);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsModalNft, setDetailsModalNft] = useState<TokenType>();
  useEffect(() => {
    setItems(userTokens);
  }, [userTokens]);

  useEffect(() => {
    if (collectionSearch == "") {
      setFilteredCollections(collections);
    } else {
      setFilteredCollections(
        collections.filter((col) =>
          col.name.toLowerCase().includes(collectionSearch.toLowerCase())
        )
      );
    }
  }, [collections, collectionSearch]);
  useEffect(() => {
    let tempItems: TokenType[] = items;
    if (sort == "Alphabetical") {
      tempItems = items.sort((a, b) => {
        if (a?.token?.name != null && b?.token?.name != null) {
          return a.token.name.localeCompare(b.token?.name);
        }
        return 0;
      });
    } else {
      tempItems = items.sort(
        (a, b) =>
          b.token?.floorAsk?.price?.amount?.decimal -
          a.token?.floorAsk?.price?.amount?.decimal
      );
    }
    if (search == "") {
      setFilteredItems(tempItems);
    } else {
      setFilteredItems(
        tempItems.filter((item) =>
          item?.token?.name?.toLowerCase()?.includes(search.toLowerCase())
        )
      );
    }
  }, [items, search, sort]);
  useEffect(() => {
    let tempCollections: CollectionType[] = [];
    for (let tok of items) {
      if (
        tempCollections.find((col) => col.id == tok.token.collection.id) ==
        undefined
      ) {
        const collection = {
          ...tok.token.collection,
          ownedTokenCount: 1,
        };
        tempCollections.push(collection);
      } else {
        tempCollections.find(
          (col) => col.id == tok.token.collection.id
        )!.ownedTokenCount += 1;
      }
    }
    setCollections(tempCollections);
  }, [items]);
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    //value = encodeURIComponent(value);
    setSearch(value);
  };
  const handleCollectionSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    //value = encodeURIComponent(value);
    setCollectionSearch(value);
  };
  return (
    <div className="bg-dark-gray w-full mx-auto px-2 lg:px-6  max-h-[500px]">
      <div className=" flex py-3 gap-2 top-0 <lg:flex-col justify-between lg:items-center lg:sticky z-40 lg:-mr-6 mt-1">
        <div className="flex items-center gap-2">
          <div className="border border-dark-gray-all h-10 px-2 relative flex items-center bg-gray rounded-sm w-[271px]  w-52 max-w-full">
            <i className="far fa-search"></i>
            <label className="sr-only">Search items</label>
            <div className="flex-1 overflow-hidden">
              <input
                id=":r6:"
                autoComplete="off"
                name="searchText"
                type="search"
                onChange={handleSearchInputChange}
                placeholder="Search items"
                maxLength={200}
                className="w-full ml-2 h-10 focus:outline-none outline-none bg-transparent text-gray text-sm leading-[14px] placeholder:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center">
            <i className="fas fa-circle text-yellow mr-2"></i>
            <div className="p-2 rounded-full bg-yellow mr-2 "></div>
            <div className="-pt-[1px]">
              <div className="flex items-center py-0.5 gap-2 whitespace-nowrap">
                <span className="-ml-1 text-xs text-light-green dark:text-gray">
                  {userTokens.length} items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex relative gap-0">
        <div className="flex relative">
          <div className="hidden sm:block text-sm <xl:hidden sticky top-16 flex-shrink-0 max-h-[calc(100vh_-_12rem)] w-80">
            <div className="flex items-center justify-between">
              <div className="gap-2 flex items-center px-3 py-2.5">
                <div className="text-md text-light-green font-medium flex flex-row space-x-2">
                  <FaBook/>
                  <p className="ml-2">Collections</p>
                </div>
                <div className="px-1 rounded-full flex bg-gray h-6 text-xs p-1 text-gray w-6 items-center justify-center aspect-square">
                  {collections.length}
                </div>
              </div>
              <div className="relative">
                <div className="relative">
                  {/* Trigger */}
                  <button
                    className=" space-x-2 bg-gray border-dark-gray border-all border-2 flex text-light-green items-center font-dm-sans justify-between font-medium text-sm text-gray rounded-sm pl-3 pr-2 cursor-pointer h-10  mr-4"
                    onClick={() => {
                      setSortDropdownOpen(!sortDropdownOpen);
                    }}
                  >
                    <div>{sort}</div>
                    {sortDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  {/* Dropdown Content */}
                  <div
                    className={`${sortDropdownOpen ? "block " : "hidden "} absolute w-50 mt-1 z-40`}
                  >
                    <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                      {/* Dropdown Options */}
                      <button
                        onClick={() => {
                          setSort("Top Value");
                        }}
                        className={`${sort == "Top Value" ? "text-yellow" : "text-light-green hover:bg-dark-gray"}  cursor-pointer px-4 py-2`}
                      >
                        Top Value
                      </button>
                      <button
                        onClick={() => {
                          setSort("Alphabetical");
                        }}
                        className={`${sort == "Alphabetical" ? "text-yellow" : "text-light-green hover:bg-dark-gray"}  cursor-pointer px-4 py-2`}
                      >
                        Alphabetical
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="border border-dark-gray-all h-10 px-2 relative flex items-center bg-gray rounded-sm w-full">
                <i className="far fa-search"></i>
                <label className="sr-only">Search Collections</label>
                <div className="flex-1 overflow-hidden">
                  <input
                    autoComplete="off"
                    name="searchText"
                    type="search"
                    placeholder="Search Collections"
                    onChange={handleCollectionSearchInputChange}
                    maxLength={100}
                    className="w-full ml-2 h-10 focus:outline-none outline-none bg-transparent text-gray-700 text-sm leading-[14px] placeholder:text-sm"
                  />
                </div>
              </div>
            </div>
            <div
              data-simplebar="init"
              className="scroll-container-body h-[calc(100%_-_68px)]"
              id=":r8:"
            >
              <div className="simplebar-wrapper m-0">
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div className="simplebar-offset">
                    <div
                      className="simplebar-content-wrapper"
                      tabIndex={0}
                      role="region"
                      aria-label="scrollable content h-[100%] overflow-hidden;"
                    >
                      <div className="simplebar-content p-0">
                        <div className="flex flex-col divide-y absolute max-h-[500px] min-h-[375px] no-scrollbar overflow-y-auto ">
                          {filteredCollections.map((collection, index) => {
                            return (
                              <Link
                                key={index}
                                href={`/${collection.id}`}
                                className="w-full border-2-b border-gray flex hover:bg-slate-800 cursor-pointer px-3 h-14 items-center py-2.5 justify-between"
                              >
                                <div className="min-w-0 flex items-center gap-2">
                                  <div className="-mb-.5">
                                    <div className="overflow-hidden">
                                      <div className="relative overflow-hidden aspect-square rounded w-[28px] h-[28px]">
                                        <Image
                                          alt="Milady"
                                          loading="lazy"
                                          decoding="async"
                                          width={100}
                                          height={100}
                                          data-nimg="fill"
                                          src={
                                            collection.imageUrl ||
                                            "/images/img-placeholder.png"
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex flex-col gap-.5">
                                    <div className="min-w-[175px] flex items-center gap-1.5 leading-5">
                                      <div className="overflow-hidden">
                                        <Link
                                          className="hover:text-yellow-400 w-full text-light-green"
                                          href="#"
                                        >
                                          <div className="truncate">
                                            {collection.name?.length > 18
                                              ? collection?.name?.substring(
                                                  0,
                                                  18
                                                ) + "..."
                                              : collection.name}
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="text-xs text-gray leading-4">
                                      Owned: {collection.ownedTokenCount}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end text-right">
                                  <div className="text-xs w-20 flex flex-col items-end text-right">
                                    <div className="flex items-center text-gray leading-4">
                                      Floor:
                                      <div className="pl-1 text-light-green inline-flex items-center max-w-full">
                                        <div className="truncate undefined">
                                          {collection?.floorAsk?.price?.amount?.decimal?.toFixed(
                                            2
                                          )}
                                          {" ETH"}
                                        </div>
                                        <span className="ml-0.5 relative mb-[1px]"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="simplebar-placeholder w-[320px] h-[169px]"></div>
              </div>
              <div className="simplebar-track simplebar-horizontal hidden">
                <div className="simplebar-scrollbar w-0 display-none;"></div>
              </div>
              <div className="simplebar-track simplebar-vertical hidden;">
                <div className="simplebar-scrollbar h-0 transform:translate3d(0px, 0px, 0px); display:none;"></div>
              </div>
            </div>
          </div>
          <div className="border-r-1 border-gray-300 min-h-[calc(100vh_-_8rem)] h-full"></div>
        </div>
        <div className="flex-1 w-full">
          <div className=" min-h-[500px] max-h-[600px] overflow-y-auto no-scrollbar grid grid-cols-2 lg:grid-cols-4 4xl:grid-cols-5 gap-2 ml-2 ">
            {filteredItems.map((item, index) => (
              <TokenCard
                key={index}
                collectionId={item.token.collection.id}
                setDetailsModal={setDetailsModalOpen}
                setDetailsToken={setDetailsModalNft}
                nft={item}
              />
            ))}
          </div>
          {detailsModalOpen && detailsModalNft != undefined ? (
            <DetailsModal
              setDetailsModal={setDetailsModalOpen}
              nft={detailsModalNft}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};


type CollectionType = {
  id: string;
  name: string;
  creator: string;
  imageUrl?: string;
  ownedTokenCount: number;
  floorAsk?: {
    price: {
      amount: {
        decimal: number;
      };
    };
  };
  floorAskPrice: {
    amount: {
      decimal: number;
    };
  };
};
const AccountModal = ({
  setModalOpen,
  balance,
}: {
  setModalOpen: (arg0: boolean) => void;
  balance: string | undefined;
}) => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const [userTokens, setUserTokens] = useState([]);
  const [navigationPage, setNavigationPage] = useState("items");
  const [totalCollectionValue, setTotalCollectionValue] = useState(0);
  const { xpcalcs } = useXP();

  useEffect(() => {
    async function fetchUserTokens() {
      const options = {
        method: "GET",
        headers: {
          accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      let userTokens = [];
      let continuation = null;
      //const addr = getAccount(config).address;
      const addr = "0x18cad576b06730ce61b98f0ab4b63da84f8ac13e";
      const res = await fetch(
        `https://api.reservoir.tools/users/${addr}/tokens/v10?includeTopBid=true&includeLastSale=true&includeAttributes=true`,
        options
      );
      let data = await res.json();
      userTokens = data.tokens;
      continuation = data.continuation;
      while(continuation!=null){
        //const addr = getAccount(config).address;
        const addr = "0x18cad576b06730ce61b98f0ab4b63da84f8ac13e";
        const res = await fetch(
          `https://api.reservoir.tools/users/${addr}/tokens/v10?includeTopBid=true&includeLastSale=true&includeAttributes=true&continuation=${continuation}`,
          options
        );
        data = await res.json();
        userTokens = userTokens.concat(data.tokens);
        continuation = data.continuation;
      }

      //console.log(data);
      let sum = 0;
      for (let tok of userTokens) {
        //console.log(tok?.token?.floorAsk?.price?.amount?.decimal);
        if(tok?.token?.floorAsk?.price?.amount?.decimal && tok?.token?.floorAsk?.price?.amount?.decimal>0){
          sum += tok?.token?.floorAsk?.price?.amount?.decimal;
        }
      }
      setTotalCollectionValue(Number(sum.toFixed(2)));
      setUserTokens(userTokens);

      return;
    }
    fetchUserTokens();
  }, [account.address]);


  return (
    <div className="absolute top-0 left-0 w-screen h-screen" >
      <div onClick={() => setModalOpen(false)}  className=" absolute bg-black top-0 left-0 opacity-70 w-screen h-screen z-40 "></div>
      <div onClick={(e) => e.stopPropagation()} className="fixed z-40 w-4/5 max-h-4/5 bg-dark-gray block text-yellow top-10 left-1/2 transform -translate-x-1/2  rounded-lg shadow-lg ">
        <div className="w-full py-6 pt-0  rounded-t-lg ">
          <div className="  flex flex-col w-full rounded-t-lg ">
            <div className=" w-full ">
              <div className="rounded-t-lg flex p-2 md:pt-6 md:pb-3 md:px-6 pl-5 justify-between gap-2 md:flex-row flex-col bg-dark-gray h-full w-full bg-gradient-to-b from-yellow/15 to-transparent">
                <div className="flex flex-row items-center gap-4 w-full rounded-t-lg">
                  <div className="rounded-lg flex-shrink-0 rounded-full relative overflow-hidden width-[65px] h-[65px]">
                    <Image
                      alt="jokerfrog.eth"
                      width={100}
                      height={100}
                      className="h-full object-cover h-[100%] w-[100%] "
                      src="/images/profile.jpg"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-2xl flex items-center gap-2 font-medium">
                      <div className="flex items-center gap-1">
                        <div className="max-w-[calc(100vw_-_12rem)]">
                          <div className="truncate text-light-green">
                            {account?.address?.slice(0, 4) +
                              "..." +
                              account?.address?.slice(-4)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className="ml-4 flex flex-row mr-8 align-center items-center justify-center">
                        <Image
                          alt="image"
                          src="/images/xp.png"
                          className="w-8 h-8"
                          width={100}
                          height={100}
                        />
                        <div className="text-2xl font-light tracking-wide ml-3">
                          <span className="text-light-green">
                            {xpcalcs != undefined ? Number(xpcalcs) : Number(0)}
                          </span>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 md:items-end flex-col mt-5 sm:mt-0 md:text-xl sm:text-sm">
                  <div className="flex items-center">
                    <div className="flex flex-row w-full justify-center md:justify-right space-x-6 md:space-x-0  md:flex-col ml-4 md:space-y-2 justify-start">
                      <button
                        onClick={() => {
                          disconnect();
                          setModalOpen(false);
                        }}
                        className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded p-1 text-sm w-[80px]"
                      >
                        Disconnect
                      </button>
                      <button
                        onClick={() => {
                          setModalOpen(false);
                        }}
                        className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded p-1 text-sm w-[80px]"
                      >
                        Close
                      </button>
                      
                    </div>
                  </div>
                  <div className="flex flex-row justify-between"></div>
                </div>
              </div>
              <div className="  z-40 flex lg:top-0 pl-5  -mx-5 lg:-mx-6 ">
                <div className=" flex-1 z-40 lg:mx-6 flex items-center uppercase justify-between flex-wrap-reverse">
                  <div
                    data-simplebar="init"
                    className="scroll-container-body inline-block w-full max-w-full sm:w-130 xl:w-148"
                    id=":r5:"
                  >
                    <div className="simplebar-wrapper m-0">
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                      </div>
                      <div className="simplebar-mask">
                        <div className="simplebar-offset r-[0px] b-0;">
                          <div
                            className="simplebar-content-wrapper"
                            tabIndex={0}
                            role="region"
                            aria-label="scrollable content h-auto overflow-hidden;"
                          >
                            <div className="simplebar-content p-0">
                              <nav className="inline-flex h-[35px] ">
                                <button
                                  className={`${navigationPage == "items" ? " border-yellow border-b-2 text-white" : " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={() => {
                                    setNavigationPage("items");
                                  }}
                                >
                                  Items
                                </button>
                                <button
                                  className={`${navigationPage == "activity" ? " border-yellow border-b-2 text-white" : " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={() => {
                                    setNavigationPage("activity");
                                  }}
                                >
                                  Activity
                                </button>
                                <button
                                  className={`${navigationPage == "offers" ? " border-yellow border-b-2 text-white" : " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={() => {
                                    setNavigationPage("offers");
                                  }}
                                >
                                  Offers Recieved
                                </button>
                                <button
                                  className={`${navigationPage == "bids" ? " border-yellow border-b-2 text-white" : " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={() => {
                                    setNavigationPage("bids");
                                  }}
                                >
                                  Offers Made
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-normal flex-wrap max-w-[100vw] py-3 md:py-1 lg:justify-end font-medium lg:divide-x-1 divide-gray-300 text-gray flex items-center lg:gap-2 uppercase">
                    <div className="flex items-center pr-2 lg:px-2 lg:pr-0">
                      {" "}
                      <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase">
                        Collections Value{": "}
                        {totalCollectionValue}
                        {" ETH"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {navigationPage == "items" ? (
              <ItemsPage userTokens={userTokens} />
            ) : navigationPage == "activity" ? (
              <ActivitySection
                id={getAccount(config).address ? getAccount(config).address : "0x000000"}
              />
            ) : navigationPage == "offers" ? (
              <OffersSection
                id={getAccount(config).address ? getAccount(config).address : "0x000000"}
              />
            ) : navigationPage == "bids" ? (
              <BidSection id={getAccount(config).address ? getAccount(config).address : "0x000000"} />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/*<div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Account</h1>
          <button onClick={()=>{disconnect();setModalOpen(false);}} className="text-red-500">Disconnect</button>
          <button onClick={()=> {setModalOpen(false)}} className="text-red-500">Close</button>
  
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">Address</p>
          <p className="text-sm text-gray-500">{account?.address}</p>
          <p className="text-lg font-semibold">Balance</p>
          <p className="text-sm text-gray-500">{balance? balance: "0"}</p>
          <p className="text-lg font-semibold">Rewards</p>
          <p className="text-sm text-gray-500">{rewards? rewards: "0"}</p>
        </div>
     </div>*/}
      </div>
    </div>
  );
};
export default AccountModal;
