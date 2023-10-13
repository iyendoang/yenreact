import React, { Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./views/Auth/Login"));

function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
