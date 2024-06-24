'use client';
import type { PutBlobResult } from '@vercel/blob';
import React, { use } from 'react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {HomeHeader} from '../../components/HomeHeader';
import {Footer} from  '../../components/Footer';
import {FaUser} from "react-icons/fa";
import { getAccount } from '@wagmi/core'
import { config } from './../../config'
export const Settings = () => {
    const [newVanity, setNewVanity] = React.useState("");
    const [currentVanity, setCurrentVanity] = React.useState("Set New Vanity");
    const [newBio, setNewBio] = React.useState("");
    const [currentBio, setCurrentBio] = React.useState("Set New Bio");
    const [newEmail, setNewEmail] = React.useState("");
    const [currentEmail, setCurrentEmail] = React.useState("Set New Email");
    const [newProfileImage, setNewProfileImage] = React.useState("");
    const [currentProfileImage, setCurrentProfileImage] = React.useState("Set New Profile Image");
    const [newProfileBanner, setNewProfileBanner] = React.useState("");
    const [currentProfileBanner, setCurrentProfileBanner] = React.useState("Set New Profile Banner");
    const addr = getAccount(config).address;
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    useEffect(() => {
        if(addr != null){
            fetch(`http://localhost:3000/api/getProfile?ownerAddress=${addr}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                {data?.uName? setCurrentVanity(data.uName) : null}
                {data?.bio? setCurrentBio(data.bio) : null}
            });
    }
    },[addr]);
    function updateProfile(){

        fetch(`http://localhost:3000/api/updateProfile?ownerAddress=${addr}&uName=${newVanity !="" ? newVanity : currentVanity}&bio=${newBio != "" ? newBio : currentBio}&email=${newEmail != "" ? newEmail : currentEmail}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }
    const handleNewUserNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewVanity(event.target.value);
    }
    const handleNewBioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewBio(event.target.value);
    }
    return(
       
        <div>
            <HomeHeader/>
            
            <div className="mt-[60px] container-fluid mx-auto py-6 pt-0">
                
                <div className="bg-black text-white min-h-screen">
                    <div className="container mx-auto p-4">
                      <div className="flex flex-wrap -mx-4">
                        {/* Sidebar */}
                        {/* Mobile Dropdown/Button */}
                        <div className="lg:hidden w-full relative z-10 ml-5 mr-5 border-dark-gray-all">
                            <button id="dropdownButton" className="w-full text-left text-white bg-black p-2 px-4 uppercase">
                            Profile
                            <i className="fas fa-chevron-down float-right mt-1"></i>
                            </button>
                        
                            {/* Mobile Dropdown Menu, hidden by default */}
                            <div id="dropdownMenu" className="hidden absolute w-full left-0 top-full bg-gray">
                            <ul className="text-light-green uppercase text-sm">
                                <li className="p-3">
                                <div  className="flex items-center hover:text-yellow-500 py-1">
                                    <i className="far fa-user-circle mr-2"></i> Profile
                                </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                        
                        {/* Desktop Sidebar */}
                        <div className="hidden lg:block lg:w-1/4 px-4 mb-4 lg:mb-0 text-sm">
                            <h3 className="text-light-gray mb-4">Settings</h3>
                            <ul className="space-y-0 lg:border-r-0 uppercase">
                            <li className="bg-gray p-3 rounded-sm">
                                <div className="text-yellow flex flex-row"><FaUser className="mr-2"/> Profile</div>
                            </li>
                           
                            {/* Additional sidebar items here */}
                            </ul>
                        </div>
                        {/* Profile Content */}
                        <div className="w-full lg:w-3/4 px-4">
                            <div className="bg-black p-2 sm:p-6 py-3 rounded-sm">
                            <h1 className="font-semibold text-3xl text-yellow uppercase mb-8">Profile details</h1>
                            <div className="flex flex-wrap -mx-2 items-start">
                                {/* Left column */}
                                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                                {/* Username and other fields here */}
                                <div className="mb-6">
                                    <label  className="block text-light-green uppercase mb-2">Username</label>
                                    <input type="text" id="username" placeholder={currentVanity} onChange={handleNewUserNameChange} className="bg-black border-dark-gray-all w-full p-2 rounded-sm"/>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-light-green uppercase mb-2">Bio</label>
                                    <textarea id="bio" onChange={handleNewBioChange} className="bg-black border-dark-gray-all text-white w-full p-2 rounded-sm" placeholder={currentBio}></textarea>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-light-green uppercase mb-2">Email Address</label>
                                    <input type="email" id="email" className="bg-black border-dark-gray-all text-white w-full p-2 rounded" placeholder="Enter email"/>
                                </div>
                                <button
                                    className="bg-yellow border-2 border-yellow p-2 rounded-sm uppercase  text-center text-black  hover:bg-hoveryellow "
                                    onClick={()=>{updateProfile();}}>
                                    Update Profile
                                    </button>
                    
                                {/* Additional fields here */}
                                </div>
                                {/* Right column */}
                                <div className="w-full md:w-1/2 px-2">
                                <div className="flex flex-col ml-0 sm:ml-10">
                                    {/* Profile Image Title */}
                                    <div className="mb-4">
                                    <h3 className="text-lg text-light-green uppercase">Profile Image</h3>
                                    </div>
                                    {/* Profile Image */}
                                    <div className="mb-6">
                                    <div className="rounded-sm w-24 h-24 overflow-hidden border-2 border-gray-700">
                                        <Image width={100} height={100}  src="/images/jokerfrog.jpg" alt="Profile Image"/>
                                    </div>
                                    </div>
                                    <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatarUpload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
                                    {/* Additional content here */}
                                </div>
                                <div className="flex flex-col ml-0 sm:ml-10 mt-3">
                                    {/* Profile Image Title */}
                                    <div className="mb-4">
                                    <h3 className="text-lg text-light-green uppercase">Profile Banner</h3>
                                    </div>
                                    <div className="mb-6">
                                    <div className="rounded-sm w-24 h-24 overflow-hidden border-1 border-dark-gray-all">
                                        <Image width={100} height={100}  src="/images/banner.png" alt="Profile Banner"/>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            {/* Social Connections */}
                            <div className="mt-6">
                                {/* Social Connections content here */}
                            </div>
                            </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
        
            </div>
          <Footer/>
      
            
        </div>
        
        );
        };
export default Settings;