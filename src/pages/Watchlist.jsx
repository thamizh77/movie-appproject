import React, { useContext, useState } from "react";
import GenreFilter from "../components/GenreFilter";
import Moviecard from "../components/Moviecard";
import WatchListContext from "../context/WatchListContext";

const Watchlist = () => {
  const { watchList, genreList } = useContext(WatchListContext);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Filter movies by search and genre
  const filteredMovies = watchList.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      !selectedGenre || movie.genre_ids?.includes(Number(selectedGenre));
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-4 py-16">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Movies..."
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60
        backdrop-blur-md text-white fixed top-20 left-1/2 transform -translate-x-1/2 z-10"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Genre Filter */}
      <div className="mt-16 flex justify-center">
        <GenreFilter genreList={genreList} setSelectedGenre={setSelectedGenre} />
      </div>

      {/* Movies Grid */}
      <div className="movies container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white col-span-full text-center">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
