import React, { use, useEffect, useState } from "react";
import { getAccount } from '@wagmi/core'
import { config } from './../config'
import Router from "next/router";
import toast, { Toaster } from 'react-hot-toast';

type WatchList = {
  address: string[];
  authorAddress: string;
};
const remAddress = async (
  remAddress: string,
  addresses: string[],
  id: string,
): Promise<void> => {
  await fetch(
    `http://localhost:3000/api/remItem?address=${addresses.join(",")}&listId=${id}&remAddress=${remAddress}`,
    {
      method: "PUT",
    }
  );
};
const addAddress = async (
  addAddress: string,
  addresses: string[],
  id: string
): Promise<void> => {
  await fetch(
    `http://localhost:3000/api/addItem?address=${addresses.join(",")}&listId=${id}&addAddress=${addAddress}`,
    {
      method: "PUT",
    }
  );
};

export const FavStar = ({id, defaultStatus}:{id: string, defaultStatus: boolean}) => {
  const [watchlist, setWatchlist] = useState<WatchList>({address:[], authorAddress:""});
  useEffect(() => {
    const address = getAccount(config).address;
    const loadData = async () => {
      fetchData(address? address.toString() : "").then(data => {
        //console.log(data, id)
        setWatchlist(data);
        if (data?.address.includes(id)) {
          //console.log("yes");
          setIsFav(true);
        }
        else{
          //console.log("no")
          setIsFav(false);
        }
      });
    }
    loadData();
    
  }, [id]);
  const fetchData = async (ownerAddress:string): Promise<WatchList> => {
    try {
      const response = await fetch(`http://localhost:3000/api/getWatchlist?ownerAddress=`+ownerAddress);
      let userData: WatchList = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return (
        { address: [], authorAddress: "" }
      );
    }
  };
  const [isFav, setIsFav] = useState<boolean>(defaultStatus);
  const [wallet, setWallet] = useState<string>("");
  useEffect(() => {
    let addr =  getAccount(config).address;
    addr? setWallet(addr): null;
  },[]);
  function handler() {
    if(getAccount(config).address){
    if (isFav) {
      watchlist.address = watchlist.address.filter(item => item !== id);
      remAddress(id, watchlist.address, watchlist.authorAddress);
      setIsFav(false);
    }
    else{
      addAddress(id, watchlist?.address? watchlist.address : [], watchlist?.authorAddress? watchlist.authorAddress : wallet);
      setIsFav(true);
    }}
    else{
      toast("Please connect your wallet to add to watchlist.");
    }
  }
  return (
    <div>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <button onClick={handler}>
        <svg
          fill={isFav ? `#e3bf00` : "gray"}
          height="15px"
          width="15px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <g>
              <path
                d="M492.867,181.444l-149.825-21.785L276.014,23.861c-8.187-16.59-31.844-16.589-40.031,0l-67.026,135.799L19.133,181.445
			c-18.306,2.662-25.615,25.158-12.369,38.071l108.408,105.682L89.592,474.44c-3.125,18.232,16.012,32.136,32.386,23.528
			l132.475-70.452l134.025,70.451c17.914,8.607,37.051-5.296,33.926-23.528l-25.578-149.241l108.409-105.685
			C518.482,206.601,511.173,184.105,492.867,181.444z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};
