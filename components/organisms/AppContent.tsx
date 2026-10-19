import { View } from "react-native";
import Navigation from "../../navigation/Navigation";
import { useAuth } from "../../store/AuthContext";
import LoadingOverlay from "../../util/LoadingOverlay";
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeContext";

const AppContent = () => {
  const { loading } = useAuth();
  const { theme } = useContext(ThemeContext);
  if (loading) return <LoadingOverlay message="Loading..." theme={theme} />;

  return <Navigation />;
};

export default AppContent;
