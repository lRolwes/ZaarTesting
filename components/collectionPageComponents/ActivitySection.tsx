import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
type ActivityType = {
    type: string;
    timestamp: number;
    fromAddress: string;
    toAddress: string;
    token: {
      tokenId: string;
      tokenName: string;
      tokenImage: string;
      rarityScore: number;
    };
    order: {
      source: {
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

const ActivitySection = ({ id }: { id: string }) => {
    const [activityData, setActivityData] = useState<ActivityType[]>([]);
    const [filteredActivityData, setFilteredActivityData] =
      useState<ActivityType[]>();
    const [anyFiltersApplied, setAnyFiltersApplied] = useState(false);
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
    const [continuation, setContinuation] = useState<string | null>(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
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
    async function fetchMoreActivities() {
      let lookupString = `https://api.reservoir.tools/collections/activity/v6?collection=${id}`;
      lookupString += `&continuation=${continuation}`;
      const options = {
        method: "GET",
        headers: {
          accept: "*/*",
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      const res = await fetch(`${lookupString}`, options);
      const data = await res.json();
      setContinuation(data.continuation);
      setActivityData((prevData) => [...prevData, ...data.activities]);
      return;
    }
    useEffect(() => {
      if (
        !listing ||
        !bid ||
        !mint ||
        !transfer ||
        !sale ||
        !markets.OpenSea ||
        !markets.Blur ||
        !markets.LooksRare ||
        !markets.NFTX ||
        !markets.SudoSwap ||
        !markets.MagicEden
      ) {
        setAnyFiltersApplied(true);
      } else {
        setAnyFiltersApplied(false);
      }
    }, [listing, bid, mint, transfer, sale, markets]);
    useEffect(() => {
      async function activityLookup() {
        let lookupString = `https://api.reservoir.tools/collections/activity/v6?collection=${id}`;
        const options = {
          method: "GET",
          headers: {
            accept: "*/*",
            "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
          },
        };
        const res = await fetch(`${lookupString}`, options);
        const data = await res.json();
        setContinuation(data.continuation);
        setActivityData(data.activities);
        return;
      }
      if (id) {
        activityLookup();
      }
    }, [id]);
    useEffect(() => {
      let data = activityData;
      if (search != "") {
        data = data.filter((item) => {
          return item.token?.tokenId
            ?.toLowerCase()
            .includes(search.toLowerCase());
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
      if (data.length < 20 && continuation != null) {
        fetchMoreActivities();
      }
    }, [activityData, search, listing, bid, mint, transfer, sale, markets]);
  
    return (
      <div className="">
        <div className="container-fluid mx-auto">
          <div className="bg-black text-light-green">
            {/* Activity Header */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pt-3 pb-2 md:pt-3 md:pb-2 flex gap-2  md:mx-6 z-3 px-6 md:px-0">
                <div className="flex-col-reverse sm:flex-row-reverse lg:flex-row flex w-full gap-1.5 items-center lg:justify-between">
                  <div className="relative w-full sm:max-w-90">
                    <div className="relative max-w-[350px]">
                      <div className="flex items-center rounded-sm border border-dark-gray h-10 w-full">
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
                <div className="block lg:hidden w-[200px]" >
                  <button
                    className="w-full border items-center rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
                    onClick={() => { setFiltersOpen(!filtersOpen) }}
                  >
                    Filters
                  </button>
                  {filtersOpen ?
                    <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-black z-50 no-scrollbar">
                      <div className="flex flex-row ml-4 mr-6 mt-4 justify-between font-bold text-xl">
                        <p>Filters</p>
                        <button
                          className="text-white"
                          onClick={() => { setFiltersOpen(false); }}>
                          X
                        </button>
                      </div>
                      <div className="relative">
                        <div
                          className="border mt-8 mr-4 ml-4 rounded-sm flex justify-between cursor-pointer font-medium border-dark-gray-all h-10 text-sm pl-2 text-gray items-center whitespace-nowrap truncate pr-1"
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
                          className={`dropdown-content w-full z-30 ml-4 mr-4 ${eventsDropdown ? "block" : "hidden"}`}
                        >
                          <div className="bg-dark-gray mt-2 text-light-green rounded-sm shadow-lg">
                            {/* Market Options with additional data */}
                            <label className="block cursor-pointer px-4 py-2">
                              <input
                                type="checkbox"
                                className="form-checkbox accent-yellow mr-2"
                                checked={listing}
                                onChange={() => {
                                  setListing(!listing);
                                }}
                              />
                              Listing <span className="text-xs text-gray ml-1"></span>
                            </label>
                            <label className="block cursor-pointer px-4 py-2">
                              <input
                                type="checkbox"
                                className="form-checkbox accent-yellow mr-2"
                                checked={bid}
                                onChange={() => {
                                  setBid(!bid);
                                }}
                              />
                              Bid <span className="text-xs text-gray ml-1"></span>
                            </label>
                            <label className="block cursor-pointer px-4 py-2">
                              <input
                                type="checkbox"
                                className="form-checkbox accent-yellow mr-2"
                                checked={sale}
                                onChange={() => {
                                  setSale(!sale);
                                }}
                              />
                              Sale <span className="text-xs text-gray ml-1"></span>
                            </label>
                            <label className="block cursor-pointer px-4 py-2">
                              <input
                                type="checkbox"
                                className="form-checkbox accent-yellow mr-2"
                                checked={transfer}
                                onChange={() => {
                                  setTransfer(!transfer);
                                }}
                              />
                              Transfer{" "}
                              <span className="text-xs text-gray ml-1"></span>
                            </label>
                            <label className="block cursor-pointer px-4 py-2">
                              <input
                                type="checkbox"
                                className="form-checkbox accent-yellow mr-2"
                                checked={mint}
                                onChange={() => {
                                  setMint(!mint);
                                }}
                              />
                              Mint <span className="text-xs text-gray ml-1"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    <div className="relative ml-4 mr-4 mt-10">
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
                      className={`dropdown-content z-30 mt-1 ${marketsDropdown ? "block" : "hidden"}`}
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
                          LooksRare{" "}
                          <span className="text-xs text-gray ml-1"></span>
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
                          Sudoswap{" "}
                          <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={markets.MagicEden}
                            onChange={handleMagicEdenChange}
                          />
                          MagicEden{" "}
                          <span className="text-xs text-gray ml-1"></span>
                        </label>
                      </div>
                    </div>
                    <div className ='w-full'>
                      <button
                        className="ml-4 mt-4 w-[95%] mr-4 p-4 Text white bg-gray hover:bg-white hover:text-black"
                        onClick={()=>{resetFilters();}}>
                        Clear Filters
                      </button>
                    </div>
                  </div>
                    </div>
                    : null}
                </div>
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
                            onChange={() => {
                              setListing(!listing);
                            }}
                          />
                          Listing <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={bid}
                            onChange={() => {
                              setBid(!bid);
                            }}
                          />
                          Bid <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={sale}
                            onChange={() => {
                              setSale(!sale);
                            }}
                          />
                          Sale <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={transfer}
                            onChange={() => {
                              setTransfer(!transfer);
                            }}
                          />
                          Transfer{" "}
                          <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={mint}
                            onChange={() => {
                              setMint(!mint);
                            }}
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
                          LooksRare{" "}
                          <span className="text-xs text-gray ml-1"></span>
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
                          Sudoswap{" "}
                          <span className="text-xs text-gray ml-1"></span>
                        </label>
                        <label className="block cursor-pointer px-4 py-2">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-yellow mr-2"
                            checked={markets.MagicEden}
                            onChange={handleMagicEdenChange}
                          />
                          MagicEden{" "}
                          <span className="text-xs text-gray ml-1"></span>
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
            {!markets.Blur ||
              !markets.LooksRare ||
              !markets.MagicEden ||
              !markets.NFTX ||
              !markets.OpenSea ||
              !markets.SudoSwap ? (
              <div className="flex flex-row gap-2">
                {markets.Blur ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      Blur
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          Blur: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
                {markets.OpenSea ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      OpenSea
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          OpenSea: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
                {markets.LooksRare ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      LooksRare
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          LooksRare: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
                {markets.NFTX ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      NFTX
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          NFTX: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
                {markets.SudoSwap ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      SudoSwap
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          SudoSwap: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
                {markets.MagicEden ? (
                  <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                    <span className="text-gray capitalize">Market</span>
                    <span className="capitalize text-light-green mr-1 ml-1">
                      MagicEden
                    </span>
                    <span
                      onClick={() => {
                        setMarkets((prevMarkets) => ({
                          ...prevMarkets,
                          MagicEden: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
            {sale && !(listing && sale && transfer && mint && bid) ? (
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                <span className="text-gray capitalize">Event</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Sale
                </span>
                <span
                  onClick={() => {
                    setSale(false);
                  }}
                >
                  X
                </span>
              </button>
            ) : null}
            {listing && !(listing && sale && transfer && mint && bid) ? (
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                <span className="text-gray capitalize">Event</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Listing
                </span>
                <span
                  onClick={() => {
                    setListing(false);
                  }}
                >
                  X
                </span>
              </button>
            ) : null}
            {transfer && !(listing && sale && transfer && mint && bid) ? (
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                <span className="text-gray capitalize">Event</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Transfer
                </span>
                <span
                  onClick={() => {
                    setTransfer(false);
                  }}
                >
                  X
                </span>
              </button>
            ) : null}
            {mint && !(listing && sale && transfer && mint && bid) ? (
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                <span className="text-gray capitalize">Event</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Mint
                </span>
                <span
                  onClick={() => {
                    setMint(false);
                  }}
                >
                  X
                </span>
              </button>
            ) : null}
            {bid && !(listing && sale && transfer && mint && bid) ? (
              <button className="text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center text-xs cursor-pointer hover:text-gray-600">
                <span className="text-gray capitalize">Event</span>
                <span className="capitalize text-light-green mr-1 ml-1">Bid</span>
                <span
                  onClick={() => {
                    setBid(false);
                  }}
                >
                  X
                </span>
              </button>
            ) : null}
            <div
              className={`inline-block text-xs cursor-pointer text-black font-bold px-2 py-1 bg-yellow ${!anyFiltersApplied ? " hidden " : " block "} hover:bg-hoveryellow rounded rounded-1 my-1`}
              onClick={() => {
                resetFilters();
              }}
            >
              Clear
            </div>
          </div>
  
          <div className="flex items-center gap-2 flex-wrap ml-2 mr-2 md:ml-6 md:pl-1 md:mr-8 mt-3">
            {/*Table*/}
            <div className="overflow-x-auto rounded-lg w-full min-h-[500px] ">
              <div className="table-wrapper max-h-screen overflow-y-auto no-scrollbar">
                <table className="sticky-first-column not-sticky-second-column sticky-header w-full text-sm text-left text-light-green">
                  <thead className=" whitespace-nowrap z-50 sticky top-0 text-xs uppercase text-gray">
                    <tr className="border-b border-dark-gray cursor-pointer">
                      <th scope="col" className="px-6 py-3">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left ">
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
                    {filteredActivityData &&
                      filteredActivityData.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className="dark-gray-hover cursor-pointer"
                          >
                            <td className="px-4 py-4 flex items-center">
                              <div className="bg-black border border-dark-gray-all w-[30px] h-[30px] mr-2 flex items-center justify-center rounded-lg shadow-md hover:bg-gray-800">
                                {item.order?.source?.icon && (
                                  <Image
                                    width={160}
                                    height={160}
                                    className="w-7 h-7 object-cover rounded-sm"
                                    src={item.order.source.icon}
                                    alt="Blur"
                                  />
                                )}
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
                                        {item.token.tokenImage && (
                                          <Image
                                            width={160}
                                            height={160}
                                            alt="NFT Image"
                                            className="object-cover w-full"
                                            src={item.token.tokenImage}
                                          />
                                        )}{" "}
                                      </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                      <div className="flex items-center gap-1">
                                        <div className="text-sm text-gray">
                                          {item?.token?.tokenName
                                            ? item.token.tokenName
                                            : null}
                                        </div>
                                      </div>
                                      <div className="inline-block">
                                        <div className="bg-gray rounded-md h-5 px-2 inline-flex items-center justify-center">
                                          <div className="text-light-green text-xs">
                                            <div>
                                              {" "}
                                              {item.token?.rarityScore
                                                ? item.token.rarityScore
                                                : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {item.price?.amount?.decimal
                                ? item.price.amount.decimal
                                : null}{" "}
                              <i className="fab fa-ethereum"></i>
                              <br />
                              <span className="text-xs text-gray">
                                36% above floor
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right text-light-green">
                              <div className="truncate undefined">
                                {item.fromAddress
                                  ? item.fromAddress.slice(0, 4) +
                                  "..." +
                                  item.fromAddress.slice(-4)
                                  : null}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-green-500">
                              <div>
                                {item.toAddress
                                  ? item.toAddress.slice(0, 4) +
                                  "..." +
                                  item.toAddress.slice(-4)
                                  : null}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {item.timestamp
                                ? (() => {
                                  const diffInMinutes = Math.floor(
                                    (new Date().getTime() -
                                      new Date(
                                        item.timestamp * 1000
                                      ).getTime()) /
                                    (1000 * 60)
                                  );
                                  if (diffInMinutes < 60) {
                                    return diffInMinutes + "M ago";
                                  } else {
                                    return (
                                      Math.floor(diffInMinutes / 60) + "H ago"
                                    );
                                  }
                                })()
                                : null}
                              <br />
                              <span className="text-xs text-gray">
                                {item.timestamp
                                  ? new Date(
                                    item.timestamp * 1000
                                  ).toLocaleString()
                                  : null}
                              </span>
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
  export default ActivitySection;