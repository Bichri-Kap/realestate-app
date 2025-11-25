import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Properties />} />
      </Routes>
    </BrowserRouter>
  );
}
