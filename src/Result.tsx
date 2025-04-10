import { useEffect, useState } from "react";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

const Result = ({ score, total, onRestart }: Props) => {
  const [leaderboard, setLeaderboard] = useState<number[]>([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const updated = [...existing, score].sort((a, b) => b - a).slice(0, 5);
    setLeaderboard(updated);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
  }, [score]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-center">
      <h1 className="text-3xl font-bold mb-2">🎉 Game Over!</h1>
      <p className="text-xl mb-4">Your Score: {score} / {total}</p>

      <h2 className="text-lg font-semibold mt-4 mb-2">🏆 Leaderboard</h2>
      <ul className="text-sm text-gray-300">
        {leaderboard.map((s, i) => (
          <li key={i}>#{i + 1}: {s}</li>
        ))}
      </ul>

      <button
        onClick={onRestart}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;
