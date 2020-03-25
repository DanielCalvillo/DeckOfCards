import React, { Component } from 'react';
import axios from 'axios';

class DeckOfCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            givenDeck: null
        }
        this.deliverNewCard = this.deliverNewCard.bind(this)
    }

    async deliverNewCard() {
        const deck_id = this.state.deck.deck_id
        const cardUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`

        let newCard = await axios.get(cardUrl)
        
        if(this.state.givenDeck) {
            console.log(newCard.data.cards[0])
            await this.setState({
                deck: newCard.data,
                givenDeck: [...this.state.givenDeck, newCard.data.cards[0]],
            })
        } else {
            await this.setState({
                deck: newCard.data,
            })
    
            this.setState({
                givenDeck: this.state.deck.cards
            })
        }
    }

    async componentDidMount() {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle';
        let response = await axios.get(url);
        this.setState( {
            deck: response.data
        })
    }

    render() {

        if(this.state.givenDeck) {
            var counter = this.state.givenDeck.length
            var cardUrl = this.state.givenDeck[counter-1].images.svg
            console.log(counter)
            var stillADeck = this.state.deck.remaining
            console.log(stillADeck)
        }

        return (
            <div>
                
                <button onClick={this.deliverNewCard}>
                    GIVE ME A CARD!
                </button>
                {this.state.givenDeck && stillADeck > 0 ? 
                    <img src={cardUrl}/>
                    :
                    <h1>NO HAY CARTAS</h1>
                }

            </div>
        )
    }
}

export default DeckOfCards;