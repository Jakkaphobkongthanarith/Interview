import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TableCard = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/getFood?limit=10&page=${page}`
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (id, e) => {
    e.stopPropagation(); 
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleRowClick = (id) => {
    navigate(`/viewFood/${id}`);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map(async (id) => {
          await fetch(`http://localhost:3000/deleteFood/${id}`, {
            method: "DELETE",
          });
        })
      );
      setSelectedItems([]);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredData = data.filter((item) => {
    const searchText = searchTerm.toLowerCase();

    return (
      (item.Name && item.Name.toLowerCase().includes(searchText)) ||
      (item.Standard && item.Standard.toLowerCase().includes(searchText)) ||
      (item.Note && item.Note.toLowerCase().includes(searchText)) ||
      (item.Inspection_ID &&
        item.Inspection_ID.toLowerCase().includes(searchText))
    );
  });

  return (
    <div className="overflow-auto p-4">
      {selectedItems.length > 0 && (
        <button
          onClick={handleDelete}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Selected
        </button>
      )}
      <table className="min-w-full border-collapse border border-gray-200 text-center">
        <thead>
          <tr className="bg-[#1F7B44] text-white">
            <th className="border border-gray-200 p-2 w-[30%]">Created At</th>
            <th className="border border-gray-200 p-2">Inspection ID</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Standard</th>
            <th className="border border-gray-200 p-2">Note</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border  border-gray-200 p-2 flex justify-start items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleCheckboxChange(item.id, e)}
                  className="mr-4"
                />
                <span>{item.created_at}</span>{" "}
              </td>

              <td className="border border-gray-200 p-2">
                {item.Inspection_ID ? item.Inspection_ID : "-"}
              </td>
              <td className="border border-gray-200 p-2">
                {item.Name ? item.Name : "-"}
              </td>
              <td className="border border-gray-200 p-2">
                {item.Standard ? item.Standard : "-"}
              </td>
              <td className="border border-gray-200 p-2">
                {item.Note ? item.Note : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableCard;
