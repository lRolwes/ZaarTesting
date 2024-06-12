import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AcceptBidModal } from '@reservoir0x/reservoir-kit-ui'
type TokenType = 
{
    rarityScore: number;
    tokenId: string;
    rarity: string;
    image: string;
    name: string;
    floorAsk: {
      price: {
        amount: {
          decimal: number;
          usd: number;
        };
      };};
    topBid: {
      id: string;
      price: {
        amount: {
          decimal: number;
        };
      };
    };
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
const OffersSection = ({ id }: { id: string | undefined }) => {
  const [bids, setBids] = useState<
  {
    price: {
        amount: {
            decimal: number;
            usd: number;
        };
    };
    id: string;
    validFrom: number;
    validUntil: number;
    token: TokenType;
  }[]>();
  useEffect(() => {
    async function bidLookup() {
        let bidItems = [];
        let lookupString = `https://api.reservoir.tools/orders/users/${id}/top-bids/v4`;
        const options = {
            method: "GET",
            headers: {
                accept: "*/*",
                "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
            },
        };
        let res = await fetch(`${lookupString}`, options);
        let data = await res.json();
        bidItems.push(...data.topBids);
        while(data.continuation != null){
            let newlookupString = lookupString + `?continuation=${data.continuation}`;
            res = await fetch(`${newlookupString}`, options);
            data = await res.json();
            bidItems.push(...data.topBids);
        }
        setBids(bidItems);
        console.log(bidItems)
        return;
    }
    if (id) {
      bidLookup();
    }
  }, [id]);
  

  return (
    <div className="bg-dark-gray">
      <div className="container-fluid mx-auto">
        <div className="bg-dark-gray text-light-green">
          {/* Activity Header */}
          <div className="bg-dark-gray flex items-center justify-between">
            <div className="flex-1 pt-3 pb-2 md:pt-3 md:pb-2 flex gap-2  md:mx-6 z-3 px-6 md:px-0">
              <div className="flex-col-reverse sm:flex-row-reverse lg:flex-row flex w-full gap-1.5 items-center lg:justify-between">
                <div className="relative w-full sm:max-w-90">
                  <div className="relative max-w-[350px]">
                    <p>OFFERS RECIEVED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap ml-2 mr-2 md:ml-6 md:pl-1 md:mr-8 mt-3">
          {/*Table*/}
          <div className = "w-full h-full bg-dark-gray">
          <div className="bg-gray overflow-x-auto rounded-lg w-full min-h-[500px] ">
            <div className="table-wrapper max-h-screen overflow-y-auto no-scrollbar">
              <table className="bg-gray sticky-first-column not-sticky-second-column sticky-header w-full text-sm text-left text-light-green">
                <thead className=" whitespace-nowrap z-50 sticky top-0 text-xs uppercase text-light-gray bg-gray">
                  <tr className="border-b border-dark-gray cursor-pointer bg-gray">
                    <th scope="col" className="px-6 py-3 bg-gray">
                      Offer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left bg-gray">
                      Unit Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray">
                      USD Unit Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray">
                      Expiration
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray ">
                      Recieved
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray">
                      
                    </th>
                    <th scope="col" className="px-6 py-3 text-right bg-gray">
                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bids &&
                    bids.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="dark-gray-hover cursor-pointer"
                        >
                          <td className="px-2 py-0 text-right">
                            <div
                              className="flex items-center text-sm overflow-hidden last:pr-4"
                              role="cell"
                            >
                              <div className="overflow-hidden">
                                <div className="flex items-center w-full overflow-hidden">
                                  <div className="mr-2">
                                    <div className="relative overflow-hidden rounded-sm w-[30px] h-[30px]">
                                      {item.token.image && (
                                        <Image
                                          width={160}
                                          height={160}
                                          alt="NFT Image"
                                          className="object-cover w-full"
                                          src={item.token.image}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                      <div className="text-sm text-gray">
                                        {item?.token?.name
                                          ? item.token.name
                                          : null}
                                      </div>
                                    </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item?.price?.amount?.decimal
                              ? item.price.amount.decimal
                              : null}{" "}
                            <br />
                            <span className="text-xs text-gray">
                              36% above floor
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.price?.amount?.usd
                              ? item.price.amount.usd
                              : null}{" "}
                            <br />
                            <span className="text-xs text-gray">
                              36% above floor
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            1
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.validUntil
                              ? (() => {
                                  const diffInMinutes = Math.floor(
                                    (new Date(
                                        item.validUntil * 1000
                                      ).getTime()-new Date().getTime()) /
                                      (1000 * 60)
                                  );
                                  if (diffInMinutes < 60) {
                                    return diffInMinutes + "M ago";
                                  } else if(diffInMinutes < 1440) {
                                    return (
                                      Math.floor(diffInMinutes / 60) + "H ago"
                                    );
                                  }
                                  else{
                                    return (
                                      Math.floor(diffInMinutes / 1440) + "D ago"
                                    );
                                  }
                                })()
                              : null}
                            <br />
                            <span className="text-xs text-gray">
                              {item.validUntil
                                ? new Date(
                                    item.validUntil * 1000
                                  ).toLocaleString()
                                : null}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.validFrom
                              ? (() => {
                                  const diffInMinutes = Math.floor(
                                    (new Date().getTime() -
                                      new Date(
                                        item.validFrom * 1000
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
                              {item.validFrom
                                ? new Date(
                                    item.validFrom * 1000
                                  ).toLocaleString()
                                : null}
                            </span>
                          </td>
                          <td>
                          <AcceptBidModal
                            trigger={
                                <button
                                className="bg-dark-gray text-white hover:bg-light-gray p-2">
                                Accept Bid
                                </button>
                            }
                            tokens={[{
                                tokenId: item.token.tokenId,
                                collectionId: item.token?.collection?.id,
                                bidIds: [item.id] //Optional
                            }]}
                            onBidAccepted={(data) => {
                                console.log('Bid Accepted', data)
                            }}
                            onBidAcceptError={(error, data) => {
                                console.log('Bid Acceptance Error', error, data)
                            }}
                            onClose={(data, stepData, currentStep) => {
                                console.log('AcceptBidModal Closed')
                            }}
                            />
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
    </div>
  );
};
export default OffersSection;
