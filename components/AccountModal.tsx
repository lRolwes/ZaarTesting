import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import TokenCard from "./collectionPageComponents/TokenCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const ItemsPage = ({userTokens}:{userTokens:TokenType[]}) => {
    const[items, setItems] = useState<TokenType[]>(userTokens);
    const[collections, setCollections] = useState<CollectionType[]>([]);
    const [search, setSearch] = useState("");
    const [collectionSearch, setCollectionSearch] = useState("");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [sort, setSort] = useState("topValue");
    const [filteredItems, setFilteredItems] = useState<TokenType[]>([]);
    const [filteredCollections, setFilteredCollections] = useState<CollectionType[]>([]);
    useEffect(()=>{
        if(collectionSearch==""){
            setFilteredCollections(collections);
        }
        else{
            setFilteredCollections(collections.filter((col)=>col.name.toLowerCase().includes(collectionSearch.toLowerCase())));
        }
    }, [collections, collectionSearch]);
    useEffect(()=>{
        if(search==""){
            setFilteredItems(items);
        }
        else{
            setFilteredItems(items.filter((item)=>item?.token?.name?.toLowerCase()?.includes(search.toLowerCase())));
        }
    },[items, search]);
    useEffect(()=>{
      let tempCollections: CollectionType[] = [];
      for(let tok of items){
        if(tempCollections.find((col)=>col.id == tok.token.collection.id) == undefined){
          const collection: CollectionType = {
            ...tok.token.collection,
            ownedTokenCount: 1
          };
          tempCollections.push(collection);
        }
        else{
          tempCollections.find((col)=>col.id == tok.token.collection.id)!.ownedTokenCount += 1;
        }
      }
      setCollections(tempCollections);
    },[items]);
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
    return(

        <div className="w-full mx-auto px-2 lg:px-6">
              <div className="group flex py-3 gap-2 top-0 <lg:flex-col justify-between lg:items-center lg:sticky z-10 lg:-mr-6 mt-1">
                <div className="flex items-center gap-2">
                  <div className="border border-dark-gray-all h-10 px-2 relative flex items-center bg-black rounded-sm sm:w-[271px] w-full w-52 max-w-full">
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
                        <span className="-ml-1 text-xs text-gray dark:text-gray">
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
                        <div className="text-md text-light-green font-medium">Collections</div>
                        <div className="px-1 rounded-full flex bg-dark-gray h-6 text-xs p-1 text-gray w-6 items-center justify-center aspect-square">
                          {collections.length}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="relative">
                          {/* Trigger */}
                          <button
                            className=" space-x-2 bg-dark-gray border-dark-gray border-all border-2 flex text-light-green items-center font-dm-sans justify-between font-medium text-sm text-gray rounded-sm pl-3 pr-2 cursor-pointer h-10  mr-4"
                            onClick={()=>{setSortDropdownOpen(!sortDropdownOpen)}}
                          >
                            <div>{sort}</div>
                            {sortDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                          </button>

                          {/* Dropdown Content */}
                          <div
                            className={`${sortDropdownOpen? "block " : "hidden "} absolute w-50 mt-1 z-10`}
                          >
                            <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                              {/* Dropdown Options */}
                              <button onClick={()=>{setSort("Top Value")}} className={`${sort=="Top Value"? "text-yellow" : "text-light-green hover:bg-dark-gray"}  cursor-pointer px-4 py-2`}>
                                Top Value
                              </button>
                              <button onClick={()=>{setSort("Alphabetical")}} className={`${sort=="Alphabetical"? "text-yellow" : "text-light-green hover:bg-dark-gray"}  cursor-pointer px-4 py-2`}>
                                Alphabetical
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <div className="border border-dark-gray-all h-10 px-2 relative flex items-center bg-black rounded-sm w-full">
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
                                <div className="flex flex-col divide-y ">
                                        {filteredCollections.map((collection, index)=> {return(
                                        <div key={index} className="border-2-b border-black flex hover:bg-slate-800 cursor-pointer px-3 h-14 items-center py-2.5 justify-between">
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
                                                    src={collection.imageUrl}
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex flex-col gap-.5">
                                                <div className="min-w-0 flex items-center gap-1.5 leading-5">
                                                <div className="overflow-hidden">
                                                    <Link
                                                    className="hover:text-yellow-400 w-full text-light-green"
                                                    href="#"
                                                    >
                                                    <div className="truncate">
                                                        {collection.name}
                                                    </div>
                                                    </Link>
                                                </div>
                                                </div>
                                                <div className="text-xs text-gray leading-4">
                                                Owned: {" "}{collection.ownedTokenCount}
                                                </div>
                                            </div>
                                            </div>
                                            <div className="flex flex-col items-end text-right">
                                            <div className="text-xs w-20 flex flex-col items-end text-right">
                                                <div className="flex items-center text-gray leading-4">
                                                Floor:
                                                <div className="pl-1 text-light-green inline-flex items-center max-w-full">
                                                    <div className="truncate undefined">
                                                    {2.399}
                                                    </div>
                                                    <span className="ml-0.5 relative mb-[1px]">
                                                    </span>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        );})}                                  
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
                  <div className="grid grid-flow-row-dense py-3 md:px-6 gap-2 3xl:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] !px-0 ml-2">
                    {filteredItems.map((item, index) => (<TokenCard collectionId ={item.token.collection.id} setDetailsModal={()=>{let x = 0;}} setDetailsToken={()=>{let x = 0;}} nft={item} key={index} />))}
                    <div
                      tabIndex={0}
                      className="relative group max-w-xs w-full justify-self-center"
                    >
                      <div className="absolute z-2 left-2 flex items-center gap-1 h-6 top-9"></div>
                      <div className="bg-dark-gray rounded nft-card-2 flex flex-col border group text-light-green overflow-hidden  break-inside-avoid max-w-xs card-shadow border-transparent hover:border-gray-700">
                        <div className="text-xs items-baseline flex justify-between py-1.5 h-7 px-3">
                          <span>
                            <div
                              className="text-light-green  text-xs  font-medium"
                              aria-expanded="false"
                            >
                              <div>-</div>
                            </div>
                          </span>
                        </div>
                        <div className="overflow-hidden flex-1 relative">
                          <div className="relative overflow-hidden flex-shrink-0">
                            <img
                              alt="Image"
                              loading="lazy"
                              width="250"
                              height="250"
                              decoding="async"
                              data-nimg="1"
                              className="z-1 relative object-cover w-full transform transition-transform duration-200 group-hover:scale-105 object-cover aspect-square"
                              src="assets/img/ohisee-jokerfrog.jpg"
                            />
                          </div>
                        </div>
                        <div className=" flex flex-col p-2">
                          <div className="overflow-hidden">
                            <Link
                              className="flex items-center gap-1 hover:text-blue undefined"
                              href="#"
                            >
                              <div className="truncate text-xxs">
                                Oh.. I see
                              </div>
                            </Link>
                          </div>
                          <div className="mb-1.5">
                            <Link
                              className="flex items-center gap-1 hover:text-blue"
                              href="#"
                            >
                              <div className="truncate font-medium text-xs ">
                                joker frog ^_−☆
                              </div>
                            </Link>
                          </div>
                          <div className="flex justify-between items-center pb-1.5">
                            <div>
                              <div className="flex gap-1 items-center font-medium text-sm">
                                –
                              </div>
                            </div>
                            <Link
                              className="border font-medium border-dark-gray-all text-xs text-light-green rounded-sm hover:bg-gray-800 hover:border-gray-600 px-1.5 h-6 box-border flex items-center"
                              href="/nft/ethereum/0xfa9c0de4d9f65d11565bf9066c1fae99b760878d/95"
                            >
                              Details
                            </Link>
                          </div>
                          <div className="flex justify-between ">
                            <div className="text-xxs -mx-3 -mb-2 px-3 py-0.5 h-[18px] text-gray-400 flex items-center"></div>
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
const ActivityPage = () => {
    return(
        <div>
            Page
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
        imageUrl: string;
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

  type CollectionType = {
    id: string;
    name: string;
    creator: string;
    imageUrl: string;
    ownedTokenCount: number;
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
  const [rewards, setRewards] = useState(null);
  const [userTokens, setUserTokens] = useState([]);
  const [navigationPage, setNavigationPage] = useState("items");
  const [totalCollectionValue, setTotalCollectionValue] = useState(0);
  
  useEffect(() => {
    const url = `https://offchain-masterchef-e5a6ec82d362.herokuapp.com/rewards?address=${account.address ? account.address : "0x0000000000000000000000000000000000000000"}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRewards(data.rewards))
      .catch((error) => console.error("Error:", error));
  }, [account.address]);
  useEffect(()=>{
    async function fetchUserTokens(){
        const options = {method: 'GET', headers: {accept: '*/*', 'x-api-key': 'f1bc813b-97f8-5808-83de-1238af13d6f9'}};
        const res = await fetch(`https://api.reservoir.tools/users/0x7b04a23862d02dbea5cd75c9bf196b059c894146/tokens/v10`, options);
        const data = await res.json();
        console.log(data);
        let sum = 0;
        for(let tok of data.tokens){
            console.log(tok?.token?.floorAsk?.price?.amount?.decimal);
            sum += tok?.token?.floorAsk?.price?.amount?.decimal;
        }
        setTotalCollectionValue(Number(sum.toFixed(2)));
        setUserTokens(data.tokens);

        return;
    }
    fetchUserTokens();
  },[account.address]);
  useEffect(() => {
    async function getUserTokens() {
      const url = `https://offchain-masterchef-e5a6ec82d362.herokuapp.com/rewards?address=${account.address ? account.address : "0x0000000000000000000000000000000000000000"}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setRewards(data.rewards))
        .catch((error) => console.error("Error:", error));
    }
    getUserTokens();
  }, [account.address]);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full absolute bg-black top-0 left-0 opacity-70 w-screen h-screen z-40 "></div>
      <div className="w-4/5 h-9/10 absolute z-50 bg-gray opacity-100 text-yellow absolute top-0 left-1/2 transform -translate-x-1/2  rounded-lg shadow-lg overflow-y:auto">
        <div className=" w-full container-fluid py-6 pt-0">
          <div className="  flex flex-col w-full ">
            <div className="bg-dark-gray w-full">
              <div className=" flex p-2 md:pt-6 md:pb-3 md:px-6 pl-5 justify-between gap-2 md:flex-row flex-col bg-dark-gray h-full w-full bg-gradient-to-b from-yellow/15 to-transparent">
                <div className="flex items-center gap-4 w-full">
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
                          {account?.address?.slice(0,4)+"..."+account?.address?.slice(-4)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 md:items-end flex-col mt-5 sm:mt-0">
                  <div className="flex items-center">
                    <Image
                        alt="image"
                        src="/images/xp.png"
                        className="w-10 h-10"
                        width={100}
                        height={100}
                    />
                    <div className="text-4xl font-light tracking-wide ml-3">
                      <span className="text-light-green">69</span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between"></div>
                </div>
              </div>
              <div className="z-20 flex lg:top-0 pl-5 -mx-2 <lg:px-2 lg:-mx-6 border-b border-dark-gray">
                <div className="flex-1 z-20 lg:mx-6 flex items-center uppercase justify-between flex-wrap-reverse">
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
                              <nav className="inline-flex h-[35px]">
                                <button
                                  className={`${navigationPage=="items"? " border-yellow border-b-2 text-white": " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={()=>{setNavigationPage("items")}}
                                >
                                  Items
                                </button>
                                <button
                                  className={`${navigationPage=="activity"? " border-yellow border-b-2 text-white": " border-none text-gray hover:text-hoveryellow"} cursor-pointer shrink-0 text-sm font-medium whitespace-nowrap leading-3 flex items-center py-3 md:py-4 px-3 mr-2.5 last:mr-0 uppercase`}
                                  onClick={()=>{setNavigationPage("activity")}}
                                >
                                  Activity
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
                        Collections Value{": "}{totalCollectionValue}{" ETH"}
                      </span>
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
            {navigationPage=="items"? <ItemsPage userTokens={userTokens} /> : <ActivityPage/>}
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
