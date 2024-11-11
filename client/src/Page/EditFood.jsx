import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditFood = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Note: "",
    Price: "",
    Sampling_Point: [],
    Sampling_Time: "",
  });
  const [samplingPoint, setSamplingPoint] = useState({
    frontEnd: false,
    backEnd: false,
    other: false,
  });
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

  const getSelectedSamplingPoints = (samplingPointState) => {
    const selectedPoints = [];
    if (samplingPointState.frontEnd) selectedPoints.push("Front End");
    if (samplingPointState.backEnd) selectedPoints.push("Back End");
    if (samplingPointState.other) selectedPoints.push("Other");

    return selectedPoints;
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getFood/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch food item");
        }
        const result = await response.json();
        setFoodItem(result);
        console.log("<3", result);
        setFormData({
          Note: result.Note || "",
          Standard: result.Standard || "",
          Price: result.Price || "",
          Inspection_ID: result.Inspection_ID || "",
          Sampling_Point: result.Sampling_Point || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
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
      const response = await fetch(`http://localhost:3000/updateFood/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update food item");
      }

      navigate(`/viewFood/${id}`);
    } catch (error) {
      console.error("Error updating food item:", error);
      setError("Failed to update food item.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Edit Inspection ID: {formData.Inspection_ID}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700">
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
          <label className="p-2 block text-sm font-medium text-gray-700">
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
          <label className="p-2 block text-sm font-medium text-gray-700">
            Sampling Point
          </label>
          <div className="mb-4">
            <div className="flex justify-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="frontEnd"
                  checked={samplingPoint.frontEnd}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Front End
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="backEnd"
                  checked={samplingPoint.backEnd}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Back End
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="other"
                  checked={samplingPoint.other}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="p-2 block text-sm font-medium text-gray-700">
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
            onClick={() => navigate(`/viewFood/${id}`)}
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

export default EditFood;
