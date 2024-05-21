import { useState, useEffect } from "react";
import { useTrendingCollections } from "@reservoir0x/reservoir-kit-ui";


const useTopCollections = () => {
    const { data: collections } = useTrendingCollections({
        period: "24h",
        limit: 1000,
      });
      const [collectionImage, setImage] = useState([" "]);
      const [collectionName, setName] = useState([" "]);
      const [collectionVolume, setVolume] = useState([" "]);
      const [collectionFloorPrice, setFloorPrice] = useState([" "]);
      useEffect(() => {
        if (collections) {
          let images = [];
          let names = [];
          let volumes = [];
          let floorPrices = [];
          for (let x = 0; x < 10; x++) {
            images.push(
              "url('" + collections?.[x].image?.toString() + "')" || " "
            );
            names.push(collections?.[x].name?.toString() || " ");
            volumes.push(collections?.[x].volume?.toString() || " ");
            floorPrices.push(
              collections?.[x].floorAsk?.price?.amount?.decimal?.toString() || " "
            );
          }
          setImage(images);
          setName(names);
          setVolume(volumes);
          setFloorPrice(floorPrices);
        }
      }, [collections]);
  return {
    collectionName,
    collectionImage, 
    collectionVolume,
    collectionFloorPrice,
  };
};
export default useTopCollections;
