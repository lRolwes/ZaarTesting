import React, { useState } from "react";
import ActivitySection from "./ActivitySection";
import ItemsSection from "./ItemsSection";
import TraitsSection from "./TraitsSection";
import InfoSection from "./InfoSection";
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
        ) : activeTab == "info" ? (
          <InfoSection collectionData={collectionData} />
        ): (
          <div></div>
        )}
      </div>
    );
  };
  export default NavSection;