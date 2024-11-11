import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InspectionReport from "../Component/InspectionModal";
const ViewFood = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getFood/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch food item");
        }
        const result = await response.json();
        console.log("result-=>", result);
        console.log("result name -=>", result.Name);
        console.log("result name -=>", result.Total_Sample);
        setFoodItem(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 flex gap-4 w-full bg-gray-100 rounded-lg shadow-lg">
      <div className="w-1/3 flex flex-col justify-start items-center">
        <img
          src={foodItem.imageURL}
          alt="Food"
          className="w-full h-auto object-cover rounded-lg"
        />
        <div className="w-full flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-[#1F7B44] text-white rounded-lg"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate(`/editFood/${id}`)}
            className="mb-4 px-4 py-2 bg-[#1F7B44] text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="w-2/3">
        {foodItem ? (
          <>
            <div className="flex justify-between gap-16 p-2 text-md bg-white text-gray-600 mb-4">
              <div className="text-left">
                <p>Create Date - Time:</p>
                <p className="text-black">{foodItem.created_at}</p>
                <p>Standard:</p>
                <p className="text-black">{foodItem.Standard}</p>
                <p>Update Date - Time:</p>
                <p className="text-black">{foodItem.updated_at}</p>
              </div>
              <div className="mr-[10%] w-auto">
                <p>Inspection ID:</p>
                <p className="text-black">{foodItem.Inspection_ID}</p>
                <p>Total Sample:</p>
                <p className="text-black">{foodItem.Total_Sample} Kernal</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md text-left text-gray-700 mb-4">
              <p>Note:</p>
              <p>{foodItem.Note}</p>
            </div>

            <div className="bg-white mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Composition
              </h2>
              <table className="w-full mt-2 text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="p-2">Name</th>
                    <th className="p-2">Length</th>
                    <th className="p-2">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 text-left border-b">
                    <td className="p-2">ข้าวเต็มเมล็ด</td>
                    <td className="p-2">&gt;=7</td>
                    <td className="p-2 text-green-600 font-semibold">0.00%</td>
                  </tr>
                  <tr className="text-gray-700 text-left border-b">
                    <td className="p-2">ข้าวหักใหญ่</td>
                    <td className="p-2">3.5-6.99</td>
                    <td className="p-2 text-green-600 font-semibold">0.00%</td>
                  </tr>
                  <tr className="text-gray-700 text-left border-b">
                    <td className="p-2">ข้าวหักธรรมดา</td>
                    <td className="p-2">0-3.49</td>
                    <td className="p-2 text-green-600 font-semibold">0.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Defect Rice
              </h2>
              <table className="w-full mt-2 text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="p-2">Name</th>
                    <th className="p-2">Actual</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No food item found</p>
        )}
      </div>
    </div>
  );
};

export default ViewFood;
