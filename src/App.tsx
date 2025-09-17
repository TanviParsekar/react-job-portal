import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobsListPage } from "./pages/JobsListPage";
import { JobDetailsPage } from "./pages/JobDetailsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsListPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
