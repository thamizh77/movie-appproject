import React, { createContext, useState, useEffect } from "react";

// Create context
const WatchListContext = createContext();

// Provider component
export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const apiKey = "10af9b5e24cff4d56ee077820e287052";
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setGenreList(data.genres || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleWatchlist = (movie) => {
    setWatchList((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <WatchListContext.Provider value={{ watchList, toggleWatchlist, genreList }}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListContext;
