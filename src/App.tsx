import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import IndexPages from "./Pages/IndexPages";

export default function App() {
  return (
    <div className="body">
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<IndexPages />} />
      </Routes>

      </BrowserRouter>
    </div>
  );
}