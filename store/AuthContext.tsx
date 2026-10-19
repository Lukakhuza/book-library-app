import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "../types/basic";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import * as x from "jwt-decode";
import { isTokenExpired } from "../util/helperFunctions";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (newToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await getItemAsync("accessToken");
        if (stored && !isTokenExpired(stored)) {
          setToken(stored);
        } else {
          if (stored) await deleteItemAsync("accessToken");
          setToken(null);
        }
      } catch (error) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const signIn = async (newToken: string) => {
    await setItemAsync("accessToken", newToken);
    setToken(newToken);
  };

  const signOut = async () => {
    await deleteItemAsync("accessToken");
    setToken(null);
  };

  const value = {
    token,
    loading,
    isAuthenticated: !!token,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export const useIsAuthenticated = () => useAuth().isAuthenticated;
export const useIsSignedOut = () => !useAuth().isAuthenticated;

export default AuthContextProvider;
