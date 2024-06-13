import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import axios from "axios";
import { getAccount } from "@wagmi/core";
import { config } from "./../../config";
import TokenCard from "./TokenCard";
import DetailsModal from "./DetailsModal";

export type TokenType = {
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
function FilterSection({ id, count }: { id: string; count: number }) {
    //stores raw token Data
    const [tokenData, setTokenData] = useState<TokenType[]>([]);
    //stores most recent continuation hash
    const [continuation, setContinuation] = useState<string | null>(null);
    //stores filtered token data
    const [filteredTokenData, setFilteredTokenData] = useState<TokenType[]>([]);
    //mobile filters page opened
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
    const [statusFilter, setStatusFilter] = useState(false);
    const [listedFilter, setListedFilter] = useState(false);
    const [newFilter, setNewFilter] = useState(false);
    const [offersFilter, setOffersFilter] = useState(false);
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
      setListedFilter(false);
      setNewFilter(false);
      setOffersFilter(false);
      setStatusFilter(!statusFilter);

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
    function closeAllDropDowns() {
      setStatus(false);
      setRarity(false);
      setPrice(false);
      setSortOpen(false);
      setTraitsOpen(false);
      setMarket(false);
      return;
    }
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

    //Clears All filter Values
    function clearFilters(){
        closeAllDropDowns();
        resetTraitFilters();
    setSort("floorAskPrice");
    setSortDirection("asc");
    setSearch("");
    setStatus(false);
    setStatusFilter(false);
    setPrice(false);
    setPriceFloor(0);
    setPriceCeiling(1000000);
    setActivePriceFloor(0);
    setActivePriceCeiling(10000);
    setRarity(false);
    setActiveRarityFloor(0);
    setActiveRarityCeiling(10000);
    setRarityFloor(1);
    setRarityCeiling(10000);
    setMarkets({
      OpenSea: true,
      LooksRare: true,
      Blur: true,
      NFTX: true,
      SudoSwap: true,
      MagicEden: true,
    });
    setMyItems(false);
        return;
    }
    async function moreDataLookup(cont: string | null) {
      let lookupString = `https://api.reservoir.tools/tokens/v7?collection=${id}`;
      if (search != "") {
        lookupString += `&tokenName=${search}`;
      }
      if (activePriceFloor > 0) {
        lookupString += `&minFloorAskPrice=${activePriceFloor}`;
      }
      if (activePriceCeiling < 10000) {
        lookupString += `&maxFloorAskPrice=${activePriceCeiling}`;
      }
      if (
        activeRarityFloor >= 1 &&
        activePriceFloor <= 0 &&
        activePriceCeiling >= 10000
      ) {
        lookupString += `&minRarityRank=${activeRarityFloor}`;
      }
      if (
        activeRarityCeiling < 10000 &&
        activePriceFloor <= 0 &&
        activePriceCeiling >= 10000
      ) {
        lookupString += `&maxRarityRank=${activeRarityCeiling}`;
      }
      if (sort == "floorAskPrice") {
        lookupString += "&sortBy=floorAskPrice";
      }
      if (sort == "rarity") {
        lookupString += "&sortBy=rarity";
      }
      if (sort == "listedAt") {
        lookupString += "&sortBy=listedAt";
      }
      if (sortDirection == "desc") {
        lookupString += "&sortDirection=desc";
      }
      if (traitFilterApplied) {
        for (let attribute in traitFilterSelection) {
          if (traitFilterSelection[attribute]) {
            let parts = attribute.split(":");
            lookupString += `&attributes[${parts[0]}]=${parts[1]}`;
          }
        }
      }
      lookupString +=
        "&includeTopBid=true&includeLastSale=true&includeAttributes=true&limit=100";
      if (cont != null) {
        lookupString += `&continuation=${cont}`;
      }
  
      const options = {
        method: "GET",
        url: `${lookupString}`,
        headers: {
          "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
        },
      };
      try {
        const response = await axios.request(options);
        const data = response.data;
        console.log(response.data);
        setContinuation(response.data.continuation);
        setTokenData((prevData) => [...prevData, ...data.tokens]);
        return;
      } catch (error) {
        console.error(error);
        return;
      }
    }
    // UseEffect to get and store all tokens in the collection and store in tokenData
    useEffect(() => {
      async function nftLookup() {
        let lookupString = `https://api.reservoir.tools/tokens/v7?collection=${id}`;
        if (search != "") {
          lookupString += `&tokenName=${search}`;
        }
        if (activePriceFloor > 0) {
          lookupString += `&minFloorAskPrice=${activePriceFloor}`;
        }
        if (activePriceCeiling < 10000) {
          lookupString += `&maxFloorAskPrice=${activePriceCeiling}`;
        }
        if (
          activeRarityFloor >= 1 &&
          activePriceFloor <= 0 &&
          activePriceCeiling >= 10000
        ) {
          lookupString += `&minRarityRank=${activeRarityFloor}`;
        }
        if (
          activeRarityCeiling < 10000 &&
          activePriceFloor <= 0 &&
          activePriceCeiling >= 10000
        ) {
          lookupString += `&maxRarityRank=${activeRarityCeiling}`;
        }
        if (sort == "floorAskPrice") {
          lookupString += "&sortBy=floorAskPrice";
        }
        if (sort == "rarity") {
          lookupString += "&sortBy=rarity";
        }
        if (sort == "listedAt") {
          lookupString += "&sortBy=listedAt";
        }
        if (sortDirection == "desc") {
          lookupString += "&sortDirection=desc";
        }
        if (traitFilterApplied) {
          for (let attribute in traitFilterSelection) {
            if (traitFilterSelection[attribute]) {
              let parts = attribute.split(":");
              lookupString += `&attributes[${parts[0]}]=${parts[1]}`;
            }
          }
        }
        lookupString +=
          "&includeTopBid=true&includeLastSale=true&includeAttributes=true&limit=100";
        const options = {
          method: "GET",
          url: `${lookupString}`,
          headers: {
            "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
          },
        };
        try {
          const response = await axios.request(options);
          const data = response.data;
          setContinuation(response.data.continuation);
          console.log(continuation);
          console.log(response.data);
          return data.tokens;
        } catch (error) {
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
    }, [
      id,
      count,
      search,
      sort,
      sortDirection,
      activePriceFloor,
      activePriceCeiling,
      activeRarityFloor,
      activeRarityCeiling,
      traitFilterApplied,
      traitFilterSelection,
    ]);
  
    useEffect(() => {
      let nftData = tokenData;
      if (statusFilter  && nftData.length > 0) {
        nftData = nftData.filter(
          (item: TokenType) => ((listedFilter && item.market?.floorAsk?.price?.amount?.decimal > 0) ||
           (newFilter && item.market?.floorAsk?.validFrom > Date.now() - 604800000) || 
           (offersFilter && item.market?.topBid?.price?.amount?.decimal > 0))
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
      if (nftData.length < 50 && continuation != null) {
        console.log(continuation);
        moreDataLookup(continuation);
        setContinuation(null);
      }
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
      listedFilter,
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
                [attribute + ":" + value]: false,
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
              <div className="relative w-full ">
                {/* Lowest Price Filter Dropdown Container */}
                <div className="relative">
                  <button
                    className="w-full"
                    onClick={() => {
                      if (sortOpen) {
                        closeAllDropDowns();
                      } else {
                        closeAllDropDowns();
                        setSortOpen(true);
                      }
                    }}
                  >
                    <div className="w-full text-gray cursor-pointer truncate border border-dark-gray-all rounded-sm flex justify-between items-center text-sm px-4 h-10 bg-black text-gray outline-none focus:outline-none h-10 text-gray">
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
                    <div className="bg-dark-gray mt-2 text-gray rounded-sm shadow-lg">
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
                className="text-lg  hover:border-gray-400 flex items-center justify-center rounded-sm cursor-pointer px-2  text-gray border border-dark-gray-all  h-10 w-full lg:hidden rounded-sm text-sm text-gray"
                onClick={()=>setMobileFiltersOpen(true)}
              >
                Filters
              </button>
              {mobileFiltersOpen? 
                <div className="z-50 fixed w-screen h-screen top-0 left-0 bg-black">
                    <div className = "flex flex-col w-full h-full text-xl text-white font-bold">
                        <div className="flex flex-row justify-between mr-8 ml-8 mt-4">
                            <p>Filters</p>
                            <button  onClick={()=>{setMobileFiltersOpen(false)}}>X</button>
                        </div>
                        <div className="lg:hidden gap-1.5 items-center mt-10 ml-4 mr-4">
            {/*Mobile Status filter */}
            <div className="relative mb-4">
              <div
                onClick={() => {
                  if (status) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setStatus(true);
                  }
                }}
                className="cursor-pointer bg-black text-white border hover:bg-slate-800 border-gray rounded px-4 flex justify-between items-center h-10"
              >
                Status
                {status ? (
                  <FaChevronUp className="text-gray-400 ml-2" />
                ) : (
                  <FaChevronDown className="text-gray-400 ml-2" />
                )}
              </div>
              <div
                className={`absolute dropdown-content w-full bg-light-gray z-30 w-full mt-1 ${status ? "" : "hidden"} z-30`}
              >
                <div className="bg-gray text-light-green rounded-sm">
                  <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="radio"
                      name="statusMobile"
                      value=" All"
                      className="ml-2 form-radio accent-yellow mr-2"
                      onChange={handleStatusChange}
                      checked={!statusFilter}
                    />
                    All
                  </label>
                  <label className="block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="statusMobile"
                      value="listed"
                      className=" ml-2 form-radio accent-yellow mr-2"
                      onChange={()=>{
                        setStatusFilter(true);
                        setListedFilter(!listedFilter);
                        }}
                      checked={statusFilter && listedFilter}
                    />
                    Listed
                  </label>
                  <label className="block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="statusMobile"
                      value="new"
                      className=" ml-2 form-radio accent-yellow mr-2"
                      onChange={()=>{
                        setStatusFilter(true);
                        setNewFilter(!newFilter);
                        }}
                      checked={statusFilter && newFilter}
                    />
                    New
                  </label>
                  <label className="block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="statusMobile"
                      value="Has Offers"
                      className=" ml-2 form-radio accent-yellow mr-2"
                      onChange={()=>{
                        setStatusFilter(true);
                        setOffersFilter(!offersFilter);
                        }}
                      checked={offersFilter && offersFilter}
                    />
                    Has Offers
                  </label>
                  
                </div>
              </div>
            </div>
  
            {/*Mobile Price filter */}
            <div className="relative mb-4">
              <div
                onClick={() => {
                  if (price) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setPrice(true);
                  }
                }}
                className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
              >
                Price
                {price ? (
                  <FaChevronUp className="text-gray-400 ml-2" />
                ) : (
                  <FaChevronDown className="text-gray-400 ml-2" />
                )}
              </div>
              <div
                className={`absolute bg-gray dropdown-content w-full z-30 mt-1 ${price ? "  " : "hidden"}`}
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
                      setPrice(false);
                    }}
                    className="px-2 py-2 bg-yellow text-black font-bold rounded-sm text-xs uppercase mr-2 mb-2"
                  >
                    <span className="inline-block whitespace-nowrap">Apply</span>
                  </button>
                </div>
              </div>
            </div>
  
            {/*Mobile Rarity filter */}
            <div className="relative mb-4">
              <div
                onClick={() => {
                  if (rarity) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setRarity(true);
                  }
                }}
                className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
              >
                Rarity
                {rarity ? (
                  <FaChevronUp className="text-gray-400 ml-2" />
                ) : (
                  <FaChevronDown className="text-gray-400 ml-2" />
                )}
              </div>
              <div
                className={`absolute bg-gray dropdown-content w-full z-30 mt-1 ${rarity ? "  " : "hidden"}`}
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
                      setRarity(false);
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
                  if (market) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setMarket(true);
                  }
                }}
                className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                className={`absolute bg-dark-gray dropdown-content w-full z-30 mt-1 ${market ? "block" : "hidden"}`}
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
                  if (traitsOpen) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setTraitsOpen(true);
                  }
                }}
                className="cursor-pointer hover:bg-slate-800 bg-black text-white border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                className={`z-30 ${traitsOpen ? "block" : "hidden"} absolute mt-1  bg-dark-gray border-gray-all rounded-sm shadow-lg w-full h-[330px]`}
              >
                <div className="p-4 h-full">
                  {/* Search and Rarity Filter */}
                  <div className="flex justify-between pb-3 border-dark-gray-all">
                    <div className="flex-1 mr-2">
                      <input
                        type="text"
                        placeholder="Search for Traits"
                        onChange={handleTraitSearchInputChange}
                        className="w-full px-3 py-2 bg-black focus:none text-gray rounded-sm"
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
                                              traitFilterSelection[
                                              thisTraitCategory.key +
                                              ":" +
                                              traitval.value
                                              ]
                                            }
                                            onChange={() => {
                                              handleTraitFilterSelectionChange(
                                                thisTraitCategory.key +
                                                ":" +
                                                traitval.value
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
              <button
                onClick={()=>{clearFilters();}}
                    className="mt-4 py-2 w-full rounded rounded-sm  h-50px bg-gray hover:bg-slate-800">
                        Clear Filters
                    </button>
            </div>
          </div>
                    </div>
                </div>
              : null}
            </div>
            <div className="relative w-full">
              <div className="relative lg:max-w-[350px]">
                <div className="flex items-center ">
                  <input
                    type="text"
                    placeholder="Search for tokens"
                    onChange={handleSearchInputChange}
                    className=" border-2 border-dark-gray border-l border-r border-t bg-black w-full px-4 py-2 rounded-sm bg-black text-white placeholder-gray-50 focus:outline-none lg:ml-2 h-10"
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
                  if (status) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setStatus(true);
                  }
                }}
                className="cursor-pointer bg-black text-gray border border-gray rounded px-4 flex justify-between items-center h-10"
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
                      value="all"
                      className=" ml-2 form-radio accent-yellow mr-2"
                      onChange={handleStatusChange}
                      checked={!statusFilter}
                    />
                    All
                  </label>
                  <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="status"
                      value="listed"
                      className="ml-2 form-radio accent-yellow mr-2"
                      onChange={
                        ()=>{
                          setListedFilter(!listedFilter);
                          setStatusFilter(true);
                        }}
                      checked={listedFilter && statusFilter}
                    />
                    Listed
                  </label>
                  <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="status"
                      value="new"
                      className="ml-2 form-radio accent-yellow mr-2"
                      onChange={
                        ()=>{
                          setNewFilter(!newFilter);
                          setStatusFilter(true);
                        }}
                      checked={newFilter && statusFilter}
                    />
                    New
                  </label>
                  <label className="bg-gray block cursor-pointer px-4 py-2 pl-0">
                    <input
                      type="checkbox"
                      name="status"
                      value="has offers"
                      className="ml-2 form-radio accent-yellow mr-2"
                      onChange={
                        ()=>{
                          setOffersFilter(!offersFilter);
                          setStatusFilter(true);
                        }}
                      checked={offersFilter && statusFilter}
                    />
                    Has Offers
                  </label>
                </div>
              </div>
            </div>
  
            {/* Price filter */}
            <div className="relative mb-4">
              <div
                onClick={() => {
                  if (price) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setPrice(true);
                  }
                }}
                className="cursor-pointer bg-black text-gray border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                  if (rarity) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setRarity(true);
                  }
                }}
                className="cursor-pointer bg-black text-gray border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                  if (market) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setMarket(true);
                  }
                }}
                className="cursor-pointer bg-black text-gray border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                  if (traitsOpen) {
                    closeAllDropDowns();
                  } else {
                    closeAllDropDowns();
                    setTraitsOpen(true);
                  }
                }}
                className="cursor-pointer  bg-black text-gray border border-gray rounded py-2 px-4 flex justify-between items-center h-10 "
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
                                              traitFilterSelection[
                                              thisTraitCategory.key +
                                              ":" +
                                              traitval.value
                                              ]
                                            }
                                            onChange={() => {
                                              handleTraitFilterSelectionChange(
                                                thisTraitCategory.key +
                                                ":" +
                                                traitval.value
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

              <span className="text-xs text-gray mr-2 ml-2">
                {filteredTokenData.length==100? filteredTokenData.length+"+" : filteredTokenData.length} results
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-row items-center flex-wrap md:ml-2 md:pl-2">
              <div
                className={`${statusFilter && listedFilter ? "block" : "hidden"} ml-2 text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center justify-center text-xs`}
              >
                <span className="text-gray capitalize">Status</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Listed
                </span>
                <i
                  className="cursor-pointer font-bold"
                  onClick={() => {
                    setListedFilter(false);
                  }}
                >
                  X
                </i>
              </div>
              <div
                className={`${statusFilter && offersFilter ? "block" : "hidden"} ml-2 text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center justify-center text-xs`}
              >
                <span className="text-gray capitalize">Status</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  Has Offer
                </span>
                <i
                  className="cursor-pointer font-bold"
                  onClick={() => {
                    setOffersFilter(false);
                  }}
                >
                  X
                </i>
              </div>

              <div
                className={`${statusFilter && newFilter ? "block" : "hidden"} ml-2 text-gray px-2 rounded-sm bg-gray flex py-0.5 items-center justify-center text-xs`}
              >
                <span className="text-gray capitalize">Status</span>
                <span className="capitalize text-light-green mr-1 ml-1">
                  New
                </span>
                <i
                  className="cursor-pointer font-bold"
                  onClick={() => {
                    setNewFilter(false);
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
            
            <div className="z-20 min-h-[500px] mb-[50px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-8 gap-4 px-2 py-4">
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
          ) : (
            <div>Loading...</div>
          )}
          <div className="flex justify-center">
            <button 
            onClick={()=>{moreDataLookup(continuation);}}
            className ="p-2 bg-yellow hover:bg-hoveryellow text-black rounded-md mb-[200px] font-bold">
              Load More Tokens
            </button>
            </div>
          {detailsModal && detailsToken ? (
            <DetailsModal setDetailsModal={setDetailsModal} nft={detailsToken} />
          ) : null}
        </div>
      </div>
    );
  }
  export default FilterSection;