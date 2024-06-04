import Image from "next/image";
import React, { useEffect, useState } from "react";

const LuckyBuy = () => {
    return (
      <div
        id="modal-lucky-buy"
        className="h-auto w-11/12 lg:w-9/12 p-3 bg-black rounded-sm z-40"
      >
        <div className="flex flex-col w-full h-auto">
          {/* Modal Header */}
          <div className="bg-black p-2 flex justify-between items-center rounded-sm mb-3">
            {/* Left Side - Tab-like Buttons */}
            <div
              className="inline-flex shadow-md rounded-sm bg-black p-1 text-sm"
              role="tablist"
            >
              {/* Active Tab */}
              <button
                className="px-4 py-2 bg-dark-gray text-light-green rounded-sm focus:outline-none"
                role="tab"
                aria-selected="true"
              >
                Play
              </button>
              {/* Inactive Tab */}
              <button
                className="px-4 py-2 text-gray rounded-sm focus:outline-none"
                role="tab"
              >
                History
              </button>
            </div>
  
            {/* Right Side - Navigation and Close Buttons */}
            <div className="flex items-center space-x-2 text-sm">
              {/* Escape/Close Button */}
              <button className="text-gray-300 bg-transparent hover:text-white border border-gray-600 hover:border-white rounded px-3 py-1 focus:outline-none">
                <i className="far fa-times-square"></i> Esc
              </button>
            </div>
          </div>
          {/* End of Modal Header */}
  
          {/* Modal Body */}
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Column - Content Area */}
            <div className="md:w-12/12 p-2">
              {/* NFT Image width={16} height ={16} and Details */}
              <div className="w-full flex flex-col items-center md:items-start">
                {/* Left Column: Content Area */}
                <div className="flex-1 p-0">
                  <div className="bg-black text-white p-4" id="lucky-buy">
                    <h1 className="font-medium text-light-green font-medium text-2xl uppercase ml-2 text-center mt-0 sm:mt-6 mb-2">
                      LUCKY BUY
                    </h1>
                    <p className="text-center text-light-green mb-5">
                      Spin for a chance to lucky buy this NFT.
                      <br /> XP can be redeemed for Zaar.
                    </p>
  
                    <div className="flex justify-center items-center sticky top-5 z-30 bg-black">
                      {/* Container for the cards */}
                      <div className="inline-flex gap-1">
                        {/* Cards to the left with XP */}
                        {/* Repeat this card for the other 4 left cards */}
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm text-light-green uppercase mt-2">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            69 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm text-light-green uppercase mt-2">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            42 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm text-light-green uppercase mt-2">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            99 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm text-light-green uppercase mt-2">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            110 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm text-light-green uppercase mt-2">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            250 XP
                          </div>
                        </div>
  
                        {/* Middle card with the NFT */}
                        <div className="card bg-gray-yellow border-light-gray-all border-1 rounded-sm relative shadow-2xl">
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
                            <Image
                              alt="xp"
                              width={16}
                              height={16}
                              src="/images/xp.png"
                              className="w-16"
                            />
                            <div className="text-sm text-center text-light-green">
                              #5799
                            </div>
                          </div>
                        </div>
  
                        {/* Cards to the right with XP */}
                        {/* Repeat this card for the other 4 right cards */}
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm uppercase mt-2 text-light-green">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            69 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm uppercase mt-2 text-light-green">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            10 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm uppercase mt-2 text-light-green">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            420 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm uppercase mt-2 text-light-green">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            250 XP
                          </div>
                        </div>
                        <div className="card bg-black border-light-gray-all rounded-sm flex flex-col justify-between items-center text-2xl shadow-lg">
                          <div className="text-sm uppercase mt-2 text-light-green">
                            XP
                          </div>
                          <Image
                            alt="xp"
                            width={16}
                            height={16}
                            src="/images/xp.png"
                            className="w-16"
                          />
                          <div className="text-sm mb-2 text-light-green">
                            30 XP
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="bg-black text-white p-4 rounded-sm shadow-lg max-w-lg mx-auto">
                      <div className="mb-2 text-center text-light-green text-base mt-5">
                        CHOOSE YOUR ODDS
                      </div>
                      <div className="relative pt-1">
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value="2"
                          step="1"
                          className="slider w-full h-2 rounded-sm cursor-pointer accent-yellow"
                          id="odds-slider"
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
                          <div className="p-2 border-b border-dark-gray hover:bg-gray">
                            <div className="text-sm font-semibold text-white uppercase">
                              Details
                            </div>
                          </div>
                          <div className="p-2 pt-0 pb-0">
                            <table className="w-full text-left text-sm text-light-green">
                              <tbody>
                                <tr className="border-b border-dark-gray">
                                  <td className="py-0 text-gray">
                                    Potential upside
                                  </td>
                                  <td className="py-0 text-right">6.67x</td>
                                </tr>
                                <tr className="border-b border-dark-gray">
                                  <td className="py-2 text-gray">
                                    Odds of winning
                                  </td>
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
                                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 accent-yellow"
                                  required
                                />
                                <label className="text-sm text-gray">
                                  I agree to Lucky Buy terms and conditions
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    {/* Spin button */}
                    <div className="mt-8 flex flex-col items-center mb-0">
                      <button
                        id="spinButton"
                        type="button"
                        className="spin-button text-black uppercase bg-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none font-bold rounded-sm text-sm px-5 py-2.5 text-center flex-grow"
                      >
                        Spin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default LuckyBuy;