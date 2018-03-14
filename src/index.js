import React from 'react';
import ReactDOM from 'react-dom';
import { Battleship, Shipyard, Field, AutoFire } from 'models';
import { SHAPES } from 'consts/ship';
import './index.css';
import App from './App';

const filedSize = 10;

const battleship = new Battleship(
  new Field(filedSize, new AutoFire()),
  new Shipyard(),
  filedSize,
  [SHAPES.DOT, SHAPES.DOT, SHAPES.I, SHAPES.L]
);

ReactDOM.render(
  <App battleship={battleship} />,
  document.getElementById('root')
);
