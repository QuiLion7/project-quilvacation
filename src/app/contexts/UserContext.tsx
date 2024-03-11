"use client";

import { ReactNode, createContext, useState, useEffect } from "react";

interface UserProviderProps {
  children: ReactNode;
}

type UserContextData = {
  userType: string | null;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext({} as UserContextData);

function UserProvider({ children }: UserProviderProps) {
  const [userType, setUserType] = useState<string | null>(() => {
    const storedUserType = localStorage.getItem("userType");
    return storedUserType ? storedUserType : null;
  });

  useEffect(() => {
    localStorage.setItem("userType", userType || "");
  }, [userType]);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
