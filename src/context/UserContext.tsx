// context/UserContext.jsx
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <UserContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}