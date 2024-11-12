import React, { useEffect, useState } from "react";

const InspectionReport = () => {
  const [inspectionData, setInspectionData] = useState({
    createDate: "28/08/2023 - 11:08:00",
    updateDate: "28/08/2023 - 11:08:00",
    inspectionId: "EC-0000-0000",
    totalSample: "42 kernal",
    standard: "abcd",
    note: "abcdefghijk",
    composition: [
      { name: "ข้าวเต็มเมล็ด", length: ">= 7", actual: "0.00%" },
      { name: "ข้าวหักใหญ่", length: "3.5 - 6.99", actual: "0.00%" },
      { name: "ข้าวหักธรรมดา", length: "0 - 3.49", actual: "0.00%" },
    ],
    defectRice: [
      { name: "yellow", actual: "0.00%" },
      { name: "paddy", actual: "0.00%" },
      { name: "damaged", actual: "0.00%" },
      { name: "glutinous", actual: "0.00%" },
      { name: "chalky", actual: "0.00%" },
      { name: "red", actual: "0.00%" },
      { name: "Total", actual: "0.00%" },
    ],
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between text-sm text-gray-600">
        <div className="my-10">
          <p>Create Date - Time: {inspectionData.createDate}</p>
          <p>Update Date - Time: {inspectionData.updateDate}</p>
        </div>
        <div>
          <p>Inspection ID: {inspectionData.inspectionId}</p>
          <p>Total Sample: {inspectionData.totalSample}</p>
          <p>Standard: {inspectionData.standard}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-md text-gray-700">
        <p>Note: {inspectionData.note}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Composition</h2>
        <table className="w-full mt-2 text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Length</th>
              <th className="p-2">Actual</th>
            </tr>
          </thead>
          <tbody>
            {inspectionData.composition.map((item, index) => (
              <tr key={index} className="text-gray-700 border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.length}</td>
                <td className="p-2 text-green-600 font-semibold">
                  {item.actual}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Defect Rice</h2>
        <table className="w-full mt-2 text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Actual</th>
            </tr>
          </thead>
          <tbody>
            {inspectionData.defectRice.map((item, index) => (
              <tr key={index} className="text-gray-700 border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-green-600 font-semibold">
                  {item.actual}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionReport;
