import Image from "next/image";
import Link from "next/link";
import React, { use, useRef, useState, useEffect } from "react";
import { ConnectWallet } from "./ConnectWallet";
import axios from 'axios';
export const HomeHeader = () => {
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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
  const [nftData, setNftData] = useState([{name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}, {name: "", image:"", id:""}]);

  async function nftLookup(target: string) {
    const options = {
      method: 'GET',
      url: 'https://api.reservoir.tools/collections/search/v1?prefix=' + target,
      headers: {accept: '*/*', 'x-api-key': 'demo-api-key'}
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
      const fetchNftData = async () => {
        const nftData = await nftLookup(search);
        setNftData(nftData);
      };
      fetchNftData();
    }
  }, [searching, search, setNftData]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setSearch(value);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className= {`fixed top-0 left-0 w-full z-30 flex justify-between items-center px-8 pl-6 sm:pl-2 bg-black bg-opacity-20 filter ${isMenuOpen? " " : " backdrop-blur-md"}`}>
      <div className="flex justify-between items-center p-3 px-0  pl-2 border-dark-gray w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center justify-between md:space-x-4 text-sm z-1000">
          {isMenuOpen && (
            <div className="space-y-4 fixed top-0 right-0 bottom-0 left-0 z-1000 w-full h-full bg-black flex flex-col items-center justify-center opacity-90 text-3xl font-bold z-1000">
              {/* Your mobile navigation menu goes here */}
              <ConnectWallet />
              <Link href="/migration" className="text-white hover:text-white">
                <div className="p-5 ">HOME</div>
              </Link>
              <Link href="/migration" className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1">
                <div className="p-5 ">MIGRATE PRTC</div>
              </Link>
              <Link href="/xp" className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1 ">
                <div className="p-5 ">EARN XP</div>
              </Link>
              <Link
                href="https://t.me/ZaarTradingBot"
                className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1 "
              >
                <div className="p-5 ">TELEGRAM TRADING</div>
              </Link>
              <button
                onClick={handleMenuButtonClick}
                className="p-3 text-black bg-yellow hover:text-white transform hover:-translate-y-1 text-4xl rounded-md font-bold fixed top-4 right-5"
              >
                X
              </button>
            </div>
          )}
          <div className="ml-0">
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
        <div className="lg:block hidden">
          <nav className="space-x-7 uppercase relative text-md md:ml-3 font-l flex flex-row">
            <Link href="/migration" className="contain ">
            <div className="text-yellow  hover:text-hoveryellow transform hover:-translate-y-1 ">
              Migrate PRTC
              </div>
            </Link>
            <Link href="/xp" >
              <div className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1 ">  
              Earn XP
              </div>
            </Link>
            <Link
              href="https://t.me/ZaarTradingBot"
              className="text-yellow  contain "
            >
              <div className="text-yellow  hover:text-hoveryellow transform hover:-translate-y-1 ">
              Telegram Trading
              </div>
            </Link>
          </nav>
        </div>
        <div className="w-full md:w-[760px]">
        <div className="flex flex-col w-[200px] md:w-[360px] mx-auto text-base relative z-10 align-center" ref={wrapperRef}>
          <input type="text" placeholder="Search" onChange={handleInputChange} className=" border-2 border-white border-l border-r border-t bg-black w-full px-4 py-2 rounded-sm bg-black text-white placeholder-gray-50 focus:outline-none ml-2" id="search-bar"/>
          <div className="relative">
          <div className="absolute ">

            {searching && <Link href={`/${nftData[0].id}`} className="hover:text-white text-yellow w-[200px] md:w-[360px] flex flex-row  items-center hover:bg-gray border-l border-r border-t border-white bg-black w-full px-4 py-2 rounded-sm bg-black text-white focus:outline-none ml-2" >
                      <a><div
                        className="h-10 w-10 rounded-sm mr-4 "
                        style={{ 
                          backgroundImage: nftData[0].image? `url(${nftData[0].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      /></a>
                       {nftData[0].name? nftData[0].name: " "} </Link>}
                       {searching && <Link href={`/${nftData[1].id}`} className="hover:text-white text-yellow w-[200px] md:w-[360px]  flex flex-row  items-center hover:bg-gray border-l border-r border-t border-white bg-black w-full px-4 py-2 rounded-sm bg-black text-white focus:outline-none ml-2" >
                      <div
                        className="h-10 w-10 rounded-sm mr-4 "
                        style={{ 
                          backgroundImage: nftData[1].image? `url(${nftData[1].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {nftData[1].name? nftData[1].name: " "} </Link>}
                       {searching && <Link href={`/${nftData[2].id}`} className="hover:text-white text-yellow w-[200px] md:w-[360px] flex flex-row  items-center hover:bg-gray border-l border-r border-t border-white bg-black w-full px-4 py-2 rounded-sm bg-black text-white focus:outline-none ml-2" >
                      <div
                        className="h-10 w-10 rounded-sm mr-4"
                        style={{ 
                          backgroundImage: nftData[2].image? `url(${nftData[2].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {nftData[2].name? nftData[2].name: " "} </Link>}
                       {searching && <Link href={`/${nftData[3].id}`} className="hover:text-white text-yellow w-[200px] md:w-[360px] flex flex-row  items-center hover:bg-gray border-l border-r border-t border-white bg-black w-full px-4 py-2 rounded-sm bg-black text-white focus:outline-none ml-2" >
                      <div
                        className="h-10 w-10 rounded-sm mr-4 "
                        style={{ 
                          backgroundImage: nftData[3].image? `url(${nftData[3].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {nftData[3].name? nftData[3].name: " "} </Link>}
                       {searching && <Link href={`/${nftData[4].id}`} className="hover:text-white text-yellow w-[200px] md:w-[360px] flex flex-row  items-center hover:bg-gray border-1 border-l border-r border-t border-b border-white bg-black w-full px-4 py-2 rounded-sm bg-black text-white focus:outline-none ml-2" >
                      <div
                        className="h-10 w-10 rounded-sm mr-4 "
                        style={{ 
                          backgroundImage: nftData[4].image? `url(${nftData[4].image})` : "url(/images/logo-3d.png)",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                       {nftData[4].name? nftData[4].name: " "} </Link>}
            
            </div>
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
                className="p-2 focus:outline-none lg:hidden text-light-green border border-dark-gray-all hover:border-light-green-all rounded-sm transition-colors duration-150 lg:hidden"
              >
                <svg
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
