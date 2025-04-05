import React, { useEffect, useState } from "react";
import { phrases, Phrase } from "./data";
import GibberishCard from "./GibberishCard";
import Result from "./Result";
import { shuffleArray } from "./utils";

const Game = () => {
  const [shuffledPhrases, setShuffledPhrases] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);

  const correctSound = new Audio("/correct.mp3");
  const wrongSound = new Audio("/buzz.mp3");

  useEffect(() => {
    const randomFive = shuffleArray(phrases).slice(0, 5);
    setShuffledPhrases(randomFive);
  }, []);

  const currentPhrase = shuffledPhrases[currentIndex];

  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCheck = () => {
    if (!currentPhrase) return;

    const isCorrect = input.toLowerCase().trim() === currentPhrase.actual.toLowerCase();

    if (isCorrect) {
      setScore((s) => s + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }

    handleNext();
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffledPhrases.length) {
      setIsGameOver(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setInput("");
      setTimer(15);
    }
  };

  const handleRestart = () => {
    const randomFive = shuffleArray(phrases).slice(0, 5);
    setShuffledPhrases(randomFive);
    setScore(0);
    setCurrentIndex(0);
    setInput("");
    setTimer(15);
    setIsGameOver(false);
  };

  if (!currentPhrase) return <div className="text-white">Loading...</div>;

  if (isGameOver) {
    return <Result score={score} total={shuffledPhrases.length} onRestart={handleRestart} />;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md text-center shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">⏱️ Time: {timer}s</h1>
      <GibberishCard text={currentPhrase.gibberish} />

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="mt-4 p-2 w-full rounded bg-gray-700 text-white outline-none"
        placeholder="Guess the phrase..."
      />

      <button
        onClick={handleCheck}
        className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Submit
      </button>

      <p className="mt-4 text-sm text-gray-300">
        Phrase {currentIndex + 1} of {shuffledPhrases.length}
      </p>
    </div>
  );
};

export default Game;
