import React, { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({
  auth: { user, error, loading, setUser, handleLogin, handleLogout },
  children,
}) => {
  return (
    <UserContext.Provider
      value={{
        user,
        error,
        loading,

        setUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
