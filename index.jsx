const { useState } = React;

export function Board() {
  const emptyBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("X");

  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draws: 0
  });

  const [gameOver, setGameOver] = useState(false);

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const isDraw = !winner && board.every(cell => cell !== "");

  function handleClick(index) {
    if (board[index] !== "" || gameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;

    const result = calculateWinner(newBoard);
    const draw = !result && newBoard.every(cell => cell !== "");

    setBoard(newBoard);

    if (result) {
      setScore(prev => ({
        ...prev,
        [player]: prev[player] + 1
      }));

      setGameOver(true);
      return;
    }

    if (draw) {
      setScore(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));

      setGameOver(true);
      return;
    }

    setPlayer(player === "X" ? "O" : "X");
  }

  function handleReset() {
    setBoard(emptyBoard);
    setPlayer("X");
    setGameOver(false);
  }

  function handleScoreReset() {
    setScore({
      X: 0,
      O: 0,
      draws: 0
    });

    handleReset();
  }

  return (
    <div className="board-container">
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <div>
          <span>X</span>
          <strong>{score.X}</strong>
        </div>

        <div>
          <span>Draws</span>
          <strong>{score.draws}</strong>
        </div>

        <div>
          <span>O</span>
          <strong>{score.O}</strong>
        </div>
      </div>

      <p className="status">
        {winner
          ? `Winner is ${winner}`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${player}`}
      </p>

      <div className="buttons">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`square ${winningLine.includes(index) ? "winner-square" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="actions">
        <button id="reset" onClick={handleReset}>
          Reset Game
        </button>

        <button id="reset-score" onClick={handleScoreReset}>
          Reset Score
        </button>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  // rows
  for (let row = 0; row < 3; row++) {
    const start = row * 3;

    if (
      board[start] !== "" &&
      board[start] === board[start + 1] &&
      board[start] === board[start + 2]
    ) {
      return {
        winner: board[start],
        line: [start, start + 1, start + 2]
      };
    }
  }

  // columns
  for (let col = 0; col < 3; col++) {
    if (
      board[col] !== "" &&
      board[col] === board[col + 3] &&
      board[col] === board[col + 6]
    ) {
      return {
        winner: board[col],
        line: [col, col + 3, col + 6]
      };
    }
  }

  // diagonal 0-4-8
  if (
    board[0] !== "" &&
    board[0] === board[4] &&
    board[0] === board[8]
  ) {
    return {
      winner: board[0],
      line: [0, 4, 8]
    };
  }

  // diagonal 2-4-6
  if (
    board[2] !== "" &&
    board[2] === board[4] &&
    board[2] === board[6]
  ) {
    return {
      winner: board[2],
      line: [2, 4, 6]
    };
  }

  return null;
}
