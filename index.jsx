const { useState } = React;

export function Board() {
  const emptyBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("X");

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== "");

  function handleClick(index) {
    if (board[index] !== "" || winner || isDraw) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;

    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  }

  function handleReset() {
    setBoard(emptyBoard);
    setPlayer("X");
  }

  return (
  <div className="board-container">
    <h1>Tic Tac Toe</h1>

   <p>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Draw"
          : `Next player: ${player}`}
      </p>


    <div className="buttons">
      {board.map((cell, index) => (
        <button
          key={index}
          className="square"
          onClick={() => handleClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>

    <button id="reset" onClick={handleReset}>
      Reset
    </button>
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
      return board[start];
    }
  }

  // columns
  for (let col = 0; col < 3; col++) {
    if (
      board[col] !== "" &&
      board[col] === board[col + 3] &&
      board[col] === board[col + 6]
    ) {
      return board[col];
    }
  }

  // diagonals
  if (
    board[0] !== "" &&
    board[0] === board[4] &&
    board[0] === board[8]
  ) {
    return board[0];
  }

  if (
    board[2] !== "" &&
    board[2] === board[4] &&
    board[2] === board[6]
  ) {
    return board[2];
  }

  return null;
}
