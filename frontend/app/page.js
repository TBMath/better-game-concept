'use client'
import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const PlayPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [index, setIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const maxXP = 1000;
  const [data, setData] = useState([]);
  const [letters, setLetters] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [inputs, setInputs] = useState(["", "", ""]);
  const [points, setPoints] = useState(10);
  const [message, setMessage] = useState("");
  const [xp_msg, setXP_msg] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [hint3, setHint3] = useState("");
  const [hint_msg, setHint_msg] = useState("");
  const [drag_msg, setDrag_msg] = useState("test");
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(0);
  const [gameTimer, setGameTimer] = useState(null); // Track the timer interval
  const [gameEnded, setGameEnded] = useState(false);

  const addXP = (amount) => {
    setXp((prev) => Math.min(prev + amount, maxXP));
  };

  const percentage = (xp / maxXP) * 100;

  useEffect(() => {
    if (index <= 9) {
      fetch(`https://40ikiwic12.execute-api.ap-southeast-2.amazonaws.com/questions/get/${index}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          const shuffledLetters = [data.l1, data.l2, data.l3, data.l4, data.l5, data.l6, data.l7, data.l8, data.l9, data.l10]
            .sort(() => Math.random() - 0.5); // Shuffle the letters
          setLetters(shuffledLetters);
          setHint1("");
          setHint2("");
          setHint3("");
          setInputs(new Array(data.answer.length).fill(""));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setMessage("Level 1 completed");
          setTimeout(() => setMessage(""), 2000);
        });
    }
    if (xp === 1000 || lives === 0) {
      setGameEnded(true);
      clearInterval(gameTimer); // Stop the timer when the game ends
    }
  }, [index, xp, lives]);

  // Start the timer when the game starts
  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setXp(0);
    setPoints(10);
    setLives(3);
    setIndex(0);
    setTimer(0);
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setGameTimer(timerInterval);
  };

  const purchaseHints = () => {
    if (points >= 10) {
      if (!hint1) {
        setPoints(points - 10);
        setHint1(data.hint1);
        setHint_msg("-10 Money");
        setTimeout(() => setHint_msg(""), 2000);
      } else if (!hint2) {
        setPoints(points - 10);
        setHint2(data.hint2);
        setHint_msg("-10 Money");
        setTimeout(() => setHint_msg(""), 1500);
      } else if (!hint3) {
        setPoints(points - 10);
        setHint3(data.hint3);
        setHint_msg("-10 Money");
        setTimeout(() => setHint_msg(""), 1500);
      } else if (hint1 && hint2 && hint3) {
        setHint_msg("No more hints available!");  
        setTimeout(() => setHint_msg(""), 1500);
      }
    } else {
      setHint_msg("Not enough money!");
      setTimeout(() => setHint_msg(""), 1500);
    }
  };

  const checkAnswer = () => {
    if (inputs.join("") === data.answer) {
      setIndex(index + 1);
      setPoints(points + 15);
      addXP(100);
      setXP_msg("+100 XP");
      setTimeout(() => setXP_msg(""), 2000);
      setMessage("Correct!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setInputs(new Array(data.answer.length).fill(""));
      setLives(lives - 1);
      setMessage("Try again!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const skipQuestion = () => {
    setIndex(index + 1);
    setInputs(new Array(data.answer.length).fill(""));
  };

  const onDropLetter = (letter, index) => {
    const newInputs = [...inputs];
    newInputs[index] = letter;
    setInputs(newInputs);
  };

  const handleClickLetter = (letter) => {
    const nextIndex = inputs.findIndex(input => input === "");
    if (nextIndex !== -1) {
      onDropLetter(letter, nextIndex);
    }
  };

  const DraggableLetter = ({ letter, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "LETTER",
      item: { letter, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        onClick={() => handleClickLetter(letter)}
        className="border border-gray-400 p-2 text-center w-12 mb-2 cursor-pointer"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {letter}
      </div>
    );
  };

  const InputBox = ({ index }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "LETTER",
      drop: (item) => onDropLetter(item.letter, index),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        className={`border border-gray-400 p-2 text-center w-12 mb-2 ${isOver ? "bg-yellow-300" : ""}`}
      >
        {inputs[index]}
      </div>
    );
  };

  if (!gameStarted) {
    return (
      <div className="bg-white text-black p-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to the Game!</h1>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-700"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    );
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  if (gameEnded) {
    
    fetch('https://40ikiwic12.execute-api.ap-southeast-2.amazonaws.com/questions/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"score":timer}),
    }).catch((error) => console.error('Error logging time:', error));

    return (
      <div className="bg-white text-black p-4 text-center">
        <h1 className="text-2xl font-bold">Game Over!</h1>
        <p className="mt-4">You {lives === 0 ? "ran out of lives" : "completed the level"} in {formatTime(timer)} seconds.</p>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-700"
          onClick={startGame}
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white text-black p-4">
        <h1 className="text-xl font-bold">Topic: Cities in Australia</h1>
        <h1 className="text-lg font-bold mt-4">Lives: {Array(lives).fill("❤️").join(" ")}</h1>
        <h1 className="text-lg font-bold mt-4">Money: {points}</h1>
        <div className="text-center">Guess the {data.answer ? data.answer.length : 0} letter city </div>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: data.answer?.length || 0 }).map((_, index) => (
            <InputBox key={index} index={index} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center space-x-2 mt-4">
          {letters.map((letter, index) => (
            <DraggableLetter key={index} letter={letter} index={index} />
          ))}
        </div>

        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-700"
          onClick={checkAnswer}
        >
          Submit Guess
        </button>
      
        <button className="mt-4 p-3 bg-gray-500 text-white rounded-full hover:bg-gray-700" onClick={purchaseHints}> 
          Purchase Hints
        </button>
        <p className="mt-4">{message}</p>

        <div className="p-4 space-y-4 w-full">
          <div className="flex justify-between">
            <span>{level}</span>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden mx-2">
              <div
                className="bg-blue-500 h-full transition-all duration-500 ease-in-out text-center text-white"
                style={{ width: `${percentage}%` }}
              >
                {xp_msg}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-700 font-semibold">
                {xp} / {maxXP} XP
              </span>
            </div>
          </div>
          {hint_msg}
          <div className="flex justify-between">
            <span>Hint 1: {hint1}</span>
            <span>Hint 2: {hint2}</span>
            <span>Hint 3: {hint3}</span>
          </div>
          <div className="flex justify-between">
          
            <span>Time: {formatTime(timer)}</span>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PlayPage;
