import React, { useEffect, useState } from "react";
import Moviecard from "../components/Moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiKey = "10af9b5e24cff4d56ee077820e287052";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error(err));
  }, [page, search]);

  return (
    <div className="p-4 py-16">
      {/* Search */}
      <input
        type="text"
        placeholder="Search Movies..."
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60
        backdrop-blur-md text-white fixed top-20 left-1/2 transform -translate-x-1/2 z-10"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Movies Grid */}
      <div className="movies container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {movies.length > 0 ? (
          movies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white col-span-full text-center">No movies found</p>
        )}
      </div>

      {/* Pagination */}
      {!search && (
        <div className="pagination-container flex justify-between mt-5">
          <button
            disabled={page === 1}
            className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
            onClick={() => setPage((prev) => prev - 1)}
          >
            PREV
          </button>
          <button
            className="p-2 bg-gray-700 text-white rounded"
            onClick={() => setPage((prev) => prev + 1)}
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
