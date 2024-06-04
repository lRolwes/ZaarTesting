
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from "react";
import {useAccount, useDisconnect, useBalance} from "wagmi";
import {useState, useEffect} from "react";
const AccountModal = ({setModalOpen, balance}: {setModalOpen: (arg0: boolean) => void, balance:string|undefined}) => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const [rewards, setRewards] = useState(null);
  const[userTokens, setUserTokens] = useState([]);

  useEffect(() => {
    const url = `https://offchain-masterchef-e5a6ec82d362.herokuapp.com/rewards?address=${account.address ? account.address : "0x0000000000000000000000000000000000000000"}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRewards(data.rewards))
      .catch((error) => console.error("Error:", error));
  }, [account.address]);
  useEffect(() => {
    async function getUserTokens() {
      const url = `https://offchain-masterchef-e5a6ec82d362.herokuapp.com/rewards?address=${account.address ? account.address : "0x0000000000000000000000000000000000000000"}`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => setRewards(data.rewards))
      .catch((error) => console.error("Error:", error));
    };
    getUserTokens();
    }, [account.address]);

   return(
    <div className= "absolute bg-black top-0 left-0 opacity-70 w-screen h-screen z-40 ">
      <div className="z-50 bg-gray opacity-100 text-yellow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account</h1>
        <button onClick={()=>{disconnect();setModalOpen(false);}} className="text-red-500">Disconnect</button>
        <button onClick={()=> {setModalOpen(false)}} className="text-red-500">Close</button>

      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">Address</p>
        <p className="text-sm text-gray-500">{account?.address}</p>
        <p className="text-lg font-semibold">Balance</p>
        <p className="text-sm text-gray-500">{balance? balance: "0"}</p>
        <p className="text-lg font-semibold">Rewards</p>
        <p className="text-sm text-gray-500">{rewards? rewards: "0"}</p>
      </div>
    </div>
    </div>
  );
}
export const ConnectWallet = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
    
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className = " bg-yellow text-black font-bold p-2 px-5 rounded-sm hover:bg-white border-2 hover:border-yellow transition duration-500">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="text-yellow font-bold uppercase gap-7 flex" >
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="hover:text-whitish transition-colors duration-150"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 25,
                          height: 25,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,

                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 25, height: 25}}
                            width = {25}
                            height = {25}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={()=>{setModalOpen(!modalOpen)}} type="button" className="hover:text-whitish transition-colors duration-150">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
            {modalOpen? <AccountModal setModalOpen={setModalOpen} balance={account?.displayBalance}/> : null}
          </div>
        );
      }}
    </ConnectButton.Custom>
    );
}