import { createContext, useState, type ReactNode } from "react";

export const ReaderContext: any = createContext({
  textProperties: {
    verticalPadding: 18.6190490722656,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  },
});

type Props = {
  children: ReactNode;
};

const ReaderContextProvider = ({ children }: any) => {
  const [textProperties, setTextProperties] = useState({
    verticalPadding: 18.6190490722656,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  });

  const value = {
    textProperties: textProperties,
  };

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
};

export default ReaderContextProvider;
