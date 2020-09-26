import React, { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({
  user,
  error,
  loading,
  token,
  children,
  setUser,
}) => {
  return (
    <UserContext.Provider value={{ user, error, loading, token, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
