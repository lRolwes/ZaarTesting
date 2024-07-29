import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BuyModal, BidModal, Trait } from "@reservoir0x/reservoir-kit-ui";
import { FaEthereum } from 'react-icons/fa';

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
function TokenCard({
    collectionId,
    setDetailsToken,
    setDetailsModal,
    nft,
  }: {
    collectionId: string;
    setDetailsToken: (detailsToken: TokenType) => void;
    setDetailsModal: (detailsModal: boolean) => void;
    nft: TokenType;
  }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div onMouseEnter={()=>{setIsHovered(true);}} onMouseLeave={()=>{setIsHovered(false);}} className="max-w-[250px] max-h-[450px] bg-dark-gray text-white rounded-xl flex flex-col  group relative overflow-hidden">
        <div className="px-3 py-1.5">
          <span className="text-light-green text-xs font-medium">
            Rarity #{Number(nft.token.rarity).toFixed(0)}
          </span>
        </div>
        <div className="flex-1 relative flex justify-center items-center">
          <div className="object-cover w-[350px] max-h-[260px] bg-gray-200 overflow-hidden">
            {nft.token.image != " " ? (
              <Image
                src={
                  nft.token.image
                    ? nft.token.image.toString()
                    : "/images/img-placeholder.png"
                }
                alt="Token"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src="/images/img-placeholder.png";
                }}
                style={{ objectFit: "cover" }}
                className={`responsive transition-transform duration-500 ease-in-out transform ${isHovered? "scale-110":""}`}
                width={350}
                height={260}
              />
            ) : (
              <div className="object-cover w-[350px] h-[260px] bg-gray-200"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="mb-1.5 flex items-center gap-1 text-white text-sm">
            {nft.token.name}
          </div>
          <div className="flex justify-between items-center mb-1 relative">
            <button
              type="button"
              className="flex items-center justify-center px-2 py-1.5 text-sm font-medium text-white  border border-dark-gray-all gray hover:border-gray-400 rounded"
            >
              {nft.market?.floorAsk?.price?.amount?.decimal?.toFixed(3)} <FaEthereum className="ml-1"/>
            </button>
            <a
              id="btn"
              className="border font-medium text-xs text-light-green border-dark-gray-all rounded hover:bg-gray hover:text-white hover:border-gray-400 px-1.5 h-6 flex items-center cursor-pointer"
              onClick={() => {
                setDetailsToken(nft);
                setDetailsModal(true);
              }}
            >
              Details
            </a>
          </div>
          <div className="flex justify-between">
            <div className="text-xs -mx-3 mb-2 px-3 py-1 text-light-green flex items-center">
              Last{" "}
              {nft.token.lastSale?.price?.amount?.decimal != undefined
                ? nft.token.lastSale?.price?.amount?.decimal + " "
                : "-- "}
              ETH
              <i className="fas fa-history ml-1"></i>
            </div>
          </div>
        </div>
        {/* Buy Now Button */}
        <div className={`absolute inset-x-0 bottom-0  ${isHovered? "translate-y-0 transition-transform":"translate-y-full transition-transform"}`}>
          {nft.market?.floorAsk ? (
            <BuyModal
              trigger={
                <button className="w-full py-2 bg-yellow text-black uppercase text-sm font-bold rounded-b-xl ">
                  Buy Now
                </button>
              }
              token={collectionId + ":" + nft.token.tokenId}
              onConnectWallet={() => {
                console.log("Connected");
              }}
              onPurchaseComplete={(data) => console.log("Purchase Complete")}
              onPurchaseError={(error, data) =>
                console.log("Transaction Error", error, data)
              }
              onClose={(data, stepData, currentStep) =>
                console.log("Modal Closed")
              }
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
export default TokenCard;  