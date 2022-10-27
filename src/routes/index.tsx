import * as React from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "dashboard" */ "../pages/Dashboard"
    )
);
const Repositories = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "repositories" */ "../pages/Repositories"
    )
);

export const Routers: React.FC = () => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories/:owner/:repo" element={<Repositories />} />
      </Routes>
    </React.Suspense>
  );
};
