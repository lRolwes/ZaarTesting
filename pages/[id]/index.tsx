import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import { useRouter } from "next/router";
import axios from "axios";
import TopSection from "../../components/collectionPageComponents/TopSection";
import NavSection from "../../components/collectionPageComponents/NavSection";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  nftLookup();
  const [nftData, setNftData] = useState({
    contractKind: "",
    createdAt: "",
    name: "",
    image: "",
    id: "",
    twitterUrl: "",
    discordUrl: "",
    externalUrl: "",
    description: "",
    tokenCount: "",
    royalties: { bps: "" },
    floorAsk: { price: { amount: { decimal: 0 } } },
    topBid: { price: { amount: { decimal: 0 } } },
    floorSaleChange: { "1day": 0 },
    volume: { "1day": 0 },
    volumeChange: { "1day": 0 },
  });
  async function nftLookup() {
    const options = {
      method: "GET",
      url: `https://api.reservoir.tools/collections/v7?id=${id}`,
      headers: {
        //accept: "*/*",
        "x-api-key": "f1bc813b-97f8-5808-83de-1238af13d6f9",
      },
    };

    try {
      const response = await axios.request(options);
      setNftData(response.data.collections[0]);
      return response.data;
    } catch (error) {
      console.error(error);
      return " ";
    }
  }
  return (
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary mt-[70px]">
        <HomeHeader />
        <div>
          <TopSection collectionData={nftData} />
          {nftData ? <NavSection collectionData={nftData} /> : <div></div>}
        </div>
        <Footer />
      </main>
    </div>
  );
}