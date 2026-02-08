import { useContext } from "react";
import { ThemeContext } from "./themeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-500
        ${
          isLight
            ? "bg-gradient-to-br from-slate-100 to-slate-300"
            : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        }
      `}
    >
      {/* Card */}
      <div
        className={`w-80 rounded-2xl p-6 text-center transition-all duration-500
          ${
            isLight
              ? "bg-white text-slate-900 shadow-xl"
              : "bg-slate-900 text-white shadow-2xl"
          }
        `}
      >
        <h1 className="text-2xl font-semibold mb-1">Theme Mode</h1>
        <p className="text-sm opacity-70 mb-6">Toggle between Light and Dark</p>

        {/* Toggle Switch */}
        <div
          onClick={toggleTheme}
          className={`mx-auto flex h-9 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300
            ${isLight ? "bg-slate-300" : "bg-indigo-600"}
          `}
        >
          <div
            className={`h-7 w-7 rounded-full bg-white shadow-md transition-transform duration-300
              ${isLight ? "translate-x-0" : "translate-x-7"}
            `}
          />
        </div>

        <p className="mt-4 font-medium">
          {isLight ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </p>
      </div>
    </div>
  );
}

export default App;
