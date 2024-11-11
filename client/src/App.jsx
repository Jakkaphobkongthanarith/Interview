import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FirstPage from "./Page/FirstPage";
import ViewFood from "./Page/ViewFoodPage";
import EditFood from "./Page/EditFood";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/viewFood/:id" element={<ViewFood />} />
        <Route path="/editFood/:id" element={<EditFood />} />
      </Routes>
    </Router>
  );
}

export default App;
