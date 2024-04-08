
import Image from 'next/image';
import React from "react";
export const Footer = () =>{
    return(
    <div className="fixed bottom-0 left-navbar right-0 bg-black w-full border-t border-dark-gray-top z-50 pt-1 pb-1">
        <nav className="mx-auto px-6">
            <div className="w-full h-footer flex items-center justify-between">
            <ul className="text-xs font-normal text-gray-400 max-w-[50%] flex items-center gap-3">
                <li className="inline-block mr-2">
                    {/* Placeholder for x.com icon */}
                    <a target="_blank" rel="noopener noreferrer">
                        <svg className="text-gray-400" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.14163 7.19284L13.6089 2H12.5503L8.67137 6.50887L5.57328 2H2L6.68492 8.81821L2 14.2637H3.05866L7.15491 9.50218L10.4267 14.2637H14L9.14137 7.19284H9.14163ZM7.69165 8.87828L7.21697 8.19934L3.44011 2.79694H5.06615L8.11412 7.15685L8.5888 7.83579L12.5508 13.503H10.9248L7.69165 8.87854V8.87828Z" fill="#B1B5C4"></path></svg>
                    </a>
                    </li>
                <li className="inline-block">
                {/* Placeholder for Discord icon */}
                <a target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5447 2.77022C12.5249 2.3023 11.4313 1.95755 10.2879 1.76011C10.2671 1.75629 10.2463 1.76582 10.2356 1.78486C10.0949 2.03501 9.93915 2.36134 9.83006 2.61784C8.60027 2.43372 7.37679 2.43372 6.17221 2.61784C6.0631 2.35564 5.90166 2.03501 5.76038 1.78486C5.74966 1.76645 5.72886 1.75693 5.70803 1.76011C4.56527 1.95692 3.47171 2.30167 2.45129 2.77022C2.44246 2.77403 2.43488 2.78038 2.42986 2.78863C0.355594 5.88754 -0.212633 8.91028 0.0661201 11.8955C0.0673814 11.9101 0.0755799 11.9241 0.086932 11.933C1.45547 12.938 2.78114 13.5482 4.08219 13.9526C4.10301 13.9589 4.12507 13.9513 4.13832 13.9342C4.44608 13.5139 4.72043 13.0707 4.95565 12.6047C4.96953 12.5774 4.95628 12.545 4.92791 12.5342C4.49275 12.3692 4.0784 12.1679 3.67982 11.9393C3.64829 11.9209 3.64577 11.8758 3.67477 11.8543C3.75865 11.7914 3.84255 11.726 3.92264 11.66C3.93713 11.6479 3.95732 11.6454 3.97435 11.653C6.59286 12.8485 9.4277 12.8485 12.0153 11.653C12.0323 11.6447 12.0525 11.6473 12.0677 11.6593C12.1478 11.7254 12.2316 11.7914 12.3161 11.8543C12.3451 11.8758 12.3433 11.9209 12.3117 11.9393C11.9131 12.1723 11.4988 12.3692 11.063 12.5336C11.0346 12.5444 11.022 12.5774 11.0359 12.6047C11.2762 13.0701 11.5505 13.5132 11.8526 13.9335C11.8652 13.9513 11.8879 13.9589 11.9087 13.9526C13.2161 13.5482 14.5417 12.938 15.9103 11.933C15.9223 11.9241 15.9298 11.9108 15.9311 11.8962C16.2647 8.44488 15.3723 5.44693 13.5655 2.78926C13.5611 2.78038 13.5535 2.77403 13.5447 2.77022ZM5.34668 10.0778C4.55833 10.0778 3.90875 9.35406 3.90875 8.46521C3.90875 7.57635 4.54574 6.85259 5.34668 6.85259C6.15392 6.85259 6.79721 7.5827 6.78459 8.46521C6.78459 9.35406 6.14761 10.0778 5.34668 10.0778ZM10.6632 10.0778C9.87484 10.0778 9.22526 9.35406 9.22526 8.46521C9.22526 7.57635 9.86222 6.85259 10.6632 6.85259C11.4704 6.85259 12.1137 7.5827 12.1011 8.46521C12.1011 9.35406 11.4704 10.0778 10.6632 10.0778Z" fill="#B1B5C4"></path></svg>
                </a>
                </li>
                <li className="inline-block hidden sm:inline-block">
                {/* Placeholder for Blog link */}
                <a target="_blank" rel="noopener noreferrer">API</a>
                </li>
                <li className="inline-block hidden sm:inline-block">
                {/* Placeholder for Privacy link */}
                <a target="_blank" rel="noopener noreferrer">Privacy</a>
                </li>
                <li className="inline-block hidden sm:inline-block">
                {/* Placeholder for Terms link */}
                <a target="_blank" rel="noopener noreferrer">Terms</a>
                </li>
                <li className="inline-block hidden sm:inline-block">
                {/* Placeholder for Feedback link */}
                <a target="_blank" rel="noopener noreferrer">Feedback</a>
                </li>
            </ul>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                <div className="flex gap-1 items-center">
                    {/* Placeholder for currency display icon */}
                    <div className="text-xs text-gray font-medium"><i className="fab fa-ethereum text-white"></i> $3,568.69</div>
                </div>
                </div>
                <div className="border-r h-full w-1 h-4"></div>
                <div className="flex gap-3">
                <div className="flex hidden sm:inline-block">
                    <div className="text-gray-400 flex items-center gap-1 text-xs font-medium">
                    {/* Placeholder for list icon */}
                    <span className="text-gray"><i className="fas fa-lg fa-gas-pump"></i> 11</span>
                    </div>
                </div>
                <div className="hidden sm:inline-block rounded hover:text-gray cursor-pointer text-gray font-normal text-xs flex items-center border border-dark-gray-all py-[3px] pl-2 pr-0.5" aria-expanded="false">
                    Standard
                    <i className="fas fa-caret-down ml-1"></i>
                </div>
                </div>
                <div className="border-r h-full w-1 h-4"></div>
                <div className="flex items-center rounded-sm border border-dark-gray-all h-7">
                {/* Placeholder for button labeled 'Pro' */}
                <button type="button" className="!hover:border-gray-400 flex items-center justify-center rounded-sm cursor-pointer px-2 text-xs py-1.5 font-medium text-gray hover:text-gray-600 h-6.5">
                    Pro
                </button>
                <div className="h-7 w-[1px] bg-dark-gray-all"></div>
                {/* Placeholder for button labeled 'Collector' */}
                <button type="button" className="!hover:border-gray-400 flex items-center justify-center rounded-sm cursor-pointer px-2 text-xs py-1.5 font-medium text-yellow hover:text-gray-600 h-6.5 text-primary bg-gray">
                    Collector
                </button>
                </div>
            </div>
            </div>
        </nav>
    </div>
    );
}