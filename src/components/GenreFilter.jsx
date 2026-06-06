import React from "react";

const GenreFilter = ({ genreList, setSelectedGenre }) => {
  return (
    <select
      className="p-2 mb-4 bg-gray-700 opacity-60 backdrop-blur-md text-white border rounded"
      onChange={(e) => setSelectedGenre(e.target.value)}
    >
      <option value="">All Genres</option>
      {genreList.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;
