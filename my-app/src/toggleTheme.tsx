import React, { useState } from "react";
import { themes } from "./themeContext";
import { ThemeContext } from "./themeContext";
import ClickCounter from "./hooksExercise";
import App from "./App";

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <App />
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;
