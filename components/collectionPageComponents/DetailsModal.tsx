import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BuyModal, BidModal } from "@reservoir0x/reservoir-kit-ui";
import PriceChart from "./PriceChart";
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
        {/*view NFT modal*/}
        <div className="fixed z-50 max-w-[80%] h-[4/5] block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        
          <div className="flex flex-col">
            {/* Modal Header */}
            <div className="bg-dark-gray p-2 flex justify-end items-center rounded-sm">
              <div className="flex items-center space-x-2 text-sm">
                <button
                  onClick={() => {
                    setDetailsModal(false);
                  }}
                  className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none"
                >
                  Esc
                </button>
              </div>
            </div>
            {/* End of Modal Header */}
  
            {/* Modal Body */}
            <div className="flex flex-col lg:flex-row w-full bg-dark-gray">
              {/* Left Column - Content Area */}
              <div className="md:w-8/12 p-2">
                {/* NFT Image width={16} height ={16} and Details */}
                <div className="w-full flex flex-col items-center md:items-start">
                  {/* Left Column: Content Area */}
                  <div className="flex-1 p-0 w-full">
                    {/* Collection Name and Verification */}
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="text-yellow font-semibold hover:underline"
                      >
                        {nft?.token?.collection?.name}
                      </div>
                    </div>
  
                    {/* NFT Title */}
                    <h2 className="text-3xl font-bold text-light-green mb-3">
                      {nft?.token?.name}
                    </h2>
  
                    {/* NFT Attributes */}
                    <div className="">
                      <div className=" flex items-center">
                        {/* Rarity Ranking */}
                        <span className="mr-2 bg-gray text-gray text-xs font-semibold px-2.5 py-0.5 rounded">
                          #{Number(nft.token?.rarity).toFixed(0)}
                        </span>
                      </div>
                      <div className="text-gray mt-4">
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
                              {nft.market?.floorAsk ? (
                                <BuyModal
                                  trigger={
                                    <button
                                      type="button"
                                      className="text-black uppercase bg-yellow hover:bg-white focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                                    >
                                      Buy now
                                    </button>
                                  }
                                  token={
                                    nft.token.collection.id +
                                    ":" +
                                    nft.token.tokenId
                                  }
                                  onConnectWallet={() => {
                                    console.log("Connected");
                                  }}
                                  onPurchaseComplete={(data) =>
                                    console.log("Purchase Complete")
                                  }
                                  onPurchaseError={(error, data) =>
                                    console.log(
                                      "Transaction Error",
                                      error,
                                      data
                                    )
                                  }
                                  onClose={(data, stepData, currentStep) =>
                                    console.log("Modal Closed")
                                  }
                                />
                              ) : (
                                <div />
                              )}
  
                              <BidModal
                                trigger={
                                  <button
                                    id="btn"
                                    className="text-white uppercase bg-dark border border-gray-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                                  >
                                    Make offer
                                  </button>
                                }
                                collectionId={nft.token.collection.id}
                                onBidComplete={(data) => {
                                  console.log("Bid Complete", data);
                                }}
                                onBidError={(error, data) => {
                                  console.log(
                                    "Bid Transaction Error",
                                    error,
                                    data
                                  );
                                }}
                                onClose={(data, stepData, currentStep) => {
                                  console.log("BidModal Closed");
                                }}
                              />
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
  
                      <div className="rounded-sm overflow-hidden pb-8">
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
                <div className="flex flex-col items-center md:items-end">
                  <div className="w-full">
                    <Image
                      width={500}
                      height={500}
                      alt="NFT Image"
                      className="object-contain mb-3 rounded-sm w-full responsive max-h-[350px]"
                      src={
                        nft.token.image
                          ? nft.token.image
                          : "/images/img-placeholder.png"
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
                    <div className="max-h-[150px] overflow-y-auto p-2">
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
    );
  };
export default DetailsModal;  