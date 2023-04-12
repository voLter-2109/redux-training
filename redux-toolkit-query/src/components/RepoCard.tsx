// snip rafce

import React, { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favotites } = useAppSelector((state) => state.github);

  const [isFav, setisFav] = useState(favotites.includes(repo.html_url));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setisFav(true);
    addFavorite(repo.html_url);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setisFav(false);
    removeFavorite(repo.html_url);
  };

  return (
    <div className="border py-3 px-2 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Fork: <span className="forn-bold mr-2">{repo.forks}</span>
          Watchers: <span className="forn-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFav ? (
          <button
            onClick={addToFavorite}
            className="py-2 px-4 bg-yellow-400 ml-2 rounded hover:shadow-md transition-all"
          >
            Add
          </button>
        ) : (
          <button
            onClick={removeFromFavorite}
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          >
            remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
