import React from "react";
import { useState } from "react";
function SearchBar({ onSearch, onClear }) {
  const [input, setInput] = useState("");

  const handleSearchClick = () => {
    onSearch(input);  
  };

  const handleClearClick = () => {
    setInput("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div class=" w-full p-4 bg-white shadow rounded-lg">
      <label
        for="search-id"
        class="block text-sm font-medium text-left text-gray-700"
      >
        Search by ID, Name, or Standard
      </label>
      <input
        type="text"
        id="search-id"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search with ID"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div class="flex justify-between items-center mt-4">
        <button
          onClick={handleClearClick}
          class="text-red-500 underline hover:text-red-700"
        >
          Clear Filter
        </button>
        <div>
          <button
            onClick={handleSearchClick}
            class="bg-[#1F7B44] text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11l-3 3m0 0l-3-3m3 3V4m6 14a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h3"
              />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
