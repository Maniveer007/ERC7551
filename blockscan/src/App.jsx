import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./Pages/Transfer.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transaction from "./Pages/Transaction.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Transfer />} /> */}
        <Route path="/" element={<Transaction />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
