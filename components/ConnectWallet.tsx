
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from "react";
import {useAccount, useDisconnect, useBalance} from "wagmi";
import {useState, useEffect} from "react";
import AccountModal from "./AccountModal";
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