import React, { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ user, error, loading, token, children }) => {
  return (
    <UserContext.Provider value={{ user, error, loading, token }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
