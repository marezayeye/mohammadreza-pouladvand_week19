import { createContext, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
const UserContext = createContext();

function UserProvider({ children }) {
  const [userName, setUserName] = useState();
  const login = (username) => setUserName(username);
  const logout = () => {
    localStorage.clear();
    Navigate("/login");
  };

  return (
    <UserContext.Provider value={{ userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export const useAuth = () => useContext(UserContext);
