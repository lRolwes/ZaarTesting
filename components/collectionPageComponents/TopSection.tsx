import React, { useEffect, useState } from "react";
import Link from "next/link";
import {FavStar} from "../FavStar";
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

const TopSection = ({ collectionData }: { collectionData: CollectionData }) => {
    const givenDate = new Date(
      collectionData?.createdAt ? collectionData.createdAt : ""
    );
    const currentDate = new Date();
    const differenceInMilliseconds = Number(currentDate) - Number(givenDate);
    const age = Math.floor(
      differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365.25
    );
  
    return (
      <div className=" container-fluid mx-auto px-4 py-3">
        <div className=" text-white">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <div
                className="object-cover w-16 h-16 rounded-sm"
                style={{
                  backgroundImage:
                    "url('" + collectionData?.image?.toString() + "')",
                  backgroundSize: "cover",
                  height: "16", // Set a fixed height
                  width: "16", // Set a fixed width
                }}
              ></div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-light-green">
                    {collectionData?.name}
                  </h1>
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center rounded-sm cursor-pointer text-xs font-medium text-gray">
                      <FavStar
                        id={collectionData?.id}
                        defaultStatus={false}
                      />
                    </div>
                    <div>
                      <svg
                        onClick={() => {
                          navigator.clipboard.writeText(collectionData?.id);
                        }}
                        className="ml-3 cursor-pointer  text-gray hover:text-white"
                        aria-hidden="true"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {collectionData?.discordUrl != null &&
                      collectionData?.discordUrl != "" ? (
                      <div className="ml-3 cursor-pointer">
                        <Link
                          className="text-gray hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={collectionData?.discordUrl}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.5447 2.77022C12.5249 2.3023 11.4313 1.95755 10.2879 1.76011C10.2671 1.75629 10.2463 1.76582 10.2356 1.78486C10.0949 2.03501 9.93915 2.36134 9.83006 2.61784C8.60027 2.43372 7.37679 2.43372 6.17221 2.61784C6.0631 2.35564 5.90166 2.03501 5.76038 1.78486C5.74966 1.76645 5.72886 1.75693 5.70803 1.76011C4.56527 1.95692 3.47171 2.30167 2.45129 2.77022C2.44246 2.77403 2.43488 2.78038 2.42986 2.78863C0.355594 5.88754 -0.212633 8.91028 0.0661201 11.8955C0.0673814 11.9101 0.0755799 11.9241 0.086932 11.933C1.45547 12.938 2.78114 13.5482 4.08219 13.9526C4.10301 13.9589 4.12507 13.9513 4.13832 13.9342C4.44608 13.5139 4.72043 13.0707 4.95565 12.6047C4.96953 12.5774 4.95628 12.545 4.92791 12.5342C4.49275 12.3692 4.0784 12.1679 3.67982 11.9393C3.64829 11.9209 3.64577 11.8758 3.67477 11.8543C3.75865 11.7914 3.84255 11.726 3.92264 11.66C3.93713 11.6479 3.95732 11.6454 3.97435 11.653C6.59286 12.8485 9.4277 12.8485 12.0153 11.653C12.0323 11.6447 12.0525 11.6473 12.0677 11.6593C12.1478 11.7254 12.2316 11.7914 12.3161 11.8543C12.3451 11.8758 12.3433 11.9209 12.3117 11.9393C11.9131 12.1723 11.4988 12.3692 11.063 12.5336C11.0346 12.5444 11.022 12.5774 11.0359 12.6047C11.2762 13.0701 11.5505 13.5132 11.8526 13.9335C11.8652 13.9513 11.8879 13.9589 11.9087 13.9526C13.2161 13.5482 14.5417 12.938 15.9103 11.933C15.9223 11.9241 15.9298 11.9108 15.9311 11.8962C16.2647 8.44488 15.3723 5.44693 13.5655 2.78926C13.5611 2.78038 13.5535 2.77403 13.5447 2.77022ZM5.34668 10.0778C4.55833 10.0778 3.90875 9.35406 3.90875 8.46521C3.90875 7.57635 4.54574 6.85259 5.34668 6.85259C6.15392 6.85259 6.79721 7.5827 6.78459 8.46521C6.78459 9.35406 6.14761 10.0778 5.34668 10.0778ZM10.6632 10.0778C9.87484 10.0778 9.22526 9.35406 9.22526 8.46521C9.22526 7.57635 9.86222 6.85259 10.6632 6.85259C11.4704 6.85259 12.1137 7.5827 12.1011 8.46521C12.1011 9.35406 11.4704 10.0778 10.6632 10.0778Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div />
                    )}
  
                    {collectionData?.twitterUrl != null &&
                      collectionData?.twitterUrl != "" ? (
                      <div className="ml-3 cursor-pointer">
                        <Link
                          className="text-gray hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={collectionData?.twitterUrl}
                        >
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M9.14163 7.19284L13.6089 2H12.5503L8.67137 6.50887L5.57328 2H2L6.68492 8.81821L2 14.2637H3.05866L7.15491 9.50218L10.4267 14.2637H14L9.14137 7.19284H9.14163ZM7.69165 8.87828L7.21697 8.19934L3.44011 2.79694H5.06615L8.11412 7.15685L8.5888 7.83579L12.5508 13.503H10.9248L7.69165 8.87854V8.87828Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div />
                    )}
  
                    {collectionData?.externalUrl != null &&
                      collectionData?.externalUrl != "" ? (
                      <div className="ml-3 cursor-pointer">
                        <Link
                          className="text-gray hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={collectionData?.externalUrl}
                        >
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                            />
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-1 uppercase space-x-2">
                  {collectionData?.contractKind?.substring(0, 3) == "erc" ? (
                    <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                      Ethereum
                    </span>
                  ) : (
                    <div />
                  )}
                  <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                    {collectionData?.tokenCount} ITEMS
                  </span>
                  <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                    MINTED {age}Y AGO
                  </span>
                  <span className="cursor-default text-xs font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center h-5 bg-gray uppercase mt-1">
                    {Number(collectionData?.royalties?.bps) / 100}% CREATOR FEE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default TopSection;