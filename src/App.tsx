import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [goal, setGoal] = useState("apple");
  const [types, setTypes] = useState<string[][]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [len, setLen] = useState<number>(0);

  useEffect(() => {
    // setGoal() random word from a list of words
    // fetch data from an API or use a static list
  }, []);

  useEffect(() => {
    if (len === 6) {
      alert("END GAME");
      return;
    }
  }, [len]);

  const handleEnter = () => {
    if (inputValue.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    setTypes([...types, inputValue.split("")]);
    setLen(types.length + 1);
    setInputValue(""); // Clear input after processing

    if (inputValue === goal) {
      alert("You guessed the word!");
      return;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>{goal}</p>
        <div>
          {types.map((guess, idx) => (
            <BoxLine key={idx} guess={guess} goal={goal} />
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          maxLength={5}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={handleEnter}>Enter</button>
        <p>{len}</p>
      </header>
    </div>
  );
}

function BoxLine({ guess, goal }: { guess: string[]; goal: string }) {
  return (
    <div className="box-line">
      {Array.from({ length: 5 }).map((_, index) => {
        let color = "#ccc";
        if (guess[index]) {
          if (guess[index] === goal[index]) {
            color = "#6aaa64"; // green
          } else if (goal.includes(guess[index])) {
            color = "#c9b458"; // yellow
          } else {
            color = "#ff5656"; // red
          }
        }

        return (
          <span
            key={index}
            className="box"
            style={{ backgroundColor: color }}
          >
            {guess[index] ? guess[index] : "?"}{" "}
          </span>
        );
      })}
    </div>
  );
}

export default App;
