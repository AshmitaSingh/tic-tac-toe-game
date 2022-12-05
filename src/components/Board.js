import Box from "./Box";
import "../styles/Board.css";
import { useState } from "react";

function Board() {
  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // To set & keep a check on the value of each box
  const [boxValue, setBoxValue] = useState(Array(9).fill(null));

  // To check whose turn it is next
  const [isXNext, setIsXNext] = useState(true);
  const nextTurn = isXNext ? "X" : "O";

  const winner = calculateWinner(boxValue);

  // Generate values for each box
  function generateBoxes(i) {
    return (
      <Box
        value={boxValue[i]}
        key={i}
        handleClick={() => {
          // Stops updating the already displaying boxValue
          if (boxValue[i] != null || winner != null) {
            return;
          }
          const newBoxValue = boxValue.slice();
          newBoxValue[i] = nextTurn;
          setBoxValue(newBoxValue);

          // toggle turn
          setIsXNext(!isXNext);
        }}
      />
    );
  }

  // Check who's the winner
  function calculateWinner(boxValue) {
    const possibleOutcomes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < possibleOutcomes.length; i++) {
      const [a, b, c] = possibleOutcomes[i];
      if (
        boxValue[a] &&
        boxValue[a] === boxValue[b] &&
        boxValue[a] === boxValue[c]
      ) {
        return boxValue[a];
      }
    }
    return null;
  }

  // Check if draw(), i.e, if the board is full
  function isDraw(boxValue) {
    for (let i = 0; i < boxValue.length; i++) {
      if (boxValue[i] == null) {
        return false;
      }
    }
    return true;
  }

  // Get the status
  function getStatus() {
    if (winner) {
      return "Winner: " + '"' + winner + '"';
    } else if (isDraw(boxValue)) {
      return "It's a Draw!!!";
    } else {
      return "Next Player: " + '"' + nextTurn + '"';
    }
  }

  // Resets the board
  const handleReset = () => {
    setBoxValue(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="container">
      <div className="board">
      <h1 className='header'>TIC-TAC-TOE</h1>
        <div className="board-rows">{indexes.map((i) => generateBoxes(i))}</div>
      </div>
      <div className="content">
        <div className={isDraw(boxValue) ? "draw" : "getStatus"}>
          {getStatus()}
        </div>
        <button className="reset-button" onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default Board;
