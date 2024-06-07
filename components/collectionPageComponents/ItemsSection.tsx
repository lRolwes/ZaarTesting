import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
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
            className={`lg:max-w-[50%] md:flex-1 md:mr-4 text-gray ${isTextExpanded ? "" : "line-clamp-2"}`}
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
export default ItemsSection;