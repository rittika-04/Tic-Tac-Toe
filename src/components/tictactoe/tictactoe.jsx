import React, { useState, useRef } from 'react';
import './tictactoe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);  // Game board state
    const [count, setCount] = useState(0);  // Track the number of moves (turns)
    const [lock, setLock] = useState(false);  // Lock the game when someone wins
    const titleRef = useRef(null);  // UseRef for the title to display the winner

    // Toggle between X and O
    const toggle = (index) => {
        if (lock || data[index] !== "") return; // Prevent actions if game is locked or cell is already filled
        
        const newData = [...data]; // Create a copy of the current board state
        if (count % 2 === 0) {
            newData[index] = "x"; // 'x' for player 1
        } else {
            newData[index] = "o"; // 'o' for player 2
        }

        setData(newData);  // Update board state
        setCount(count + 1);  // Increment the move counter
        checkWinner(newData); // Check if there is a winner after the move
    };

    // Check if there is a winner or a draw
    const checkWinner = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        // Check for a winner
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setLock(true); // Lock the game
                // Update title with winner
                titleRef.current.innerHTML = `Congratulations! <img src="${board[a] === "x" ? cross_icon : circle_icon}" alt="winner" />`;
                return; // Exit once a winner is found
            }
        }

        // Check for a draw (if all cells are filled and no winner)
        if (count === 8) {
            setLock(true); // Lock the game as it's a draw
            titleRef.current.innerHTML = "It's a Draw!";
        }
    };

    // Reset the game
    const handleReset = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className="board">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => toggle(index)}
                    >
                        {value && <img src={value === "x" ? cross_icon : circle_icon} alt={value} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={handleReset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
