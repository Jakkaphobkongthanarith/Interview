import React from "react";
import Searchbox from "../Component/Searchbox";
import TableCard from "../Component/Table";
import PostModal from "../Component/postModal";
import { useState } from "react";
function FirstPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="App bg-gray-100">
      <PostModal />
      <Searchbox onSearch={handleSearch} onClear={handleClear} />
      <TableCard searchTerm={searchTerm} />
    </div>
  );
}

export default FirstPage;
