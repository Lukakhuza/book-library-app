import { createContext, useState } from "react";
import { Props } from "../types/basic";

type UserDataType = {
  userData: {
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    phoneNumber: string | null;
  };
};

const emptyUserInput = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  phoneNumber: null,
};

export const UserDataContext = createContext<UserDataType>({
  userData: emptyUserInput,
});

const UserDataContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState(emptyUserInput);

  const value = {
    userData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
