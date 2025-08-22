import { Routes, Route, Navigate } from "react-router-dom";

import UserProvider from "./context/UserContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

import SignUpPage from "./pages/SignupPage.jsx";
import Inventory from "./pages/Inventory";
import LoginPage from "./pages/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import SecureRoute from "./components/SecureRoute.jsx";

function App() {
  return (
    <ProductsProvider>
      <UserProvider>
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          // protects Inventory form unauthorized access
          <Route
            path="/inventory"
            element={
              <SecureRoute>
                <Inventory />
              </SecureRoute>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </ProductsProvider>
  );
}

export default App;
