import React from "react";
import Router from "next/router";

export type WatchlistProps = {
  id: string;
  target: string;
  authorId: string;
  author: {
    address: string;
  } | null;
};

const Watchlist: React.FC<{ watchlist: WatchlistProps }> = ({ watchlist }) => {
  const authorAddress = watchlist.author ? watchlist.author.address : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${watchlist.id}`)}>
      <h2>{watchlist.id}</h2>
      <small>By {authorAddress}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Watchlist;
