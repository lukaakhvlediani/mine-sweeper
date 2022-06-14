import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import { Cell } from './Cell';

const ENDPOINT = 'http://127.0.0.1:4000';

function App() {
  const [cells, setCells] = useState({ bombs: [], visited: [] });
  const socketRef = useRef();

  const buttonStyle = {
    width: 40,
    height: 40,
    backgroundColor: '#8888',
    color: 'black',
    verticalAlign: 'top',
    fontSize: '32px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderLeft: '5px solid rgb(220,220,220)',
    borderTop: '5px solid rgb(220,220,220)',
    borderBottom: '5px solid #333',
    borderRight: '5px solid #333',
    display: 'inline-block',
  };
  const visitStyle = {
    width: 48,
    height: 48,
    backgroundColor: '#555',
    color: 'white',
    fontWeight: 'bold',
    border: '1px solid black',
    verticalAlign: 'top',
    fontSize: '32px',
    fontFamily: 'Montserrat, sans-serif',
    display: 'inline-block',
  };

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    socketRef.current.on('boardUpdate', (data) => {
      console.log('boardUpdate front', data);
      setCells(data);
    });

    socketRef.current.on('onLost', () => {
      alert('You lost!');
      window.location.reload();
    });
    socketRef.current.on('oncontextmenu', (e) => {
      console.log('oncontextmenu', e);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const visitCell = (i, j) => {
    socketRef.current.emit('onclick', { i, j });
  };

  const generateBombs = (value) => {
    console.log('generateBombs', socketRef.current);
    socketRef.current.emit('generateBoard', value);
    console.log(value, '12344');
  };
  const board = useMemo(
    () => (
      <Cell
        cells={cells}
        buttonStyle={buttonStyle}
        visitCell={visitCell}
        visitStyle={visitStyle}
      />
    ),
    [cells.bombs, cells.visited]
  );
  console.log(cells);
  return (
    <div className="App">
      <header className="App-header">
        <div className="title"> MINE-SWEEPER </div>
        <div className="subtext"> </div>
        <div className="container">
          {board}
          <button
            type="button"
            className="generate"
            onClick={() => generateBombs()}
          >
            new game
          </button>
          <button
            type="button"
            className="generate"
            onClick={() => generateBombs('easy')}
          >
            easy
          </button>
          <button
            type="button"
            className="generate"
            onClick={() => generateBombs('medium')}
          >
            medium
          </button>
          <button
            type="button"
            className="generate"
            onClick={() => generateBombs('hard')}
          >
            hard
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
