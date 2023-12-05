import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkmodeContext = createContext();

function DarkmodeProvider({ children }) {
  const [isDarkmode, setIsDarkmode] = useLocalStorageState(
    window.matchMedia(`(prefers-color-scheme: dark)`).matches,
    "darkmode"
  );

  useEffect(() => {
    const htmlDoc = document.documentElement;
    isDarkmode
      ? (htmlDoc.className = "dark-mode")
      : (htmlDoc.className = "ligh-mode");
  }, [isDarkmode]);

  function handleDarkmode() {
    setIsDarkmode((d) => !d);
  }

  return (
    <DarkmodeContext.Provider value={{ isDarkmode, handleDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

export function useDarkmode() {
  const context = useContext(DarkmodeContext);
  if (context === "undefined")
    throw new Error("darkmode context was used outside its provider!");

  const { isDarkmode, handleDarkmode } = context || {};

  return [isDarkmode, handleDarkmode];
}

export default DarkmodeProvider;
