import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Repositories } from "../pages/Repositories";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/repositories/:owner/:repo" element={<Repositories />} />
    </Routes>
  );
};
