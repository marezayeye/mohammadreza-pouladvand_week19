import { createContext, useState, useContext } from "react";

function UserProvider({ children }) {
  const UserContext = createContext();
  const [userName, setUserName] = useState();
  const login = (username) => setUserName(username);
  const logout = () => setUserName();

  return (
    <UserContext.Provider value={{ userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export const useAuth = () => useContext(UserContext);
