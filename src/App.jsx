import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes,  } from "react-router-dom";
import Landing from "./Landing";
import CarPage from "./CarPage";

function App() {
  // const location=useLocation()
  // console.log(location);
  return (
    <BrowserRouter basename="/subapp-2">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cars/:id" element={<CarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
