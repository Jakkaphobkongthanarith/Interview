import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FirstPage from "./Page/FirstPage";
import ViewData from "./Page/ViewDataPage";
import EditData from "./Page/EditData";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <div className="p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/viewData/:id" element={<ViewData />} />
          <Route path="/editData/:id" element={<EditData />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
