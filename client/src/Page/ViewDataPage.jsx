import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InspectionReport from "../Component/InspectionModal";

const ViewData = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getData/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const result = await response.json();
        console.log("result-=>", result);
        setItem(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("itemmmmm-->", item);
    fetchItem();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const createTime = new Date(item.testMenu.created_at)
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "")
    .replace(/\//g, "-")
    .replace(" ", " - ");
  const updateTime = new Date(item.testMenu.updated_at)
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "")
    .replace(/\//g, "-")
    .replace(" ", " - ");

  return (
    <div className="p-4 flex gap-4 w-full bg-gray-100 rounded-lg shadow-lg">
      <div className="w-1/3 flex flex-col justify-start items-center">
        <img
          src={item.testMenu.imageURL}
          alt="item"
          className="w-[70%] h-auto object-cover rounded-lg"
        />
        <div className="w-full mr-[30%] flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-[#1F7B44] text-white rounded-lg"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate(`/editData/${id}`)}
            className="mb-4 px-4 py-2 bg-[#1F7B44] text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-2/3">
        {item ? (
          <>
            <div className="flex justify-between gap-16 p-2 text-md bg-white text-gray-600 mb-4">
              <div className="text-left">
                <p className="my-1">Create Date - Time:</p>
                <p className="text-black">{createTime}</p>
                <p className="my-1">Standard:</p>
                <p className="text-black">{item.testMenu.Standard}</p>
                <p className="my-1">Update Date - Time:</p>
                <p className="text-black">{updateTime}</p>
              </div>
              <div className="mr-[10%] w-auto">
                <p className="my-1">Inspection ID:</p>
                <p className="text-black">
                  {item.testMenu.Inspection_ID || "N/A"}
                </p>
                <p className="my-1">Total Sample:</p>
                <p className="text-black">
                  {item.testMenu.Total_Sample} Kernal
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md text-left text-gray-700 mb-4">
              <p>Note:</p>
              <p>{item.testMenu.Note}</p>
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
                    <td className="p-2 text-green-600 font-semibold">
                      {item.lengthCategoryPercentages.fullGrain.percentage}%
                    </td>
                  </tr>
                  <tr className="text-gray-700 text-left border-b">
                    <td className="p-2">ข้าวหักใหญ่</td>
                    <td className="p-2">3.5-6.99</td>
                    <td className="p-2 text-green-600 font-semibold">
                      {
                        item.lengthCategoryPercentages.largeBrokenGrain
                          .percentage
                      }
                      %
                    </td>
                  </tr>
                  <tr className="text-gray-700 text-left border-b">
                    <td className="p-2">ข้าวหักธรรมดา</td>
                    <td className="p-2">0-3.49</td>
                    <td className="p-2 text-green-600 font-semibold">
                      {
                        item.lengthCategoryPercentages.normalBrokenGrain
                          .percentage
                      }
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Defect Rice
              </h2>
              <table className="w-full flex-row justify-between mt-2 text-sm">
                <thead>
                  <tr className="  text-gray-600 border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-center">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(item.grainTypePercentages).map((type) => (
                    <tr key={type} className="text-gray-700 text-left border-b">
                      <td className="p-2">{type}</td>
                      <td className="p-2 text-center text-green-600 font-semibold">
                        {item.grainTypePercentages[type].percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No item found</p>
        )}
      </div>
    </div>
  );
};

export default ViewData;
