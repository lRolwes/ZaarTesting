import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { ConnectWallet } from "./ConnectWallet";
import axios from 'axios';
import { useRouter } from "next/router";

export const HomeHeader = () => {
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [page, setPage] = useState("/");
  useEffect(() => {setPage(router.asPath);} , [router.asPath]);
  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearching(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [search, setSearch] = useState(" ");
  const [searchData, setSearchData] = useState([{name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}]);

  async function nftLookup(target: string) {
    const options = {
      method: 'GET',
      url: 'https://api.reservoir.tools/collections/search/v1?prefix=' + target +'&limit=5',
      headers: {accept: '*/*', 'x-api-key': 'f1bc813b-97f8-5808-83de-1238af13d6f9'}
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.collections);
      return response.data.collections;
    } catch (error) {
      console.error(error);
      return " ";
    }
  }

  useEffect(() => {
    if (search.length > 2) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [search, setSearching]);

  useEffect(() => {
    if (searching) {
      const fetchSearchData = async () => {
        const searchData = await nftLookup(search);
        setSearchData(searchData);
      };
      fetchSearchData();
    }
  }, [searching, search, setSearchData]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setSearch(value);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className= {`fixed top-0 left-0 w-full border-dark-gray z-30 flex justify-between items-center p-3 px-8 pl-6 sm:pl-2 sm:pl-2 bg-black bg-opacity-20   ${isMenuOpen? " " : " backdrop-blur-md"}`}>
      <div className="flex justify-between items-center  w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center align-center justify-between md:space-x-4 text-sm z-30">
          {isMenuOpen && (
            <div className="space-y-3 fixed top-0 right-0 bottom-0 left-0 z-30 w-full h-full bg-black flex flex-col items-center justify-center bg-opacity-90 text-xl font-bold z-30">
              {/* Your mobile navigation menu goes here */}
              <ConnectWallet />
              <Link href="/" className={`${page=="/"? "text-white" : "text-yellow hover:text-hoveryellow "}`}>
                <div className="p-4 ">HOME</div>
              </Link>
              <Link href="/trade" className={`${page=="/trade"? "text-white" : "text-yellow hover:text-hoveryellow   "}`}>
                <div className="p-4 ">TRADE</div>
              </Link>
              <Link href="/migration" className={`${page=="/migration"? "text-white" : "text-yellow hover:text-hoveryellow   "}`}>
                <div className="p-4 ">MIGRATE PRTC</div>
              </Link>
              <Link href="/xp" className={`${page=="/xp"? "text-white" : "text-yellow hover:text-hoveryellow   "}`}>
                <div className="p-4 ">EARN XP</div>
              </Link>
              <Link href="https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&to=0x95ac17ce4021417e25b8edf807366fc3be091b5e" className={`text-yellow hover:text-hoveryellow `}>
                <div className="p-4 ">Buy $ZAAR</div>
              </Link>
              <Link
                href="https://t.me/ZaarTradingBot"
                className="text-yellow hover:text-hoveryellow   "
              >
                <div className="p-4 ">TELEGRAM TRADING</div>
              </Link>
              
            </div>
          )}
          <div className="ml-2 ">
            <Link href="/" className=" ">
              <Image
                src="/images/logo-3d.png"
                alt="logo"
                className="rounded-sm h-8 mr-4 "
                width={30}
                height={100}
              />
            </Link>
          </div>

          <div className="flex-grow md:hidden"></div>
        </div>
        <div className="lg:block hidden ">
          <nav className="space-x-7 uppercase relative text-sm md:ml-3 font-l flex flex-row">
            <Link href="/trade" className="contain ">
            <div className={`${page=="/trade"? "text-white " : "text-gray hover:text-hoveryellow    "}`}>
              Trade
              </div>
            </Link>
            <Link href="/migration" className="contain ">
            <div className={`${page=="/migration"? "text-white " : "text-gray hover:text-hoveryellow    "}`}>
              Migrate PRTC
              </div>
            </Link>
            <Link href="/xp" >
              <div className={`${page=="/xp"? "text-white " : "text-gray hover:text-hoveryellow    "}`}>  
              Earn XP
              </div>
            </Link>
            <Link href="https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&to=0x95ac17ce4021417e25b8edf807366fc3be091b5e" >
              <div className={`text-gray hover:text-hoveryellow`}>  
              Buy $ZAAR
              </div>
            </Link>
          </nav>
        </div>
        <div className="fixed top-3 left-1/2   -translate-x-1/2 flex flex-col w-[250px] md:w-[360px] text-base z-10 align-center justify-center item-center self-center" ref={wrapperRef}>
          <input type="text" placeholder="Search" onChange={handleInputChange} className="placeholder-gray-50 border-1 border-dark-gray-all  bg-black w-full px-4 py-2 bg-black text-white placeholder-gray-50 focus:outline-none" id="search-bar" autoComplete="off"/>
          <div className="relative">
          <div className={`absolute w-full  text-sm  ${searching? " divide-y divide-dark-gray border-b-1 border-x border-dark-gray" : " "}   `}>
            {searching && searchData[0] && <Link href={`/${searchData[0]?.id? searchData[0].id:""}`} onClick={()=>{setSearching(false);}} className="  text-light-green hover:text-light-green flex flex-row  items-center hover:bg-gray  bg-black w-full px-4 py-2  bg-black text-white " >
                      <div
                        className="h-7 w-7  mr-4 "
                        style={{ 
                          backgroundImage: searchData[0]?.image? `url(${searchData[0].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {searchData[0]?.name? searchData[0].name: " "} </Link>}
                       {searching && searchData[1] && <Link href={`/${searchData[1]?.id}`} onClick={()=>{setSearching(false);}} className="  text-light-green hover:text-light-green flex flex-row  items-center hover:bg-gray   bg-black w-full px-4 py-2 bg-black text-white" >
                      <div
                        className="h-7 w-7  mr-4 "
                        style={{ 
                          backgroundImage: searchData[1]?.image? `url(${searchData[1].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {searchData[1]?.name? searchData[1].name: " "} </Link>}
                       {searching && searchData[2] && <Link href={`/${searchData[2]?.id}`} onClick={()=>{setSearching(false);}} className="text-light-green hover:text-light-green  flex flex-row  items-center hover:bg-gray bg-black w-full px-4 py-2 bg-black text-white " >
                      <div
                        className="h-7 w-7 mr-4"
                        style={{ 
                          backgroundImage: searchData[2]?.image? `url(${searchData[2].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {searchData[2]?.name? searchData[2].name: " "} </Link>}
                       {searching && searchData[3] && <Link href={`/${searchData[3]?.id}`} onClick={()=>{setSearching(false);}} className="text-light-green hover:text-light-green flex flex-row  items-center hover:bg-gray  bg-black w-full px-4 py-2 bg-black text-white " >
                      <div
                        className="h-7 w-7 mr-4 "
                        style={{ 
                          backgroundImage: searchData[3]?.image? `url(${searchData[3].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {searchData[3]?.name? searchData[3].name: " "} </Link>}
                       {searching && searchData[4] && <Link href={`/${searchData[4]?.id}`} onClick={()=>{setSearching(false);}} className="text-light-green hover:text-light-green flex flex-row  items-center hover:bg-gray bg-black w-full px-4 py-2 bg-black text-white " >
                      <div
                        className="h-7 w-7   mr-4 "
                        style={{ 
                          backgroundImage: searchData[4]?.image? `url(${searchData[4].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {searchData[4]?.name? searchData[4].name: " "} </Link>}
            
            </div>
            </div>
            </div>
        {/* Connect Button */}
        <div className="ml-auto z-2">
          <div className="flex items-center text-gray mr-0">
            <div className="group flex flex-row space-x-4 z-2">
              <div className="hidden lg:block"><ConnectWallet /></div>
              <button
                id="menu-btn"
                onClick={handleMenuButtonClick}
                className={` ${isMenuOpen? "fixed top-3 right-8 z-30 " : ""} p-2 focus:outline-none lg:hidden text-light-green border border-dark-gray-all hover:border-light-green-all rounded-sm transition-colors duration-150 lg:hidden`}
              >
                {!isMenuOpen? <svg
                  className="h-6 w-6 text-yellow lg:hidden"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                    fill="yellow"
                  ></path>
                </svg>
                : 
                <p className="px-2 font-bold text-yellow font-xl">X</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
