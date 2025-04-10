import { useEffect, useState } from "react";
import Game from "./Game";

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center p-4 transition-colors">
      <button
        onClick={() => setDark((d) => !d)}
        className="absolute top-4 right-4 text-sm bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <Game />
    </div>
  );
}

export default App;
