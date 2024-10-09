import React from 'react';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="bg-gray-100 p-4 flex justify-center items-center">
      <div className="flex items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Search With Name"
          className="flex-grow border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 p-2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
