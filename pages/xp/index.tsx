import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import { XpHeader } from "../../components/XPHeader";
import useBalance from "../../hooks/Balance";
import { useAccount } from "wagmi";
const HeroContent = () => {
  const { xPrtcBalance, refetchBalance } = useBalance();
  const { address } = useAccount();
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const url = `https://offchain-masterchef-e5a6ec82d362.herokuapp.com/rewards?address=${address ? address : "0x0000000000000000000000000000000000000000"}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRewards(data.rewards))
      .catch((error) => console.error("Error:", error));
    }, [address]);

  return (
    <div className="pb-0 flex content-center items-center justify-center bg-hero min-h-screen">
      <div className="fixed absolute w-full h-full bg-center bg-cover z-10">
        <Image src="/images/bg-xp.jpg" alt="" layout="fill" objectFit="cover" />
      </div>
      {/* Hero Content */}
      <div className="relative mx-auto z-20 mt-0 pt-20 mb-24">
        <div className="text-center text-white">
          <Image
            src="/images/xp.png"
            className="w-24 sm:w-24 mx-auto"
            alt="logo"
            width={700}
            height={700}
          />
          <h1 className="text-3xl font-bold mb-3 text-white uppercase mt-3 mb-4">
            Level up with Zaar XP
          </h1>

          <section className="bg-black text-white py-3 bg-opacity-60 rounded-sm pb-0">
            <div className="max-w-2xl mx-auto text-center">
              {/* Stats Section */}
              <div className="flex flex-row justify-around items-center text-center mb-4">
                <div className="flex flex-col items-center text-sm sm:text-xl">
                  <span className="text-white font-medium uppercase mr-2">
                    My XP
                  </span>
                <span className="text-yellow font-bold gradient-yellow-orange filter blur">COMING SOON
                    {/*{rewards?Math.round(rewards):0}*/}
                  </span>
                </div>
                <div className="flex flex-col items-center text-sm sm:text-xl ">
                  <span className="text-white font-medium uppercase mr-2 ">
                    My Rank
                  </span>
                  <span className="text-yellow font-bold gradient-yellow-orange filter blur">COMING SOON</span>
                </div>
                <div className="flex flex-col items-center text-sm sm:text-xl">
                  <span className="text-white font-medium uppercase mr-2">
                    Global XP
                  </span>
                  <span className="text-yellow font-bold gradient-yellow-orange filter blur">COMING SOON</span>
                </div>
              </div>
              {/* Card Section */}
              <div className="bg-sky-950 bg-opacity-20 p-4 rounded-sm">
                <h3 className="text-3xl uppercase text-white mb-4">
                  How It Works
                </h3>
                {/* Titles 1 and 2 */}
                <div className="mb-6">
                  <h4 className="text-lg text-yellow font-bold uppercase mb-6">
                    Collect XP and earn rewards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg text-white uppercase font-bold mb-2">
                        Your Actions, Rewarded
                      </h4>
                      <p className="mb-2 text-light-green text-sm max-w-48 sm:max-w-64 mx-auto">
                        Protocol actions reward XP. Users can redeem XP for
                        $ZAAR.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg text-white uppercase font-bold mb-2">
                        Increase Earnings
                      </h4>
                      <p className="mb-2 text-light-green text-sm max-w-48 sm:max-w-64 mx-auto">
                        Max lock your $ZAAR to maximise your XP earning
                        potential. (Coming Soon)
                      </p>
                    </div>
                  </div>
                </div>

                {/*{/* Titles 3 and 4 */}
                <div className="mb-6">
                  <h4 className="text-lg text-yellow font-bold uppercase mb-2 gradient-yellow-orange filter blur-tiny">
                    Coming soon
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary">
        <XpHeader />
        <HeroContent />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
