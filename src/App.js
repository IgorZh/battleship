import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'components';
import './App.css';

class App extends Component {
  static propTypes = {
    battleship: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { battleship } = this.props;

    battleship.subscribe(() => this.forceUpdate());
  }

  handleFire = () => {
    const { battleship } = this.props;

    battleship.autoFire();
  };

  render() {
    const { battleship } = this.props;

    return (
      <React.Fragment>
        <Field cells={battleship.field.cells} gameOver={battleship.gameOver} />
        {!battleship.gameStarted && (
          <button onClick={this.handleFire}>Start game</button>
        )}
      </React.Fragment>
    );
  }
}

export default App;
