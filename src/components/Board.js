import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    // const cards = CARD_DATA.cards

    this.state = {
      cards: [],
      errors: ''
    };
  }
  componentDidMount() {
    axios.get('https://inspiration-board.herokuapp.com/boards/BogartsBoard/cards')
    .then((response) => {
      this.setState({
        cards: response.data
      })
  })
    .catch((error) => {
      this.setState({
        error: error.message
      })
  })};

  deleteCard = (cardId) => {
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)

      .then((response) => {
        const updatedCards = this.state.cards.filter((card) => card.card.id !== cardId);

        this.setState({
          cards: updatedCards,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({error: error.message});
      });
  }

  render() {
    const mappingCards = this.state.cards.map ((card, i) => {
      return  (
        <Card text={card.card.text} emoji={card.card.emoji} key={i} deleteCardCallBack={this.deleteCard} cardId={card.card.id}/> 
        // card for object card how we access shape
      )
    });
    return (
      <div>
        { mappingCards }
      </div>
    )
  }
}

Board.propTypes = {
url: PropTypes.string.isRequired,
boardName: PropTypes.string.isRequired,
};

export default Board;
