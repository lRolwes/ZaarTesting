import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

const TraitsSection = ({ id }: { id: string }) => {
    const [traitData, setTraitData] = useState<TraitCategoryType[]>([]);
  
    useEffect(() => {
      async function traitLookup<TraitCategoryType>(): Promise<
        TraitCategoryType[]
      > {
        let lookupString = `https://api.reservoir.tools/collections/${id}/attributes/all/v4`;
        const options = {
          method: "GET",
          url: `${lookupString}`,
          headers: {
            //accept: "*/*",
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
      async function traitMetadataLookup<TraitCategoryType>(
        key: string
      ): Promise<TraitCategoryType[]> {
        let lookupString = `https://api.reservoir.tools/collections/${id}/attributes/explore/v5?attributeKey=${key}&limit=500`;
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
          for (let category in traits) {
            let values = await traitMetadataLookup<TraitType>(
              traits[category].key
            );
            traits[category].values = values;
          }
          setTraitData(traits);
        };
        fetchTraitData();
      }
    }, [id]);
    return (
      <div className="px-6 flex flex-col">
        {traitData.map((category, index) => {
          return (
            <div className=" ml-3 text-xl text-white mb-8 " key={index}>
              {" "}
              <p className="font-bold text-lg text-light-green uppercase">
                {category.key}
                {" (" + category.attributeCount + ")"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
                {category.values.map((trait, index) => {
                  return (
                    <div key={index} className="flex flex-row p-2">
                      <Image
                        src={trait.sampleImages[0]}
                        width={100}
                        height={100}
                        alt="img"
                      />
                      <div className="ml-4 flex flex-col mr-4">
                        <div className="md:whitespace-nowrap whitespace-normal mr-2 text-md font-bold text-blue">{trait.value}</div>
                        <div className="text-gray text-sm">{trait.floorAskPrices[0]}</div>
                        <div className="text-gray text-sm">{trait.tokenCount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
export default TraitsSection;  