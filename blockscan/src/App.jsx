import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./Pages/Transfer.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Transfer />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
