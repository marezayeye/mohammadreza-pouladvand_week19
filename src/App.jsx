import { Routes, Route, Navigate } from "react-router-dom";

import SignUpPage from "./pages/SignupPage.jsx";
import Inventory from "./pages/Inventory";
import LoginPage from "./pages/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
