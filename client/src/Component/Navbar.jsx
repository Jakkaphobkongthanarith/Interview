import React, { useState } from "react"; // นำ useState มาใช้
import { Link } from "react-router-dom";

const Navbar = () => {
  // ใช้ useState สำหรับการเก็บข้อความ
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("เมี้ยวๆ");
    // ตั้งเวลาให้ข้อความหายหลัง 3 วินาที
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <strong>EASYRICE TEST</strong>
        <div className="flex flex-col text-[12px]">
          <p>Submit by: Jakkaphob Kongtharith</p>
          <p>E-Mail: jkpbeam@gmail.com</p>
        </div>
      </div>

      {message && (
        <div className="mt-4 p-2 bg-yellow-300 text-center rounded">
          {message}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
