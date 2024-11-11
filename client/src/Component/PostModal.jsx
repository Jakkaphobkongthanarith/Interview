import React, { useState } from "react";

const PostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [zone, setZone] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);
  const [samplingPoint, setSamplingPoint] = useState({
    frontEnd: false,
    backEnd: false,
    other: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSamplingPoint((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
    } else {
      alert("กรุณาเลือกไฟล์ JSON เท่านั้น");
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert("กรุณาเลือกไฟล์ JSON");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const jsonData = JSON.parse(reader.result);
        const { requestID, imageURL, grains } = jsonData;
        if (!requestID || !imageURL || !grains) {
          alert("ข้อมูลในไฟล์ JSON ไม่ครบถ้วน");
          return;
        }

        const response = await fetch("http://localhost:3000/addFood", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: menuName,
            Standard: zone,
            Note: description,
            Price: price,
            requestID,
            imageURL,
            grains,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response:", responseData);
          setSuccessMessage("Data saved successfully!");
          setIsOpen(false);  
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          setSuccessMessage("Failed to save data");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        setSuccessMessage("An error occurred while processing the file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-[#1F7B44] text-white rounded-lg"
        >
          Create Inspection
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white text-left w-96 p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl text-center font-semibold mb-4">
            Create Modal
          </h2>

          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="ใส่ชื่อเมนูตรงนี้"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard*
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-500"
            >
              <option value="" disabled>
                Please Select Standard
              </option>
              <option value="zone1">Type 1</option>
              <option value="zone2">Type 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sampling Point
            </label>
            <div className="flex items-center gap-4">
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
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1F7B44] text-white rounded-lg hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
