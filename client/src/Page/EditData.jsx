import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditData = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Note: "",
    Price: "",
    Sampling_Point: [],
    Sampling_Time: "",
  });
  const [samplingPoint, setSamplingPoint] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSamplingPoint((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: checked,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        Sampling_Point: getSelectedSamplingPoints(updatedState),
      }));

      return updatedState;
    });
  };

  const handleRadioChange = (event) => {
    setSamplingPoint(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getData/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const result = await response.json();
        console.log("response", result);
        setItem(result);
        console.log("yeim", item);
        setFormData({
          Note: result.testMenu.Note || "",
          Standard: result.testMenu.Standard || "",
          Price: result.testMenu.Price || "",
          Inspection_ID: result.testMenu.Inspection_ID || "",
          Sampling_Point: result.testMenu.Sampling_Point || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/editData/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      navigate(`/viewData/${id}`);
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  console.log("fom0", formData);
  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Edit Inspection ID: {formData.Inspection_ID}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700 text-left">
            Note
          </label>
          <input
            type="text"
            name="Note"
            value={formData.Note}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700 text-left">
            Price
          </label>
          <input
            type="text"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700 text-left">
            Sampling Point
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="samplingPoint"
                value="front"
                checked={samplingPoint === "front"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Front End
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="samplingPoint"
                value="back"
                checked={samplingPoint === "back"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Back End
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="samplingPoint"
                value="other"
                checked={samplingPoint === "other"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700 text-left">
            Date and time of sampling
          </label>
          <input
            type="date"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/viewData/${id}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditData;
