import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
