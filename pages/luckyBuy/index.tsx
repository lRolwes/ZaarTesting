import React from "react";
import Image from "next/image";
import { useState } from "react";
import {HomeHeader } from "../../components/HomeHeader";
import { Footer } from "../../components/Footer";

export const LuckyBuy = () => {
    //const output = document.getElementById("slider-output");
    const [odds, setOdds] = useState(3);
    const percentages = ["1%", "15%", "30%", "45%", "60%", "75%"];
    function updateSliderLabelPosition(){
        const x=3;
        return;
    }
  
  return (
    <div className="bg-black text-white p-4 w-screen " id="lucky-buy">
          <HomeHeader/>

      <h1 className="font-medium text-light-green font-medium text-2xl uppercase ml-2 text-center mt-[70px] mb-2">
        LUCKY BUY
      </h1>
      <p className="text-center text-light-green mb-5">
        Spin for a chance to lucky buy this NFT. XP can be redeemed for Zaar.
      </p>

      <div className="flex flex-row justify-center items-center sticky top-5 z-10 bg-black w-screen ">
        {/* Container for the cards */}
        <div className=" w-[50%] h-[300px] flex flex-row gap-1 overflow-x-auto no-scrollbar">
          {/* Cards to the left with XP */}
          {/* Repeat this card for the other 4 left cards */}
          <div className=" w-[200px] flex-shrink-0 border border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm text-light-green uppercase mt-2">XP</div>
            <Image src="/images/xp.png" width={300} height={300} alt={" "} className="w-16" />
            <div className="text-sm mb-2 text-light-green">69 XP</div>
          </div>
          <div className="card  flex-shrink-0 bg-black w-[200px] borderborder-light-gray-allrounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm text-light-green uppercase mt-2">XP</div>
            <Image width={300} height={300} alt={" "} src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">42 XP</div>
          </div>
          <div className="card  flex-shrink-0 bg-black w-[200px] border border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm text-light-green uppercase mt-2">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">99 XP</div>
          </div>
          <div className="card  flex-shrink-0 bg-black w-[200px] border border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm text-light-green uppercase mt-2">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">110 XP</div>
          </div>
          <div className="card  flex-shrink-0 bg-black w-[200px] border border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm text-light-green uppercase mt-2">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">250 XP</div>
          </div>

          {/* Middle card with the NFT */}
          <div className="card flex-shrink-0 w-[200px] bg-gray-yellow border-light-gray-all border-1 rounded-sm relative shadow-2xl">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="dial-line bg-white h-full flex flex-col justify-between">
                <div className="dial-triangle dial-triangle-top"></div>
                <div className="dial-triangle dial-triangle-bottom"></div>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full py-2">
              <div className="text-sm uppercase text-center text-light-green">
                NFT
              </div>
              <Image width={300} height={300} alt={" "} 
                src="/images/collections/milady/milady-6991.jpg"
                className="card-img object-contain px-2"
              />
              <div className="text-sm text-center text-light-green">#6991</div>
            </div>
          </div>

          {/* Cards to the right with XP */}
          {/* Repeat this card for the other 4 right cards */}
          <div className="flex-shrink-0 w-[200px]  card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm uppercase mt-2 text-light-green">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">69 XP</div>
          </div>
          <div className="flex-shrink-0 w-[200px] card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="flex-shrink-0 text-sm uppercase mt-2 text-light-green">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">10 XP</div>
          </div>
          <div className="flex-shrink-0 w-[200px] card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm uppercase mt-2 text-light-green">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">420 XP</div>
          </div>
          <div className="flex-shrink-0 w-[200px] card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm uppercase mt-2 text-light-green">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">250 XP</div>
          </div>
          <div className="flex-shrink-0 w-[200px] card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
            <div className="text-sm uppercase mt-2 text-light-green">XP</div>
            <Image width={300} height={300} alt={" "}  src="/images/xp.png" className="w-16" />
            <div className="text-sm mb-2 text-light-green">30 XP</div>
          </div>
        </div>
      </div>

      <div className="bg-black border-gray-800 text-white p-4 rounded-sm shadow-lg max-w-xl mx-auto">
        <div className="mb-2 text-center text-light-green text-base mt-5">
          CHOOSE YOUR ODDS
        </div>
        <div className="relative pt-1">
      <input
        type="range"
        min="1"
        max="6"
        value={odds}
        step="1"
        className="slider w-full h-2 rounded-sm cursor-pointer accent-yellow-500"
        id="odds-slider"
        onChange={(e) => { setOdds(parseInt(e.target.value)); updateSliderLabelPosition(); }}
        style={{ background: `linear-gradient(to left, green, yellow, orange, red)` }}

      />
      <div className="flex justify-between text-sm px-2 text-gray">
        <span>1%</span>
        <span>15%</span>
        <span>30%</span>
        <span>45%</span>
        <span>60%</span>
        <span>75%</span>
      </div>
    </div>
      </div>

      <div className="max-w-md mx-auto bg-black rounded-sm overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full">
            <div className="p-2 border-b border-dark-gray">
              <div className="text-sm font-semibold text-light-green uppercase">
                Details
              </div>
            </div>
            <div className="p-2 pt-0 pb-0">
              <table className="w-full text-left text-sm text-light-green">
                <tbody>
                  <tr className="border-b border-dark-gray">
                    <td className="py-0 text-gray">Potential upside</td>
                    <td className="py-0 text-right">6.67x</td>
                  </tr>
                  <tr className="border-b border-dark-gray">
                    <td className="py-2 text-gray">Odds of winning</td>
                    <td className="py-2 text-right">15%</td>
                  </tr>
                  <tr className="border-b border-dark-gray">
                    <td className="py-2 text-gray">NFT price</td>
                    <td className="py-2 text-right">2.920</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray">You pay</td>
                    <td className="py-2 text-right">0.438</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex items-left justify-left">
                <div className="flex items-center space-x-2 mt-3">
                  {" "}
                  {/* This will create space between the checkbox and the label */}
                  <input
                    id="termsCheckbox"
                    type="checkbox"
                    className="w-4 h-4 accent-yellow bg-yellow rounded border-gray-300"
                    required
                  />
                  <label  className="text-sm text-gray">
                    I agree to Lucky Buy terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spin button */}
      <div className="mt-8 flex flex-col items-center mb-12">
        <button
          id="spinButton"
          type="button"
          className="spin-button text-black uppercase bg-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
        >
          Spin
        </button>
      </div>
      <Footer/>
    </div>
  );
};
export default LuckyBuy;